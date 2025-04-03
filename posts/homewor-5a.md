---
title: Homework 5a
published_at: 2025-04-03
snippet: This is my homework 5a.
disable_html_sanitization: true
allow_math: true
---

<script src="./script/p5.js"></script>

<canvas id="p5_example"></canvas>

<script>
    const cnv = document.getElementById ("p5_example")

    function setup () {
        createCanvas (300, 300, P2D, cnv)
    }

    function draw () {
        background (`turquoise`)
        console.log (frameCount)
    }
</script>
