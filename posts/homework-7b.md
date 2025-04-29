---
title: Homework 7b
published_at: 2025-04-29
snippet: Answer some reflective questions of the book. And write an accompaniment to my AT2.
disable_html_sanitization: true
allow_math: true
---

# Here are the reflection answers to the book.

In her essay on Sianne Ngai: Zany, Cute, Interesting, McKenzie Wark writes: "Unlike the interesting, the zany really works against its constraints."

1. What do you think she means by this?

She means 'interesting' is following the rules and shows how the system works. But 'zany' is like trying to break the rules. The 'zany' doesn’t follow the rules. It pushes too hard, freaks out, and ends up looking ridiculous or funny.

2. In what ways would you consider the chaotic and the zany to be similar? In what ways are they different?

Similar: Chaotic is all about messiness, while zany is wild and outside the box but with a touch of silliness, so in summary both give off a wild, chaotic vibe. When things get messy or weird, it's hard to predict what will happen next. It could be overwhelming.

Different: The biggest difference is why they are crazy. ‘chaotic’ is random chaos with no purpose, as if out of control, with no way to anticipate or guess what the next move will be. ’Zany‘ is more like someone trying really hard to stay calm, but completely exceeding expectations. It was chaotic, but it had a purpose.

3. In what ways would you consider your AT2 to be zany?

My AT 2 created a crazy, chaotic world. But is still following the rule I set to the cubes. Cubes in the city are not randomly generated and assembled, they have their own place. They have their own positions, I just set up a program to make them clutter up a fixed area. And this chaos is intentional, because I want people to achieve a PEACEFUL state by finding the blocks I ask them to find in this chaotic world, to quell or stop the chaos.

4. What might be some ways to make your AT2 more zany?

If I want to make my AT 2 more zany, I think I should need to add some chaotic elements other than cubes. For example, chaotic sounds or a crazy world with the whole surface going crazy.

# Here is an accompaniment to my AT2.

1. Examples of how and where it uses: variables, iteration, functions, boolean logic, arrays, classes, recursion.

Example of variables: Use for storing game state and configuration.

'''let camera, scene, renderer; // Core Three.js components
let keys = {}; // Track keyboard state
const WORLD_HEIGHT = 1.7; // Constant for player height
let buildings = []; // Array of 3D building objects
let glitchIntensity = 0; // Dynamic game value

````

Example of iteration: Use for creating or managing groups of objects.

```// Generate grid of buildings
for (let x = -25; x <= 25; x += spacing) {
  for (let z = -25; z <= 25; z += spacing) {
    // Building creation logic
  }
}

// Update all buildings
buildings.forEach(b => {
  // Glitch effect logic
});
````

Example of functions: Use for organizing game logic.

```function init() { /* Setup game */ }                 // Initialization
function animate() { /* Game loop */ }               // Main loop
function handleMovement() { /* Input handling */ }   // Modular logic
```

Example of boolean logic: Use for controling flow and state.

```if (dist < 2.5) { /* Cube proximity check */ }       // Conditionals
Math.random() > 0.5 ? 0x111111 : 0x000000           // Ternary operator
if (!chaosStopped) updateGlitchEffect();             // State check
```

Example of arrays: Use for managing collections of objects.

```let buildings = [];                                  // 3D object storage
const positions = new Float32Array(count * 3);       // Particle positions
buildings.push(building);                            // Add to array
```

Example of classes: Use for Three.js object creation.

```class THREE.Mesh { /* 3D object */ }                // 3D object class
const camera = new THREE.PerspectiveCamera();       // Camera instance
new THREE.BoxGeometry(width, height, depth);        // 3D shape
```

Example of recursion: Use for building rows of buildings from left to right in the 3D city.

```function createChaoticCity() {
  // Recursive function to build rows
  function generateBuildingRow(currentX) {
    if (currentX > 25) return; // Stop when reaching the right side (base case)

    // Build a row of buildings at the current X position
    for (let z = -25; z <= 25; z += 3) {
    ... (code to create buildings)
    }

    // Move 3 units to the right and repeat
    generateBuildingRow(currentX + 3); // Recursive call
  }

  // Start building from the leftmost position (X = -25)
  generateBuildingRow(-25); // Initial call
}
```

2. How it responds to the chosen text?

My chosen text is 'information and thinking' by Michel Serres. And I wanna reflect to the passage "Thinking means inventing: getting hold of rarity, discovering the secret of that which has the huge and contingent chance to exist...".
Discovering the secret of great naturalness corresponds to the black cube I want users to find; rarity means that this cube is different from the others in the world and is scarce. I think this is a good match in that respect. In terms of gameplay, I'm hoping that by playing this little game I can realise that thinking means inventing, that exploring the world corresponds to thinking, and that inventing corresponds to the change that occurs when you find the required cube. In my little game, touching the black square stops all chaotic, whether it's the crazy squares or the chaotic soundtrack. In a world full of noise (like news and ads), true ideas are like hidden treasures waiting to be found.

3. Why you consider it to be post-digital?

The concept of post-digital art is kind of like this: artists mix digital tools with real world stuff to create something new. So the real thing in my AT 2 is that the protagonist actually moves like a normal human, he can move and observe from front to back, and at the same time I combined digital tools to make the whole city look crazy, and at the same time the protagonist needs to achieve a goal to stop this craziness.
