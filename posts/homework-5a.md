---
title: Homework 5a
published_at: 2025-04-03
snippet: Talk about why I think the artist I picked is post-digital and what techniques they are using if they work in javascript. Also use RiTa.js to generate a post-digital poem responding to the work in my blog.
disable_html_sanitization: true
allow_math: true
---

<script src="./script/p5.js"></script>

<canvas id="p5_example"></canvas>

<script>
    const cnv = document.getElementById ("p5_example")
    const w = cnv.parentNode.scrollWidth
    const h = w * 9 / 16

    function setup () {
        createCanvas (w, h, P2D, cnv)
    }

    function draw () {
        background (`turquoise`)
        console.log (frameCount)
    }
</script>

# Why I think the artist I picked is post-digital.

https://www.instagram.com/p/C7WnFK2yfd2/?img_index=1

I picked Minnie's work of 'The Meta Rose Project' and I think it is post-digital. The blurring of the digital and the analogue is one of the themes and characteristics of post-digital, and Minnie's work combines the digital process with traditional printmaking, appearing to be a piece of traditional printmaking, but in fact it is digitally generated or produced. post- digital is defined as an artistic approach that transcends the novelty of digital technology, treating it as an everyday medium rather than something revolutionary. Minnie uses analogue and hybrid methods to create this work.

# What technologies they would use if they were using Javascript. What APIs & libraries could they use?

Graphics and shader processing may use PixiJS to support shader effects. And for interaction and animation she may use Anime.js to help her do the complex sequences through this lightweight animation library. And probably she would use p5.js which is a creative coding library to simplify graphics programming.

# Use RiTa.js to generate a post-digital poem responding to the work in my blog.
