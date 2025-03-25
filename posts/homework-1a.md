---
title: Homework 1a
published_at: 2025-03-04
snippet: My attempts to use for loop to create squares and my reflections after watching Rafaël Rozendaal's artworks.
disable_html_sanitization: true
allow_math: true
---

# This is the document about my attempts and investigations of for loop

I pressed the play button at first to get an idea of what to expect. Then I looked at the code and tried to understand what each line of code meant and what part of the outcomes it represented. But there is still something I don't understand. I still tried to do it and the result is as follows.
![a screen shot of the first attempt](/w01s1/attempt.png)

After comparing the source code with the code I wrote I found that I was missing a line which prevented it from running, so I added it and it ran correctly.
![a screen shot of the second attempt](/w01s1/attempt_2.png)

But it's still different from the reference one, the original work is infinite loop, while mine stops once it reaches the corresponding size and doesn't loop.
![a screen shot of the third attempt](/w01s1/attempt_3.png)

To make for loop (multiple) as a grid, I set cols and rows instead of total squares.
![a screen shot of the forth attempt](/w01s1/attempt_4.png)

---

# I chose the work 'half half half' from Rafaël Rozendaal

Her work ‘half half half’ is in a way similar to the theory we touched on in class today, which is to generate movement by means of framecount, but the difference is that her code stops every time we go from left to right to the middle and then refreshes to go down from the top, and every time we click, the colours change. Every time we click, the colours change.

The list of things I need to learn is as follows:

1. Change colours immediately with every click.
2. It stops when it reaches the middle of the window and framecounts in a different direction.

The list of resources which can help me learn the concepts:

1. Change the colours when click the mouse: https://www.youtube.com/watch?v=kyN0pe42uhM
2. Stops when the squares reach the middle of the window and change its direction: use modulus to make squares move and stop. https://www.w3schools.com/js/js_arithmetic.asp
