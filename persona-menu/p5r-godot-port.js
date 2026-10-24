(() => {
    // Unity uses a centered, Y-up canvas; these values are preconverted to the web stage's top-left, Y-down space.
    const STAR_INSTANCES = [
        [1278.45, 676.85, 0, -99.92, 0],
        [1716.29, 1061.35, 399, -60.76, 0],
        [1087.56, 413.24, 399, -206.53, 0],
        [1705.05, 758.18, 0, -85.04, 0],
        [176.84, 473.2, 399, -160.68, 0],
        [907, 183, 399, -21.57, 0],
        [1315.77, 800.12, 399, -121.49, 0],
        [1676, 183, 399, -21.57, 0],
        [863.81, 932.08, 399, -106.61, 0],
        [1772.77, 867.74, 399, -106.61, 0],
        [1561, 241, 0, 0, 0],
        [442.46, 972.73, 399, -75.64, 0],
        [1163.97, 826.36, 399, -121.49, 0],
        [1003.77, 867.74, 399, -106.61, 0],
        [945.84, 473.2, 399, -160.68, 0],
        [477.41, 514.36, 0, -184.96, 0],
        [1632.81, 932.08, 399, -106.61, 0],
        [546.77, 800.12, 399, -121.49, 0],
        [947.29, 1061.35, 399, -60.76, 0],
        [936.05, 758.18, 0, -85.04, 0],
        [394.97, 826.36, 399, -121.49, 0],
        [1246.41, 514.36, 0, -184.96, 0],
        [509.45, 676.85, 0, -99.92, 0],
        [959, 328, 399, -21.57, 0],
        [1095, 256, 399, 24.28, 0],
        [1126.82, 562.19, 399, -206.53, 0],
        [792, 241, 0, 0, 0],
        [1864, 256, 399, 24.28, 0],
        [1728, 328, 399, -21.57, 0],
        [318.56, 413.24, 399, -206.53, 0],
        [1211.46, 972.73, 399, -75.64, 0],
        [357.82, 562.19, 399, -206.53, 0],
        [1632, 69, 420, -69.43, 1],
        [1358.35, 681.67, 420, -235.72, 1],
        [1489.17, 724.15, 420, -205.55, 1],
        [666, 84, 420, -50.76, 1],
        [1454.81, 579.78, 420, -150.68, 1],
        [208, 59, 420, -189.63, 1],
        [753.2, 956.17, 420, -274.67, 1],
        [1850.57, 619.08, 420, -135.8, 1],
        [739.44, 453.13, 420, -120.51, 1],
        [720.17, 724.15, 420, -205.55, 1],
        [589.35, 681.67, 420, -235.72, 1],
        [1100.87, 482.91, 420, -105.63, 1],
        [-8, 82, 420, -274.67, 1],
        [1388.36, 601.97, 420, -185.58, 1],
        [1845, 76, 420, -89.71, 1],
        [666.64, 776.42, 420, -169.35, 1],
        [1113.54, 814.05, 420, -154.47, 1],
        [623.04, 985.03, 420, -189.63, 1],
        [532, 53, 420, -20.59, 1],
        [1537.62, 947.42, 420, -62.98, 1],
        [1111, 97, 420, 22.06, 1],
        [1124.98, 1026.86, 420, -174.75, 1],
        [1682.26, 696.76, 420, -162.9, 1],
        [1869.87, 482.91, 420, -105.63, 1],
        [1893.98, 1026.86, 420, -174.75, 1],
        [36, 1029, 420, -274.67, 1],
        [997.89, 603.26, 420, -85.66, 1],
        [308, 283, 420, -182, 1],
        [863, 69, 420, -69.43, 1],
        [1435.64, 776.42, 420, -169.35, 1],
        [242, 1009, 420, -396.52, 1],
        [1511, 209, 420, -0.62, 1],
        [924.29, 449.04, 420, -105.63, 1],
        [1508.44, 453.13, 420, -120.51, 1],
        [172, 862, 420, -396.52, 1],
        [1175, 482, 420, 22.06, 1],
        [949.2, 654.17, 420, -274.67, 1],
        [137, 246, 420, -274.67, 1],
        [1392.04, 985.03, 420, -189.63, 1],
        [232, 727, 420, -274.67, 1],
        [1076, 76, 420, -89.71, 1],
        [1497.83, 258.39, 420, -77.86, 1],
        [105, 157, 420, -274.67, 1],
        [1552.95, 556.04, 420, -205.55, 1],
        [728.83, 258.39, 420, -77.86, 1],
        [1378, 543, 420, -100.54, 1],
        [1081.57, 619.08, 420, -135.8, 1],
        [577.47, 375.05, 420, -120.51, 1],
        [1252, 226, 420, -20.59, 1],
        [1882.54, 814.05, 420, -154.47, 1],
        [685.81, 579.78, 420, -150.68, 1],
        [391.79, 679.57, 420, -254.39, 1],
        [711.72, 687.25, 420, -396.52, 1],
        [643, 166, 420, -0.62, 1],
        [1809.62, 297.42, 420, -62.98, 1],
        [619.36, 601.97, 420, -185.58, 1],
        [1766.89, 603.26, 420, -85.66, 1],
        [342, 97, 420, 22.06, 1],
        [1693.29, 449.04, 420, -105.63, 1],
        [609, 543, 420, -100.54, 1],
        [1040.62, 297.42, 420, -62.98, 1],
        [483, 226, 420, -20.59, 1],
        [91, 396, 420, -396.52, 1],
        [1160.79, 679.57, 420, -254.39, 1],
        [783.95, 556.04, 420, -205.55, 1],
        [1435, 84, 420, -50.76, 1],
        [558.66, 361.38, 420, -396.52, 1],
        [1346.47, 375.05, 420, -120.51, 1],
        [10, 769, 420, -396.52, 1],
        [913.26, 696.76, 420, -162.9, 1],
        [92, 619, 420, -182, 1],
        [1301, 53, 420, -20.59, 1]
    ].map(([x, y, size, rotation, tone]) => ({ x, y, size, rotation, tone }));

    const VERTEX_SHADER = `
        attribute vec2 aPosition;
        attribute vec2 aCenter;
        attribute float aSize;
        attribute float aRotation;
        attribute float aTone;
        uniform vec2 uResolution;
        varying vec2 vUv;
        varying float vTone;

        void main() {
            float c = cos(aRotation);
            float s = sin(aRotation);
            vec2 rotated = mat2(c, -s, s, c) * aPosition;
            vec2 pixel = aCenter + rotated * aSize * 0.5;
            vec2 clip = pixel / uResolution * 2.0 - 1.0;
            gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
            vUv = aPosition * 0.5 + 0.5;
            vTone = aTone;
        }
    `;

    const FRAGMENT_SHADER = `
        precision mediump float;
        varying vec2 vUv;
        varying float vTone;
        uniform float uTime;

        float polarStar(vec2 point) {
            const float pi5 = 0.628318530718;
            float segment = mod(atan(point.y, point.x) / pi5 + 10.0, 2.0);
            const float sharpness = -0.95;
            return length(point) * cos(
                (pi5 * sharpness) * (segment - 4.0 * step(1.0, segment) + 1.0)
            ) - 1.0;
        }

        void main() {
            vec2 uv = (vUv - 0.5) * 3.0;
            const float shaderRotation = 5.96;
            float c = cos(shaderRotation);
            float s = sin(shaderRotation);
            uv = mat2(c, -s, s, c) * uv;

            float boundary = polarStar(uv * 3.7);
            if (boundary > 1.0) discard;

            float distanceBand = polarStar(uv) * 5.0;
            // Unity's scalar _Time resolves to _Time.x, which advances at one twentieth of real time.
            const float rippleSpeed = 2.3815;
            float band = step(0.0, sin(distanceBand * 6.5 + uTime * rippleSpeed));
            vec3 darkTone = mix(vec3(0.565), vec3(0.0), step(0.5, vTone));
            gl_FragColor = vec4(mix(darkTone, vec3(1.0), band), 1.0);
        }
    `;

    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const message = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`P5R star shader failed to compile: ${message}`);
        }
        return shader;
    }

    function createProgram(gl) {
        const program = gl.createProgram();
        gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
        gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const message = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(`P5R star shader failed to link: ${message}`);
        }
        return program;
    }

    function createVertexData(instances) {
        const corners = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        const values = [];
        instances.forEach(({ x, y, size, rotation, tone }) => {
            const radians = rotation * Math.PI / 180;
            for (let index = 0; index < corners.length; index += 2) {
                values.push(corners[index], corners[index + 1], x, y, size, radians, tone);
            }
        });
        return new Float32Array(values);
    }

    function createStarField(canvas) {
        const gl = canvas.getContext('webgl', {
            alpha: true,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true
        });
        if (!gl) return null;

        const program = createProgram(gl);
        const vertexData = createVertexData(STAR_INSTANCES);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

        const locations = {
            position: gl.getAttribLocation(program, 'aPosition'),
            center: gl.getAttribLocation(program, 'aCenter'),
            size: gl.getAttribLocation(program, 'aSize'),
            rotation: gl.getAttribLocation(program, 'aRotation'),
            tone: gl.getAttribLocation(program, 'aTone'),
            resolution: gl.getUniformLocation(program, 'uResolution'),
            time: gl.getUniformLocation(program, 'uTime')
        };

        canvas.width = 1920;
        canvas.height = 1080;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        const stride = 7 * Float32Array.BYTES_PER_ELEMENT;
        const bindAttribute = (location, size, offset) => {
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset * Float32Array.BYTES_PER_ELEMENT);
        };
        bindAttribute(locations.position, 2, 0);
        bindAttribute(locations.center, 2, 2);
        bindAttribute(locations.size, 1, 4);
        bindAttribute(locations.rotation, 1, 5);
        bindAttribute(locations.tone, 1, 6);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform2f(locations.resolution, canvas.width, canvas.height);

        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        let animationFrame = 0;
        let startedAt = performance.now();

        // Every instance shares the reference material clock and lives in one static buffer, so a frame is one draw call.
        function render(timestamp) {
            const seconds = reducedMotion.matches ? 0 : (timestamp - startedAt) / 1000;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(locations.time, seconds);
            gl.drawArrays(gl.TRIANGLES, 0, STAR_INSTANCES.length * 6);
            animationFrame = reducedMotion.matches ? 0 : requestAnimationFrame(render);
        }

        function start() {
            cancelAnimationFrame(animationFrame);
            startedAt = performance.now();
            animationFrame = requestAnimationFrame(render);
        }

        function stop() {
            cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        }

        function handleVisibility() {
            if (document.hidden) stop();
            else start();
        }

        document.addEventListener('visibilitychange', handleVisibility);
        reducedMotion.addEventListener?.('change', start);
        start();

        return {
            instanceCount: STAR_INSTANCES.length,
            visibleInstanceCount: STAR_INSTANCES.filter(({ size }) => size > 0).length,
            start,
            stop
        };
    }

    window.P5RGodotPort = { createStarField, instances: STAR_INSTANCES };
})();
