---
title: Homework 2a
published_at: 2025-03-11
snippet: My thinking about making cute visuals, cute sounds and cute interactions. And also my a broad description of my assignment 1 plan.
disable_html_sanitization: true
allow_math: true
---

# This is my thinking how I might go about making cute visuals, cute sounds and cute interactions.

As for cute visuals, I would choose soft and pastel colour like light pink and light blue. And I think it needs to be some tiny decorative details like heart shape. And it could use orbit control, which means using mouse or touch input to adjust camera orientation in a 3D sketch. And the shapes would be the heart shapes.

As for cute sounds, I would probably use high-pitched “boop” or “pop” sound when mouse clicking. And maybe play some slow sweet song for the background music.

As for the interactions, I would let the heart shape change the colour when the mouse is hanging on the shape.

---

# This is a broad description of the assignment 1 plan and sketches to explain how I make it.

My initial thoughts are pretty much the same as above, but the practical aspects will only be known after the p5.js specific operation, so here are my experiments.
![The first attempt of making a heart shape with orbit control](/w02s1/attempt_1.png)

<iframe id="Heart_shape" src="https://editor.p5js.org/jinhuiliang01/sketches/5yeKD4_v9"></iframe>

<script type="module">

    const iframe  = document.getElementById (`Heart_shape`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16 + 42

</script>

Problem fix: At the beginning, there are too many blocks which cause lagging problem, I just reduce the number of blocks to make the interaction a bit more silky.

I found it very difficult to make a three-dimensional heart. So I searched the Internet tutorials to see, to follow, to make a thing like this. And then changing the colours and sound effects have to be changed on the basis of this code.
