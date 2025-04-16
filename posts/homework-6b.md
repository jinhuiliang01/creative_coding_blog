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

I'm going to use q5.js and glitch for my AT2.

## 3. Combine the passages and techniques I have chosen into a rudimentary rough draft for my AT2

I chose the passge number 2 which is about "Thinking means inventing: getting hold of rarity, discovering the secret of that which has the huge and contingent chance to exist...".

The concept came up of my mind is about inventing = creating order from chaos, and discovering secrets = interaction with the audience, contingent chance = randomness of the order, gold = the value of truth.

I plan to do a clickable canvas where chaotic letters (glitched text) slowly organize into a meaningful phrase when interacted with. Uses glitch effects (easy pixel manipulation) and signals (simple sound feedback).

# Once I have my rough draft of my assignment 2, solicit some critical, constructive feedback from three colleagues.

# Use these responses to devise a plan for the next phase of my AT2 project.

<script src="https://q5js.org/q5.min.js"></script>
<script>
    function setup() {
  createCanvas(750, 400);
  textSize(30);
  letters = []; // Empty box to hold our letter toys
  isOrdered = false; // Start with messy letters (not organized)
  phrase = "SEEK THE TRUTH"; 
  for (let i = 0; i < phrase.length; i++) { // For each letter in our secret message
    letters.push({ // Make a letter and put it in the box
      char: phrase[i], // The actual letter
      x: random(width), // Throw it randomly left-right
      y: random(height), // Throw it randomly up-down
      targetX: 50 + i * 25, // Final organized position
      targetY: 100
    });
  }
}
function draw() {
  background(0); // Paint everything black every frame
  if (!isOrdered) { // If we're in Chaos 
    // Chaos: Glitch effect with random positions/colors
    letters.forEach(letter => { // For each letter
      fill(random(200, 255), random(100), random(100), 150); // Fill the colors
      text(letter.char, letter.x + random(-2, 2), letter.y + random(-2, 2)); // Let the texts shaking
    });
  } else { // If we're in Order
    // Order: Letters animate toward their true form
    letters.forEach(letter => {
      letter.x = lerp(letter.x, letter.targetX, 0.1); // Slide smoothly to target X
      letter.y = lerp(letter.y, letter.targetY, 0.1); // Slide smoothly to target Y
      fill(255, 215, 0); // Gold = discovered truth
      text(letter.char, letter.x, letter.y); // Draw letter
    });
  }
}
function mousePressed() {
  isOrdered = !isOrdered; // Click = switch between chaos/order
}
</script>

This is the rough draft of my AT 2 and I plan to add some phrases and sound effects after it.
