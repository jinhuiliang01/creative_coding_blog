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

1. Pick three passages from the text that speak to you the loudest

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

2. Pick at least two techniques we have covered over the course of this unit

I choose the techniques of recurtion, signals / envelopes and q5.js / c2.js / svg.js

3. Combine the passages and techniques I have chosen into a rudimentary rough draft for my AT2

"Thinking means inventing" (Signals/Envelopes + p5.js)
Idea: Simulate the rarity of true ideas in a noisy world.

Use p5.js to generate a chaotic "noise field" (random particles = ads, news, distractions).

Introduce signals (sudden bursts of geometric shapes) that pierce the noise. Each signal follows an envelope (attack/decay) to symbolize fleeting moments of clarity.

Interaction: Users "invent" by dragging to connect signals into rare, coherent forms (e.g., a polygon that quiets the noise around it).

## Thinking Means Inventing

This interactive artwork explores how true ideas emerge from a noisy world...

<style>
  .canvas-wrapper {
    width: 100%;
    max-width: 100%;
    height: 400px; /* Change this number to control how tall it is */
    margin: 2em 0;
    border: 1px solid #ccc;
  }

  #myCanvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
</style>

<div style="width: 100%; max-width: 800px; height: 600px; margin: 20px auto; overflow: hidden; border: 1px solid #ccc;">
  
  <canvas id="myCanvas"></canvas>
  
<div class="canvas-wrapper">
  <canvas id="myCanvas"></canvas>
</div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js"></script>
</div>

