---
title: Homework 4b
published_at: 2025-04-01
snippet: Using techniques to render a self-potrait in my blog post. Answering how does rendering my likeness in this way affect its aesthetic register and also refer to the reading.
disable_html_sanitization: true
allow_math: true
---

# This is my self-potrait using techniques from Glitch.

<canvas id="glitch_self_portrait"></canvas>

<script type="module">

   const cnv = document.getElementById (`glitch_self_portrait`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16
   cnv.style.backgroundColor = `deeppink`

   const ctx = cnv.getContext (`2d`)

   let img_data

   const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   const img = new Image ()
   img.onload = () => {
      cnv.height = cnv.width * (img.height / img.width)
      draw (img)
      img_data = cnv.toDataURL ("image/jpeg")
      add_glitch ()
   }
   img.src = `/w04s2/self-portrait.JPG`

   const rand_int = max => Math.floor (Math.random () * max)

   const glitchify = (data, chunk_max, repeats) => {
      const chunk_size = rand_int (chunk_max / 4) * 4
      const i = rand_int (data.length - 24 - chunk_size) + 24
      const front = data.slice (0, i)
      const back = data.slice (i + chunk_size, data.length)
      const result = front + back
      return repeats == 0 ? result : glitchify (result, chunk_max, repeats - 1)
   }

   const glitch_arr = []

   const add_glitch = () => {
      const i = new Image ()
      i.onload = () => {
         glitch_arr.push (i)
         if (glitch_arr.length < 12) add_glitch ()
         else draw_frame ()
      }
      i.src = glitchify (img_data, 96, 6)
   }

   let is_glitching = false
   let glitch_i = 0

   const draw_frame = () => {
      if (is_glitching) draw (glitch_arr[glitch_i])
      else draw (img)

      const prob = is_glitching ? 0.05 : 0.02
      if (Math.random () < prob) {
         glitch_i = rand_int (glitch_arr.length)
         is_glitching = !is_glitching
      }

      requestAnimationFrame (draw_frame)
   }

</script>

```<!-- Canvas element where the glitch effect will be displayed -->
<canvas id="glitch_self_portrait"></canvas>

<script type="module">
   // Get the canvas element from the HTML document
   const cnv = document.getElementById (`glitch_self_portrait`)

   // Set canvas width to match its parent element's width
   cnv.width = cnv.parentNode.scrollWidth

   // Set canvas height to maintain a 16:9 aspect ratio (width × 9/16)
   cnv.height = cnv.width * 9 / 16

   // Set a temporary pink background color (visible while loading)
   cnv.style.backgroundColor = `deeppink`

   // Get the 2D drawing context of the canvas (needed for drawing operations)
   const ctx = cnv.getContext (`2d`)

   // Variable to store the image data (will be used for glitching)
   let img_data

   // Helper function to draw an image (i) on the canvas at full size
   const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   // Create a new Image object (this will load our portrait)
   const img = new Image ()

   // Set up what happens when the image finishes loading
   img.onload = () => {
      // Adjust canvas height to match the image's aspect ratio
      cnv.height = cnv.width * (img.height / img.width)

      // Draw the image on the canvas
      draw (img)

      // Convert the canvas content to a JPEG data URL (base64 string)
      img_data = cnv.toDataURL ("image/jpeg")

      // Start creating glitched versions of the image
      add_glitch ()
   }

   // Set the image source (path to your self-portrait)
   img.src = `/w04s2/self-portrait.JPG`

   // Helper function to generate random integers (0 to max-1)
   const rand_int = max => Math.floor (Math.random () * max)

   // Function to create glitched versions of the image data
   const glitchify = (data, chunk_max, repeats) => {
      // Calculate a random chunk size (multiples of 4 for data alignment)
      const chunk_size = rand_int (chunk_max / 4) * 4

      // Get a random position in the data (after first 24 bytes)
      const i = rand_int (data.length - 24 - chunk_size) + 24

      // Split the data into front and back sections
      const front = data.slice (0, i)
      const back = data.slice (i + chunk_size, data.length)

      // Combine them, effectively removing the chunk in the middle
      const result = front + back

      // Recursively repeat the glitching process if needed
      return repeats == 0 ? result : glitchify (result, chunk_max, repeats - 1)
   }

   // Array to store all our glitched image versions
   const glitch_arr = []

   // Function to create and store glitched images
   const add_glitch = () => {
      // Create a new Image object for the glitched version
      const i = new Image ()

      // When the glitched image loads
      i.onload = () => {
         // Add it to our array of glitched images
         glitch_arr.push (i)

         // If we haven't made 12 glitches yet, make another one
         if (glitch_arr.length < 12) add_glitch ()

         // Otherwise start the animation
         else draw_frame ()
      }

      // Set the source to a glitched version of our original image
      i.src = glitchify (img_data, 96, 6)
   }

   // Flag to track if we're currently showing a glitched image
   let is_glitching = false

   // Index of which glitched image to show
   let glitch_i = 0

   // Main animation function that runs repeatedly
   const draw_frame = () => {
      // Draw either a glitched image or the original based on the flag
      if (is_glitching) draw (glitch_arr[glitch_i])
      else draw (img)

      // Set probability to switch states (5% if glitching, 2% if not)
      const prob = is_glitching ? 0.05 : 0.02

      // Randomly decide whether to switch between glitch/normal
      if (Math.random () < prob) {
         // Pick a random glitched image from our array
         glitch_i = rand_int (glitch_arr.length)

         // Toggle between glitch and normal modes
         is_glitching = !is_glitching
      }

      // Request the browser to call this function again on next frame
      requestAnimationFrame (draw_frame)
   }
</script>
```

# This is an answering of how does rendering my likeness in this way affect its aesthetic register and also refer to the reading.

I argue that employing glitch techniques to transform my self-portrait constitutes an act of converting technological "failures" into meaningful commentary and striking visual effects. This process deliberately blurs the boundary between error and artistic expression while simultaneously enhancing the image’s dynamism, thereby mitigating its monotony.

By definition, glitch art entails the intentional utilization of digital or analog malfunctions—such as corrupted files, pixelation, or distorted audio—as artistic mediums. From a philosophical and cultural perspective, such artistic imperfections serve as a critique of technology’s presumed "infallibility," while also celebrating the aesthetic value of flaws. This aligns with post-digital aesthetics, wherein defects humanize otherwise sterile digital environments.

Ultimately, the essence of glitch lies in its capacity to encourage the reimagination of creativity within constrained conditions.
