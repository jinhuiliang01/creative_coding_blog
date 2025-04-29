---
title: Homework 6b
published_at: 2025-04-15
snippet: Implement a simple shader in my blog, respond some questions of my assignment 2. Once I have my rough draft of my assignment 2, solicit some critical, constructive feedback from three colleagues.
disable_html_sanitization: true
allow_math: true
---

# This is the moire and shader work

<div id="moire_circles"></div>
<script type="module" id="moire_circles_script">
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.174.0/three.module.js" 
import codeblockRenderer from "/250415/codeblock_renderer.js"
const div = document.getElementById ("moire_circles")
const width = div.parentNode.scrollWidth
const height = width * 9 / 16
// Basic three.js setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
camera.position.z = 0.6
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
div.appendChild(renderer.domElement)
// Track mouse position
const mouse = new THREE.Vector2(0.5, 0.5)
div.onmousemove = event => {
const rect = renderer.domElement.getBoundingClientRect()
mouse.x = (event.clientX - rect.left) / width
mouse.y = 1.0 - (event.clientY - rect.top) / height
}
div.onmouseleave = () => {
    mouse.x = 0.5
      mouse.y = 0.5
   }
// Create shader material with more complex patterns
const shaderMaterial = new THREE.ShaderMaterial({
uniforms: {
u_time: { value: 0.0 },
u_mouse: { value: mouse },
u_resolution: { value: new THREE.Vector2(width, height) }
},
vertexShader: `       varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
  `,
fragmentShader: `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;
        // Helper function for smooth interpolation
        float smoothCircle(vec2 uv, vec2 center, float radius, float smoothness) {
            return smoothstep(radius, radius + smoothness, distance(uv, center));
        }
        void main() {
            // Normalized pixel coordinates with aspect ratio correction
            float aspect = u_resolution.x / u_resolution.y;
            vec2 uv = vec2(vUv.x * aspect, vUv.y);
            vec2 mousePos = vec2(u_mouse.x * aspect, u_mouse.y);
            // Animate centers slightly
            vec2 center1 = vec2(0.5 * aspect + sin(u_time * 0.3) * 0.1,
                         0.5 + cos(u_time * 0.2) * 0.1);
            vec2 center2 = mousePos;
            // Create multiple circle patterns with different frequencies
           float pattern1 = sin(distance(uv, center1) * 200.0 + u_time * 2.0) * 0.5 + 0.5;
           float pattern2 = cos(distance(uv, center2) * 180.0 - u_time * 1.5) * 0.5 + 0.5;
           float pattern3 = sin(distance(uv, center1) * 160.0 + u_time * 3.0) * 0.5 + 0.5;
            // Combine patterns in interesting ways
            float moire1 = pattern1 * pattern2;
            float moire2 = pattern2 * pattern3;
            float moire3 = pattern1 * pattern3;
            // Add some color variation based on patterns and time
            float r = mix(moire1, moire2, sin(u_time * 0.5) * 0.5 + 0.5);
            float g = mix(moire2, moire3, u_mouse.x);
            float b = mix(moire3, moire1, u_mouse.y);
            // Add pulsing effect
            float pulse = sin(u_time) * 0.1 + 0.9;
            vec3 color = vec3(r * pulse, g * pulse, b * pulse);
            // Add subtle gradient
            color *= 0.8 + 0.2 * vUv.y;
            gl_FragColor = vec4(color, 1.0);
        }
    `
});
// Create plane and add to scene
const geometry = new THREE.PlaneGeometry(1.6, 0.9)
const mesh = new THREE.Mesh(geometry, shaderMaterial)
scene.add(mesh)
// Handle window resize
window.addEventListener('resize', () => {
const width = div.parentNode.scrollWidth
const height = width * 9 / 16
camera.aspect = width / height
camera.updateProjectionMatrix()
renderer.setSize(width, height)
shaderMaterial.uniforms.u_resolution.value.set(width, height)
})
// Animation loop
renderer.setAnimationLoop(time => {
shaderMaterial.uniforms.u_time.value = time * 0.001
shaderMaterial.uniforms.u_mouse.value = mouse
renderer.render(scene, camera)
})
// Render code block
codeblockRenderer(document, "moire_circles_script", "moire_circles")
</script>

# Respond some questions about my assignment 2.

## 1. Pick three passages from the text that speak to you the loudest

(1). "We are not so exceptional; we are not the only ones endowed with the capability to see, read or write..."
(Page 4, Chapter Two)\
Reason:
It reminds us that humans aren’t the only "smart" things in the universe. Nature "talks" too—like wind shaping dunes or trees marking time in their rings. It’s a beautiful way to see the world as full of meaning, not just because of us.

(2). "Thinking means inventing: getting hold of rarity, discovering the secret of that which has the huge and contingent chance to exist..."
(Page 2, Chapter Two)\
Reason:
Real thinking isn’t just repeating what we already know—it’s about creating something new and rare. In a world full of noise (like news and ads), true ideas are like hidden treasures waiting to be found.

