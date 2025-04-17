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

Using Signals in C2.js

<!DOCTYPE html>
<html>
<head>
  <title>Homework 6a</title>
  <script src="/250414/p5.min.js"></script>
  <script src="/250414/c2/c2.min.js"></script>
  <style>
    body {
      margin: 0;
      background: white;
    }
    #c2-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: auto;
    }
    canvas {
      display: block;
      background: white; 
      box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    }
  </style>
</head>
<body>
  <div id="c2-container"></div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      function checkLibs() {
        if (typeof p5 === 'undefined' || typeof c2 === 'undefined') {
          setTimeout(checkLibs, 100);
          return;
        }
        
        const sketch = function(p) {
          let frame = 0;
          
          p.setup = function() {
            const canvas = p.createCanvas(600, 400);
            // Keep white background persistent
            p.background("white");
          };
          
          p.draw = function() {
            frame++;
            const signal = p.sin(frame / 200 * p.PI * 2);
            const radius = p.map(signal, -1, 1, 50, 150);
            
            // Clear only the circle area (for smooth animation)
            p.fill(255); // White
            p.noStroke();
            p.rect(0, 0, p.width, p.height);
            
            // Draw the animated circle
            p.fill("cyan");
            p.circle(p.width/2, p.height/2, radius);
          };
        };
        
        new p5(sketch, 'c2-container');
      }
      
      checkLibs();
    });
  </script>
</body>
</html>

```<!DOCTYPE html>
<html>
<head>
  <title>C2.js Animation</title>
  <script src="/250414/p5.min.js"></script>
  <script src="/250414/c2/c2.min.js"></script>
  <style>
    body {
      margin: 0;
      background: white;
    }
    #c2-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: auto;
    }
    canvas {
      display: block;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div id="c2-container"></div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      function checkLibs() {
        if (typeof p5 === 'undefined' || typeof c2 === 'undefined') {
          setTimeout(checkLibs, 100);
          return;
        }

        const sketch = function(p) {
          let frame = 0;

          p.setup = function() {
            const canvas = p.createCanvas(600, 400);
            // Keep white background persistent
            p.background("white");
          };

          p.draw = function() {
            frame++;
            const signal = p.sin(frame / 200 * p.PI * 2);
            const radius = p.map(signal, -1, 1, 50, 150);

            // Clear only the circle area (for smooth animation)
            p.fill(255); // White
            p.noStroke();
            p.rect(0, 0, p.width, p.height);

            // Draw the animated circle
            p.fill("cyan");
            p.circle(p.width/2, p.height/2, radius);
          };
        };

        new p5(sketch, 'c2-container');
      }

      checkLibs();
    });
  </script>
</body>
</html>
```

# Give a brief summary of the articles.

1. Information & Thinking by Michel Serres

   Michel Serres challenged conventional thinking by pointing out that information exchange is a universal feature - not unique to humans, but shared by all entities, living and non-living. He saw matter and information as inseparable, reshaping our understanding of thought, knowledge, and existence. He believed that everything that existed, whether bacteria or rocks, emitted, received, stored, and processed information. And that thinking is not unique to humans, but part of the world continuum. Thinking is processing information, just like everything else in nature. Life and Earth have always been connected through such networks. Everything in the universe expresses, perceives, and communicates in its own way, just as humans do.
   Serres called for a new understanding of knowledge. Knowledge is no longer uniquely human, no longer a sunlit truth, but a universal, pluralistic, reflective process embedded in the fabric of existence. And it sees us as matter and mirrors, participating in the grand, interconnected language of the universe.

2. What Is It Like to Be a Fungus? by Merlin Sheldrake

   Merlin Sheldrake invites readers to enter the hidden yet far-reaching world of fungi at the beginning of the book. Although often overlooked, fungi are everywhere - in our bodies, under our feet, in our food, medicine, environment, and even in our brains. The author believes that understanding fungi can reshape our perception of life, thought and even identity. He believes that fungi are crucial to life. Without fungi, land plants - as well as land life - would not have been able to evolve. Fungi bond the soil together and closely weave into the plant tissues, protecting the plants from diseases. The mycelium is a hidden network. The mycelium is composed of mycelium, which is equivalent to the roots and branches of the fungus, that is, a vast and intelligent network. Some mycelial networks conduct electrical signals, and their behavior is similar to neural activity. Fungi are not entirely suitable for artificial categories; They blur the boundaries between individuals and networks, organisms and ecosystems. Their symbiotic relationship questions our concepts of personality and wisdom. These experiences encouraged him to go beyond rigid scientific thinking and embrace the imaginative and interconnected essence of life.
   Sheldrake not only regards fungi as research subjects but also as teachers, guiding us to rethink the meaning of survival, connection and cognition. His works are both scientific and poetic, based on research and full of imagination.

3. Xenofeminism: A Politics for Alienation by Laboria Cuboniks

   This declarative text written by Laboria Cuboniks advocates for the establishment of a kind of feminism that is deeply integrated with technology, transcends naturalism, deconstructs gender and has universal ambitions. Xenofeminism does not nostalgically stick to the present, but is dedicated to imagining and constructing a truly liberated future world. Xenofeminism embraces a sense of alienation as the driving force for creating a new world. She believes that we have never truly been "natural". Freedom is constructed through technology and abstract processes, rather than being obtained by returning to nature. This book advocates gender abolitionism, that is, it does not deny gender diversity, but rather aims to dismantle the function of gender as an oppressive framework. At the same time, it calls for the redesign of digital culture to create a medium momentum that can trigger genuine discussion, connection and action. It regards feminism as a practice of building a platform, not a single tactic, but a modifiable and iterative open-source movement architecture. Xenofeminism is a platform and a language construction tool that enables us to re-understand, name and rewrite the possibilities of gender and liberation.