<script>
    // Audio setup
    let synth, pingPong, filter, lowPass;
    let notes = ['C4', 'E4', 'G4', 'B4', 'D5', 'F5', 'A5'];
    let lastSignalTime = 0;
    let connected = false;
    let clarity = 0;
    // Visual elements
    let noiseParticles = [];
    let signals = [];
    let connections = [];
    let activeSignals = [];
    let mouseConnecting = false;
    let startSignal = null;
    let noiseLevel = 1.0;
    // Performance variables
    const MAX_PARTICLES = 500;
    const SIGNAL_PROBABILITY = 0.005;
    const SIGNAL_TYPES = ["circle", "triangle", "square", "pentagon", "hexagon"];
    // Colors
    const BG_COLOR = 20;
    const PARTICLE_COLORS = [
      [50, 50, 50, 80],     // Darker Gray
      [30, 30, 150, 80],    // Darker Blue
      [150, 30, 30, 80],    // Darker Red
      [30, 150, 30, 80]     // Darker Green
    ];
    const SIGNAL_COLORS = [
      [255, 200, 100],      // Yellow-orange
      [100, 255, 200],      // Cyan
      [200, 100, 255],      // Purple
      [255, 100, 100]       // Red
    ];

    function preload() {
      // Setup for Tone.js
      Tone.start();
      // Create a synth with envelope
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.set({
        envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 0.5,
          release: 1.5
        }
      });
      // Effects chain
      pingPong = new Tone.PingPongDelay("8n", 0.4).toDestination();
      filter = new Tone.Filter(800, "lowpass").connect(pingPong);
      lowPass = new Tone.Filter(2000, "lowpass").connect(filter);
      synth.connect(lowPass);
    }

    function setup() {
      // Get the canvas element by ID and pass it to createCanvas
      const canvasElement = document.getElementById('myCanvas');
      let cnv = createCanvas(min(windowWidth, 800), min(windowHeight, 600), canvasElement);
      cnv.style('wdith', '100%');
      background(BG_COLOR);
      // Initialize noise particles
      for (let i = 0; i < MAX_PARTICLES; i++) {
        addNoiseParticle();
      }
    }

    function draw() {
      // Semi-transparent background for trails
      fill(BG_COLOR, BG_COLOR, BG_COLOR, 30);
      rect(0, 0, width, height);
      // Gradually restore noise level if clarity has been achieved
      if (noiseLevel < 1.0) {
        noiseLevel += 0.001;
      }
      // Randomly generate signals over time
      if (random() < SIGNAL_PROBABILITY && signals.length < 10) {
        createSignal();
      }
      // Update and display noise particles
      updateNoiseParticles();
      // Update and display signals
      updateSignals();
      // Draw connections between signals
      drawConnections();
      // Draw active connection if dragging
      if (mouseConnecting && startSignal) {
        stroke(255, 255, 255, 200);
        strokeWeight(2);
        line(startSignal.x, startSignal.y, mouseX, mouseY);
      }
      // Display clarity level
      fill(255);
      noStroke();
      textSize(16);
      text(`Clarity: ${int(clarity * 100)}%`, 20, 30);
      text(`Signals: ${signals.length}`, 20, 50);
      text(`Connections: ${connections.length}`, 20, 70);
      // Instruction
      if (!connected && frameCount < 300) {
        fill(255, 255, 255, sin(frameCount * 0.05) * 127 + 128);
        textAlign(CENTER);
        text("Drag between signals to connect them and create clarity", width/2, height - 30);
        textAlign(LEFT);
      }
    }

    function addNoiseParticle() {
      noiseParticles.push({
        x: random(width),
        y: random(height),
        size: random(1, 5),
        speedX: random(-1, 1),
        speedY: random(-1, 1),
        color: random(PARTICLE_COLORS),
        lifespan: 255,
        decay: random(0.5, 2)
      });
    }

    function updateNoiseParticles() {
      // Update and display each particle
      for (let i = noiseParticles.length - 1; i >= 0; i--) {
        let p = noiseParticles[i];
        // Noise affects particle movement
        let noiseVal = noise(p.x * 0.005, p.y * 0.005, frameCount * 0.002);
        let noiseAngle = noiseVal * TWO_PI * 2;
        // Update position with noise influence
        p.x += p.speedX + cos(noiseAngle) * 0.5 * noiseLevel;
        p.y += p.speedY + sin(noiseAngle) * 0.5 * noiseLevel;
        // Keep particles on screen with bounce
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        // Slow decay
        p.lifespan -= p.decay * noiseLevel;
        // Draw particle
        noStroke();
        fill(p.color[0], p.color[1], p.color[2], p.lifespan * 0.5);
        circle(p.x, p.y, p.size);
        // Remove dead particles and replace them
        if (p.lifespan <= 0) {
          noiseParticles.splice(i, 1);
          addNoiseParticle();
        }
      }
    }

    function createSignal() {
      // Play a note when signal appears
      if (millis() - lastSignalTime > 500) { // Prevent sound spam
        let note = random(notes);
        synth.triggerAttackRelease(note, "8n");
        lastSignalTime = millis();
      }
      let signal = {
        x: random(width * 0.1, width * 0.9),
        y: random(height * 0.1, height * 0.9),
        type: random(SIGNAL_TYPES),
        color: random(SIGNAL_COLORS),
        size: random(30, 50),
        envelope: {
          attack: 0,
          sustain: random(200, 600),
          decay: random(100, 300),
          phase: "attack",
          value: 0
        },
        rotation: 0,
        rotationSpeed: random(-0.02, 0.02),
        active: false,
        connections: []
      };
      signals.push(signal);
    }

    function updateSignals() {
      for (let i = signals.length - 1; i >= 0; i--) {
        let s = signals[i];
        // Update envelope
        let env = s.envelope;
        if (env.phase === "attack") {
          env.value += (1 / env.attack);
          if (env.value >= 1) {
            env.value = 1;
            env.phase = "sustain";
          }
        } else if (env.phase === "sustain") {
          env.sustain--;
          if (env.sustain <= 0) {
            env.phase = "decay";
          }
        } else if (env.phase === "decay") {
          env.value -= (1 / env.decay);
          if (env.value <= 0) {
            // Remove the signal if it has no connections
            if (s.connections.length === 0) {
              signals.splice(i, 1);
              continue;
            } else {
              // Keep it visible but dimmed if it has connections
              env.value = 0.3;
            }
          }
        }
        // Update rotation
        s.rotation += s.rotationSpeed;
        // Draw the signal
        push();
        translate(s.x, s.y);
        rotate(s.rotation);
        let alpha = env.value * 255;
        let size = s.size * (0.8 + 0.2 * env.value);
        // Draw glow effect
        noStroke();
        for (let g = 3; g > 0; g--) {
          fill(s.color[0], s.color[1], s.color[2], alpha * 0.2 / g);
          drawShape(s.type, 0, 0, size + g * 5);
        }
        // Draw main shape
        fill(s.color[0], s.color[1], s.color[2], alpha);
        drawShape(s.type, 0, 0, size);
        // Highlight if active
        if (s.active) {
          stroke(255, 255, 255, 200);
          strokeWeight(2);
          drawShape(s.type, 0, 0, size + 5);
        }
        pop();
      }
    }

    function drawShape(type, x, y, size) {
      if (type === "circle") {
        circle(x, y, size);
      } else if (type === "triangle") {
        drawPolygon(x, y, size/2, 3);
      } else if (type === "square") {
        rectMode(CENTER);
        rect(x, y, size, size);
      } else if (type === "pentagon") {
        drawPolygon(x, y, size/2, 5);
      } else if (type === "hexagon") {
        drawPolygon(x, y, size/2, 6);
      }
    }

    function drawPolygon(x, y, radius, sides) {
      beginShape();
      for (let i = 0; i < sides; i++) {
        let angle = TWO_PI * i / sides - PI/2;
        vertex(x + cos(angle) * radius, y + sin(angle) * radius);
      }
      endShape(CLOSE);
    }

    function drawConnections() {
      // Display existing connections
      for (let c of connections) {
        let s1 = signals[c[0]];
        let s2 = signals[c[1]];
        if (!s1 || !s2) continue; // Skip if either signal was removed
        let d = dist(s1.x, s1.y, s2.x, s2.y);
        let maxAlpha = map(d, 0, width/2, 200, 50);
        maxAlpha = constrain(maxAlpha, 50, 200);
        // Calculate blend color
        let c1 = s1.color;
        let c2 = s2.color;
        let blendColor = [
          (c1[0] + c2[0]) / 2,
          (c1[1] + c2[1]) / 2,
          (c1[2] + c2[2]) / 2,
        ];
        // Create a recursive line pattern
        drawRecursiveLine(s1.x, s1.y, s2.x, s2.y, 3, blendColor, maxAlpha);
      }
    }

    function drawRecursiveLine(x1, y1, x2, y2, depth, color, alpha) {
      if (depth <= 0) {
        stroke(color[0], color[1], color[2], alpha);
        strokeWeight(2);
        line(x1, y1, x2, y2);
        return;
      }
      // Find midpoint
      let midX = (x1 + x2) / 2;
      let midY = (y1 + y2) / 2;
      // Add some displacement based on perlin noise
      let displacement = 15 * (depth/3);
      let noiseVal = noise(midX * 0.01, midY * 0.01, frameCount * 0.01);
      let angle = noiseVal * TWO_PI;
      midX += cos(angle) * displacement;
      midY += sin(angle) * displacement;
      // Draw main line
      stroke(color[0], color[1], color[2], alpha);
      strokeWeight(1 + depth * 0.5);
      line(x1, y1, x2, y2);
      // Recursively draw two half-lines
      drawRecursiveLine(x1, y1, midX, midY, depth - 1, color, alpha * 0.8);
      drawRecursiveLine(midX, midY, x2, y2, depth - 1, color, alpha * 0.8);
    }

    function mousePressed() {
      // Check if clicked on a signal
      for (let i = 0; i < signals.length; i++) {
        let s = signals[i];
        if (dist(mouseX, mouseY, s.x, s.y) < s.size/2) {
          startSignal = s;
          mouseConnecting = true;
          s.active = true;
          // Play sound on signal select
          let note = random(notes);
          synth.triggerAttackRelease(note, "16n", undefined, 0.3);
          break;
        }
      }
    }

    function mouseDragged() {
      // Optional: Move selected signal if desired
      // if (startSignal) {
      //   startSignal.x = mouseX;
      //   startSignal.y = mouseY;
      // }
    }

    function mouseReleased() {
      if (mouseConnecting && startSignal) {
        // Check if released on another signal
        for (let i = 0; i < signals.length; i++) {
          let s = signals[i];
          let startIndex = signals.indexOf(startSignal);
          if (s !== startSignal && dist(mouseX, mouseY, s.x, s.y) < s.size/2) {
            // Connect the two signals
            let alreadyConnected = false;
            // Check if they're already connected
            for (let c of connections) {
              if ((c[0] === startIndex && c[1] === i) || 
                  (c[0] === i && c[1] === startIndex)) {
                alreadyConnected = true;
                break;
              }
            }
            if (!alreadyConnected) {
              connections.push([startIndex, i]);
              startSignal.connections.push(i);
              s.connections.push(startIndex);
              connected = true;
              // Enhance the signal lifespans
              startSignal.envelope.phase = "sustain";
              startSignal.envelope.sustain = 400;
              startSignal.envelope.value = 1;
              s.envelope.phase = "sustain";
              s.envelope.sustain = 400;
              s.envelope.value = 1;
              // Play a connection sound
              let note1 = notes[signals.length % notes.length];
              let note2 = notes[(signals.length + 2) % notes.length];
              synth.triggerAttackRelease(note1, "8n", Tone.now());
              synth.triggerAttackRelease(note2, "8n", Tone.now() + 0.1);
              // Reduce noise based on connections
              reduceNoise();
            }
            break;
          }
        }
        // Reset the starting signal
        if (startSignal) {
          startSignal.active = false;
        }
      }
      mouseConnecting = false;
      startSignal = null;
    }

    function reduceNoise() {
      // Calculate clarity based on connection patterns
      // More connections = less noise
      clarity = min(connections.length / 10, 0.95);
      noiseLevel = 1.0 - clarity;
      // Alter visual elements based on clarity
      let fadeAmount = map(clarity, 0, 1, 1, 5);
      // Make some noise particles fade faster
      for (let p of noiseParticles) {
        p.decay *= random(1, 1 + clarity * 0.5);
      }
      // If forming a complete shape (polygon)
      if (connections.length >= 3) {
        // Check if we have a cycle
        let cycle = findCycle();
        if (cycle.length >= 3) {
          // Create a moment of clarity
          createClarityEffect(cycle);
        }
      }
    }

    function createClarityEffect(cycle) {
      // Calculate the center of the cycle
      let centerX = 0, centerY = 0;
      for (let i of cycle) {
        centerX += signals[i].x;
        centerY += signals[i].y;
      }
      centerX /= cycle.length;
      centerY /= cycle.length;
      // Play a harmonic chord
      for (let i = 0; i < min(cycle.length, notes.length); i++) {
        synth.triggerAttackRelease(notes[i], "2n", Tone.now() + i*0.1, 0.6);
      }
      // Create a clarity zone that repels noise
      for (let p of noiseParticles) {
        let d = dist(p.x, p.y, centerX, centerY);
        let radius = calculatePolygonRadius(cycle);
        if (d < radius * 1.5) {
          // Repel particles from the clarity zone
          let angle = atan2(p.y - centerY, p.x - centerX);
          p.speedX += cos(angle) * 5;
          p.speedY += sin(angle) * 5;
          p.decay *= 1.5; 
        }
      }
    }

    function calculatePolygonRadius(vertices) {
      let maxDist = 0;
      let centerX = 0, centerY = 0;
      // Calculate center
      for (let i of vertices) {
        centerX += signals[i].x;
        centerY += signals[i].y;
      }
      centerX /= vertices.length;
      centerY /= vertices.length;
      // Find maximum distance
      for (let i of vertices) {
        let d = dist(signals[i].x, signals[i].y, centerX, centerY);
        maxDist = max(maxDist, d);
      }
      return maxDist;
    }

    // Find cycles in the connection graph (for polygon detection)
    function findCycle() {
      // Simple implementation to find the largest cycle
      // In a real application, you'd want a more robust cycle detection algorithm
      let visited = new Set();
      let bestCycle = [];
      // Try starting from each node
      for (let start = 0; start < signals.length; start++) {
        if (signals[start].connections.length < 2) continue;
        let path = [start];
        let cycle = findCycleFromNode(start, path, visited, new Set([start]));
        if (cycle.length > bestCycle.length) {
          bestCycle = cycle;
        }
      }
      return bestCycle;
    }

    function findCycleFromNode(current, path, visited, inPath) {
      visited.add(current);
      let bestCycle = [];
      // Check all connections from this node
      for (let neighbor of signals[current].connections) {
        // If we found a connection back to a node already in our path (not the previous one)
        if (inPath.has(neighbor) && path.length > 2 && neighbor === path[0]) {
          return [...path]; // Found a cycle
        }
        // If not visited, explore further
        if (!inPath.has(neighbor)) {
          path.push(neighbor);
          inPath.add(neighbor);
          let cycle = findCycleFromNode(neighbor, path, visited, inPath);
          if (cycle.length > bestCycle.length) {
            bestCycle = cycle;
          }
          // Backtrack
          path.pop();
          inPath.delete(neighbor);
        }
      }
      return bestCycle;
    }

    // Handle window resize
    function windowResized() {
      resizeCanvas(min(windowWidth, 800), min(windowHeight, 600));
    }
</script>

Interact with the artefacts:

Observe the signals that appear spontaneously in the noise field
Click and drag one signal to another to create a connection
Try to form closed shapes (triangles, squares, etc.) with your connections
Notice how the noise decreases as you create more coherent structures

The more connections you make, especially those that form complete shapes, the more noise particles are repelled and the percentage of clarity will increases.

# Once I have my rough draft of my assignment 2, solicit some critical, constructive feedback from three colleagues.

# Use these responses to devise a plan for the next phase of my AT2 project.