(3). "The night with its countless truths resembles the high cave and its shining gems... a better model of knowledge than the sun-struck, cruel, exclusive light of day."
(Page 6, Chapter Two)\
Reason:
Truth isn’t just one bright, harsh thing. It’s more like stars—many little lights, each different, twinkling in the dark. This feels fairer and more honest than pretending one big idea explains everything.

## 2. Pick at least two techniques we have covered over the course of this unit

I'm going to use Three.js and glitch for my AT2.

## 3. Combine the passages and techniques I have chosen into a rudimentary rough draft for my AT2

I will create a chaotic world. In some specific angle you could see some words. And the background would make some chaotic sound at first, when you find the word it would become a clean sound.

<!DOCTYPE html>
<html>
<head>
    <title>homework-6b</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        let camera, scene, renderer;
        let keys = {};
        let moveSpeed = 0.1;
        let mouseSensitivity = 0.002;
        const WORLD_HEIGHT = 1.7;
        init();
        animate();
        function init() {
            // Scene setup
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);
            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
            camera.position.set(0, WORLD_HEIGHT, 0);
            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            // Create environment
            createChaoticCity();
            createGridFloor();
            // Controls
            document.addEventListener('keydown', (e) => keys[e.key] = true);
            document.addEventListener('keyup', (e) => keys[e.key] = false);
            // Mouse lock
            document.addEventListener('click', () => {
                document.body.requestPointerLock();
            });
            // Mouse movement (horizontal only)
            document.addEventListener('mousemove', (e) => {
                if (document.pointerLockElement === document.body) {
                    camera.rotation.y -= e.movementX * mouseSensitivity;
                    camera.rotation.x = 0; // Lock vertical rotation
                }
            });
        }
        function createGridFloor() {
            // White base plane
            const floorGeometry = new THREE.PlaneGeometry(100, 100);
            const floorMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI/2;
            scene.add(floor);
            // Black grid lines
            const grid = new THREE.GridHelper(100, 50, 0x000000, 0x000000);
            grid.material.opacity = 1.0;
            grid.material.transparent = false;
            grid.position.y = 0.01; // Slightly above floor to prevent z-fighting
            scene.add(grid);
        }
        function createChaoticCity() {
            const spacing = 4;
            const baseSize = 1;
            for(let x = -25; x <= 25; x += spacing) {
                for(let z = -25; z <= 25; z += spacing) {
                    if(Math.random() > 0.5) {
                        // Random cube dimensions
                        const width = baseSize * (0.5 + Math.random());
                        const height = baseSize * (0.5 + Math.random() * 3);
                        const depth = baseSize * (0.5 + Math.random());
                        // Random elevation (30% chance to float)
                        let yPos = height/2;
                        if(Math.random() > 0.7) {
                            yPos += 2 + Math.random() * 5; // Float 2-7 units above ground
                        }
                        // Create irregular cube
                        const geometry = new THREE.BoxGeometry(width, height, depth);
                        const material = new THREE.MeshBasicMaterial({
                            color: 0xffffff
                        });
                        const building = new THREE.Mesh(geometry, material);
                        building.position.set(
                            x + (Math.random() - 0.5) * 2, // Add horizontal randomness
                            yPos,
                            z + (Math.random() - 0.5) * 2
                        );
                        // White wireframe
                        const edges = new THREE.EdgesGeometry(geometry);
                        const wireframe = new THREE.LineSegments(
                            edges,
                            new THREE.LineBasicMaterial({ color: 0xffffff })
                        );
                        building.add(wireframe);
                        scene.add(building);
                    }
                }
            }
        }
        function handleMovement() {
            const direction = new THREE.Vector3();
            if(keys['w']) direction.z -= 1;
            if(keys['s']) direction.z += 1;
            if(keys['a']) direction.x -= 1;
            if(keys['d']) direction.x += 1;
            if(direction.length() === 0) return;
            direction.normalize();
            const yaw = camera.rotation.y;
            const forward = new THREE.Vector3(
                Math.sin(yaw),
                0,
                Math.cos(yaw)
            ).normalize();
            const right = new THREE.Vector3(
                Math.cos(yaw),
                0,
                -Math.sin(yaw)
            ).normalize();
            camera.position.add(
                right.multiplyScalar(direction.x * moveSpeed)
                    .add(forward.multiplyScalar(direction.z * moveSpeed))
            );
            camera.position.y = WORLD_HEIGHT;
        }
        function animate() {
            requestAnimationFrame(animate);
            handleMovement();
            renderer.render(scene, camera);
        }
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>

# Once I have my rough draft of my assignment 2, solicit some critical, constructive feedback from three colleagues.

how well your rough draft coheres as:

1. response to your chosen text, and why / why not.
2. an example of the post-digital, and why / why not.
3. functioning in a chaotic aesthetic register, with reference to effective complexity.

# Use these responses to devise a plan for the next phase of my AT2 project.

On top of that add more messy elements as well as I want to a cube into it, in a way that it looks like a key. When user find this key they could stop the chaos. Then add some music into it to make it clear from Glitch. Symbolising people finding the truth, that is, discovering the secret of that which has the huge and contingent chance to exist, as mentioned in the article.
