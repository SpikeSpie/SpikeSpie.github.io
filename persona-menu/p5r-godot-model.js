import * as THREE from './vendor/three/three.module.js';
import { GLTFLoader } from './vendor/three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('#jokerLiveCanvas');

if (canvas) {
    canvas.dataset.modelState = 'loading';
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(1280, 720, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1280 / 720, 0.01, 100);

    // These values mirror Camera3D and the joker instance transform in persona_menu.tscn.
    camera.position.set(0.635, 3.275, 1.661);
    camera.rotation.set(0, 0, 0);

    let mixer = null;
    let model = null;
    let clips = [];
    let currentAction = null;
    let previousTime = performance.now();

    const ready = Promise.all([
        new GLTFLoader().loadAsync('assets/p5r-godot/joker.glb'),
        new THREE.TextureLoader().loadAsync('assets/p5r-godot/joker_whiteFace.png')
    ]).then(([gltf, faceTexture]) => {
        faceTexture.colorSpace = THREE.SRGBColorSpace;
        faceTexture.flipY = false;
        model = gltf.scene;
        model.position.set(0.838, 0, 0);
        model.traverse((object) => {
            if (!object.isMesh) return;
            const remap = (material) => {
                if (material.name === 'Face' || material.name === 'Eyes') {
                    const face = new THREE.MeshBasicMaterial({ map: faceTexture, side: THREE.DoubleSide });
                    face.name = material.name;
                    return face;
                }
                const color = material.name === 'Neck' ? 0xffffff : 0x000000;
                const flat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
                flat.name = material.name;
                return flat;
            };
            object.material = Array.isArray(object.material)
                ? object.material.map(remap)
                : remap(object.material);
        });
        scene.add(model);
        clips = gltf.animations;
        mixer = new THREE.AnimationMixer(model);
        canvas.dataset.modelState = 'ready';
        window.dispatchEvent(new CustomEvent('p5r-joker-ready'));
        return model;
    }).catch((error) => {
        canvas.dataset.modelState = 'error';
        canvas.dataset.modelError = error?.message || String(error);
        console.warn('Godot Joker model unavailable; the final repository portrait remains usable.', error);
        return null;
    });

    function play(name, speed = 1) {
        return ready.then(() => {
            const clip = THREE.AnimationClip.findByName(clips, name);
            if (!clip || !mixer) return false;
            currentAction?.stop();
            currentAction = mixer.clipAction(clip);
            currentAction.reset();
            currentAction.setLoop(THREE.LoopOnce, 1);
            currentAction.clampWhenFinished = true;
            currentAction.timeScale = speed;
            currentAction.play();
            previousTime = performance.now();
            return true;
        });
    }

    function show(name = 'skill_pose', speed = 0.8) {
        canvas.hidden = false;
        canvas.setAttribute('aria-hidden', 'false');
        return play(name, speed);
    }

    function hide() {
        canvas.hidden = true;
        canvas.setAttribute('aria-hidden', 'true');
    }

    function setCamera(mode) {
        if (mode === 'skill') camera.position.set(0.34, 3.29, 2.761);
        else camera.position.set(0.635, 3.275, 1.661);
    }

    function render(now) {
        requestAnimationFrame(render);
        if (canvas.hidden || !model) {
            previousTime = now;
            return;
        }
        const delta = Math.min((now - previousTime) / 1000, 0.1);
        previousTime = now;
        mixer?.update(delta);
        renderer.render(scene, camera);
    }

    window.P5RJokerModel = { ready, show, hide, play, setCamera };
    requestAnimationFrame(render);
}
