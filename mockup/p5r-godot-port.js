(() => {
    const VERTEX_SHADER = `
        attribute vec2 aPosition;
        uniform vec2 uResolution;
        uniform vec2 uCenter;
        uniform float uSize;
        uniform float uRotation;
        varying vec2 vPoint;

        void main() {
            float c = cos(uRotation);
            float s = sin(uRotation);
            vec2 rotated = mat2(c, -s, s, c) * aPosition;
            vec2 pixel = uCenter + rotated * uSize * 0.5;
            vec2 clip = pixel / uResolution * 2.0 - 1.0;
            gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
            vPoint = aPosition;
        }
    `;

    const FRAGMENT_SHADER = `
        precision mediump float;
        varying vec2 vPoint;
        uniform float uTime;
        uniform float uFrequency;
        uniform float uSpeed;
        uniform float uPhase;
        uniform float uSharpness;
        uniform float uOpacity;
        uniform vec3 uColor;

        float polarStar(vec2 point) {
            const float pi5 = 0.628318530718;
            float segment = mod(atan(point.y, point.x) / pi5 + 1.0, 2.0);
            float adjusted = -uSharpness;
            return length(point) * cos(
                (pi5 * adjusted) * (segment - 4.0 * step(1.0, segment) + 1.0)
            ) - 1.0;
        }

        void main() {
            float distanceToEdge = polarStar(vPoint * 1.18);
            if (distanceToEdge > 0.025) discard;

            float inwardDistance = clamp(-distanceToEdge, 0.0, 1.0);
            float wave = sin(
                inwardDistance * uFrequency * 6.28318530718
                - uTime * uSpeed
                + uPhase
            );
            float band = smoothstep(0.46, 0.78, wave);
            float edge = 1.0 - smoothstep(-0.015, 0.025, distanceToEdge);
            float alpha = band * edge * uOpacity;
            gl_FragColor = vec4(uColor, alpha);
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

    function parseColor(value) {
        const normalized = value.replace('#', '');
        const integer = Number.parseInt(normalized, 16);
        return [
            ((integer >> 16) & 255) / 255,
            ((integer >> 8) & 255) / 255,
            (integer & 255) / 255
        ];
    }

    function createStarField(canvas, clusters) {
        const gl = canvas.getContext('webgl', {
            alpha: true,
            antialias: true,
            premultipliedAlpha: true
        });
        if (!gl) return null;

        const program = createProgram(gl);
        const positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positions);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );

        const locations = {
            position: gl.getAttribLocation(program, 'aPosition'),
            resolution: gl.getUniformLocation(program, 'uResolution'),
            center: gl.getUniformLocation(program, 'uCenter'),
            size: gl.getUniformLocation(program, 'uSize'),
            rotation: gl.getUniformLocation(program, 'uRotation'),
            time: gl.getUniformLocation(program, 'uTime'),
            frequency: gl.getUniformLocation(program, 'uFrequency'),
            speed: gl.getUniformLocation(program, 'uSpeed'),
            phase: gl.getUniformLocation(program, 'uPhase'),
            sharpness: gl.getUniformLocation(program, 'uSharpness'),
            opacity: gl.getUniformLocation(program, 'uOpacity'),
            color: gl.getUniformLocation(program, 'uColor')
        };

        canvas.width = 1920;
        canvas.height = 1080;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.enableVertexAttribArray(locations.position);
        gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.uniform2f(locations.resolution, canvas.width, canvas.height);
        gl.uniform1f(locations.sharpness, 0.945);

        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        const preparedClusters = clusters.map((cluster, index) => ({
            ...cluster,
            radians: cluster.rotation * Math.PI / 180,
            frequency: Math.max(5, cluster.rings || 8),
            speed: (index % 2 === 0 ? 3 : -3) * (2 * Math.PI),
            color: parseColor(cluster.tone),
            opacity: index < 5 ? .58 : .42
        }));

        let animationFrame = 0;
        let startedAt = performance.now();

        // All star instances share one clock, but their phase and direction are
        // independent so each silhouette carries its own traveling contour wave.
        function render(timestamp) {
            const seconds = reducedMotion.matches ? 0 : (timestamp - startedAt) / 1000;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            preparedClusters.forEach((cluster) => {
                gl.uniform2f(locations.center, cluster.x, cluster.y);
                gl.uniform1f(locations.size, cluster.size);
                gl.uniform1f(locations.rotation, cluster.radians);
                gl.uniform1f(locations.time, seconds);
                gl.uniform1f(locations.frequency, cluster.frequency);
                gl.uniform1f(locations.speed, cluster.speed);
                gl.uniform1f(locations.phase, cluster.phase * 2.4);
                gl.uniform1f(locations.opacity, cluster.opacity);
                gl.uniform3fv(locations.color, cluster.color);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            });

            animationFrame = requestAnimationFrame(render);
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

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stop();
            else start();
        });

        start();
        return { start, stop };
    }

    window.P5RGodotPort = { createStarField };
})();
