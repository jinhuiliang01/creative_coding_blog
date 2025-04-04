---
title: Homework 5a
published_at: 2025-04-03
snippet: Talk about why I think the artist I picked is post-digital and what techniques they are using if they work in javascript. Also use RiTa.js to generate a post-digital poem responding to the work in my blog.
disable_html_sanitization: true
allow_math: true
---

# Why I think the artist I picked is post-digital.

https://www.instagram.com/p/C7WnFK2yfd2/?img_index=1

I picked Minnie's work of 'The Meta Rose Project' and I think it is post-digital. The blurring of the digital and the analogue is one of the themes and characteristics of post-digital, and Minnie's work combines the digital process with traditional printmaking, appearing to be a piece of traditional printmaking, but in fact it is digitally generated or produced. post- digital is defined as an artistic approach that transcends the novelty of digital technology, treating it as an everyday medium rather than something revolutionary. Minnie uses analogue and hybrid methods to create this work.

# What technologies they would use if they were using Javascript. What APIs & libraries could they use?

Graphics and shader processing may use PixiJS to support shader effects. And for interaction and animation she may use Anime.js to help her do the complex sequences through this lightweight animation library. And probably she would use p5.js which is a creative coding library to simplify graphics programming.

# Use RiTa.js to generate a post-digital poem responding to the work in my blog.

<script src="./script/sketch.js"></script>

<canvas id="post-digital poem"></canvas>

<script>
    const cnv = document.getElementById ("post-digital poem")
    let font, grammar, json;
let lines = ["click to", "generate", "a post-digital poem"];

function setup() {
  createCanvas(650, 200);
  textAlign(CENTER);
  loadFont("Resagokr.otf", (f) => textFont(f, 30));

  grammar = RiTa.grammar(poem); // from grammar.js
}

function draw() {
  background(230, 240, 255);
  text(lines[0], width / 2, 75);
  text(lines[1], width / 2, 110);
  text(lines[2], width / 2, 145);
}

function mouseReleased() {
  let result = grammar.expand();

  // split on the % char output from the grammar
  lines = result.split("%");
}
</script>
