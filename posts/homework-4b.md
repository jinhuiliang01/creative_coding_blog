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
   img.src = `/wo4s2/self-portrait.JPG`

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

# This is an answering of how does rendering my likeness in this way affect its aesthetic register and also refer to the reading.

I argue that employing glitch techniques to transform my self-portrait constitutes an act of converting technological "failures" into meaningful commentary and striking visual effects. This process deliberately blurs the boundary between error and artistic expression while simultaneously enhancing the image’s dynamism, thereby mitigating its monotony.

By definition, glitch art entails the intentional utilization of digital or analog malfunctions—such as corrupted files, pixelation, or distorted audio—as artistic mediums. From a philosophical and cultural perspective, such artistic imperfections serve as a critique of technology’s presumed "infallibility," while also celebrating the aesthetic value of flaws. This aligns with post-digital aesthetics, wherein defects humanize otherwise sterile digital environments.

Ultimately, the essence of glitch lies in its capacity to encourage the reimagination of creativity within constrained conditions.
