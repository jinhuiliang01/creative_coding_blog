---
title: Homework 6a
published_at: 2025-04-10
snippet: Answer the questions of javascript libiaries. Use one of the libraries to demonstrate how to use a signal or envelope to make something change over time. And give a brief summary of the articles.
disable_html_sanitization: true
allow_math: true
---

# Answer the questions of javascript libiaries

q5.js
c2.js
svg.js

1. What is each library for? In what ways are they different?

q5.js is a creative coding library based on p5.js. It’s designed to make it easy to create interactive graphics, animations, and visual experiences in the browser. Compared to the others, it's most focused on creative visual programming and beginner-friendly syntax.

c2.js is a computational design and generative art library. It emphasizes mathematical and algorithmic graphics, often using functional programming concepts. It usually emphasizes pure functions and compositional logic over a procedural drawing style.

svg.js is a library for manipulating SVG (Scalable Vector Graphics) in the DOM using JavaScript. svg.js is better for UI-integrated visuals and responsive graphics. And elements are accessible and stylable via CSS, and can be manipulated like HTML.

2. Can we use these libraries from within a javascript module? Explain why / why not. In what situations might a tool like esm.sh be useful?

Yes, we can use them, but how we import them depends on how the library is packaged.

Tools like esm.sh will be useful when a library is only available as a CommonJS or UMD module. Or working in a modern browser like deno.
This would not work in a module:
`<script src="q5.js"></script>`
But this may work in a module:
`import q5 from 'https://esm.sh/q5'`

# Use one of the libraries to demonstrate how to use a signal or envelope to make something change over time.

Animate a circle's size using an envelope (like a fade in/out)

### Envelope-Based Circle Animation in p5.js

This animation shows how an envelope can be used to control the size of a circle.

<div id="sketch-container"></div>

<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
<script>
  let startTime;
  let duration = 4000;
  let radius = 0;

  function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent('sketch-container');
    startTime = millis();
  }

  function draw() {
    background(30);
    let elapsed = millis() - startTime;
    let t = elapsed / duration;

    if (t < 0.25) {
      radius = map(t, 0, 0.25, 0, 100);
    } else if (t < 0.5) {
      radius = map(t, 0.25, 0.5, 100, 60);
    } else if (t < 0.75) {
      radius = 60;
    } else if (t < 1) {
      radius = map(t, 0.75, 1, 60, 0);
    } else {
      startTime = millis();
    }

    fill(100, 200, 255);
    noStroke();
    ellipse(width / 2, height / 2, radius * 2, radius * 2);
    fill(255);
    textAlign(CENTER);
    text("t = " + nf(t, 1, 2), width / 2, height - 20);
  }
</script>

# Give a brief summary of the articles.

1. Information & Thinking by Michel Serres
   This text talks about how our brains and the way we think are changing because of technology. Michel Serres says we used to keep lots of info in our heads, but now we use phones and computers to remember stuff for us. It’s like our brains are becoming more about how we think, not just what we know. He compares it to learning how to play an instrument versus just reading about music.

2. What Is It Like to Be a Fungus? by Merlin Sheldrake
   This text explores the weird and amazing world of fungi—those things like mushrooms and mold. Merlin Sheldrake says fungi live in networks underground, almost like the internet, and they might even "communicate" in strange ways. He asks, what if being a fungus is totally different from being an animal or a human? It makes us rethink what life and intelligence really are.

3. Xenofeminism: A Politics for Alienation by Laboria Cuboniks
   This text says we can use science and technology to make the world fairer for everyone, especially for people who are often left out. The writers believe we shouldn’t be afraid to change things like gender roles or even biology if it helps people be more free. They want to "hack" the system to make it better.
