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

# Using Signals in C2.js

<canvas id="c2-canvas" width="600" height="400" style="display:block; margin:auto;"></canvas>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>

<script src="https://unpkg.com/c2/c2.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    function checkC2() {
      if (typeof c2 === 'undefined') {
        setTimeout(checkC2, 100);
        return;
      }
      
      let frame = 0;
      c2.sketch(({ wrap }) => {
        wrap(() => {
          frame++;
          const signal = Math.sin((frame / 200) * Math.PI * 2);
          const radius = c2.map(signal, -1, 1, 50, 150);
          c2.background("black");
          c2.fill("cyan");
          c2.noStroke();
          c2.circle(c2.width / 2, c2.height / 2, radius);
        });
      }, document.getElementById("c2-canvas"));
    }
    
    checkC2();
  });
</script>

# Give a brief summary of the articles.

1. Information & Thinking by Michel Serres
   This text talks about how our brains and the way we think are changing because of technology. Michel Serres says we used to keep lots of info in our heads, but now we use phones and computers to remember stuff for us. It’s like our brains are becoming more about how we think, not just what we know. He compares it to learning how to play an instrument versus just reading about music.

2. What Is It Like to Be a Fungus? by Merlin Sheldrake
   This text explores the weird and amazing world of fungi—those things like mushrooms and mold. Merlin Sheldrake says fungi live in networks underground, almost like the internet, and they might even "communicate" in strange ways. He asks, what if being a fungus is totally different from being an animal or a human? It makes us rethink what life and intelligence really are.

3. Xenofeminism: A Politics for Alienation by Laboria Cuboniks
   This text says we can use science and technology to make the world fairer for everyone, especially for people who are often left out. The writers believe we shouldn’t be afraid to change things like gender roles or even biology if it helps people be more free. They want to "hack" the system to make it better.
