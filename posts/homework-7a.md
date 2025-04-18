---
title: Homework 7a
published_at: 2025-04-17
snippet: Answer some questions of the sound design to my assignment 2. Then implement an interactive sound design experiment in my blog and evaluate the success of the experiment with references to my discussion in task 1.
disable_html_sanitization: true
allow_math: true
---

# Answer some questions of the sound design to my assignment 2.

How will you make the sound design for your AT2 function in a chaotic aesthetic register?
What does it mean to be chaotic in the sonic domain?

I'm going to create some messy sound effects in AT2. For this messy sound, the overall structure should be in an irregular state. The biggest difference between noise and music or sound is that it makes people feel uncomfortable, and the discomfort depends on the level of noise. If you need to mess with sound, you need noise, but since it's a user-specific page, the noise shouldn't be too unpleasant. voice is a separate category from sound because it's the sound of living things, and it's included in the frequency range of sound.
The confusion in the sonic realm actually means that the things to be expressed are also confusing. In visual language, hearing serves the purpose of seeing. If you express something normal and orderly with chaotic sound effects, it will be out of order, and people will not know what to express. Like Jungle Life in the example, it is actually a kind of sound rather than noise. No matter how the frequency is adjusted, it won't make you feel uncomfortable.

# Implement an interactive sound design experiment in my blog and evaluate the success of the experiment with references to my discussion in task 1.

<canvas id='rapid_notes'></canvas>

<script>
    const cnv = document.getElementById('rapid_notes');
    cnv.width = cnv.parentNode.scrollWidth;
    cnv.height = cnv.width * 9 / 16;
    cnv.style.backgroundColor = 'orange';

    // Draw initial prompt
    const ctx = cnv.getContext('2d');
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText('click it and play sound', cnv.width/2, cnv.height/2);

    const notes = [62, 66, 69, 73, 74, 73, 69, 66];
    let i = 0;
    let running = false;
    let audioContext;
    let startTime;

    function playNote(midiNote, duration) {
        if (!audioContext) return;
        
        const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        osc.frequency.value = freq;
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        osc.start();
        osc.stop(audioContext.currentTime + duration);
    }

    function nextNote() {
        const elapsed = Date.now() - startTime;
        const phase = ((elapsed % 24000) / 24000) * Math.PI * 2;
        const chaos = Math.sin(phase);

        const period = 20 + (chaos + 1) * 200;
        const len = (chaos + 1) * 2.5;
        const detunedNote = notes[i] + Math.round(chaos * 4);
        
        playNote(detunedNote, len);
        i = (i + 1) % notes.length;
        return period;
    }

    function scheduler() {
        if (!running) return;
        setTimeout(scheduler, nextNote());
    }

    cnv.onclick = () => {
        // Clear the prompt text
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (!running) {
            running = true;
            startTime = Date.now();
            scheduler();
        }
    };
</script>

```<canvas id='rapid_notes'></canvas>

<script>
    const cnv = document.getElementById('rapid_notes');
    cnv.width = cnv.parentNode.scrollWidth;
    cnv.height = cnv.width * 9 / 16;
    cnv.style.backgroundColor = 'orange';

    // Draw initial prompt
    const ctx = cnv.getContext('2d');
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText('click it and play sound', cnv.width/2, cnv.height/2);

    const notes = [62, 66, 69, 73, 74, 73, 69, 66];
    let i = 0;
    let running = false;
    let audioContext;
    let startTime;

    function playNote(midiNote, duration) {
        if (!audioContext) return;

        const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioContext.destination);

        osc.frequency.value = freq;
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

        osc.start();
        osc.stop(audioContext.currentTime + duration);
    }

    function nextNote() {
        const elapsed = Date.now() - startTime;
        const phase = ((elapsed % 24000) / 24000) * Math.PI * 2;
        const chaos = Math.sin(phase);

        const period = 20 + (chaos + 1) * 200;
        const len = (chaos + 1) * 2.5;
        const detunedNote = notes[i] + Math.round(chaos * 4);

        playNote(detunedNote, len);
        i = (i + 1) % notes.length;
        return period;
    }

    function scheduler() {
        if (!running) return;
        setTimeout(scheduler, nextNote());
    }

    cnv.onclick = () => {
        // Clear the prompt text
        ctx.clearRect(0, 0, cnv.width, cnv.height);

        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (!running) {
            running = true;
            startTime = Date.now();
            scheduler();
        }
    };
</script>
```

I think my Task 1 was quite successful. I think my task 1 was quite successful, because he actually changed from sound to noise, and then from noise back to normal sound. And then the concept of noise, as I explained myself, is that it makes people feel uncomfortable, and I actually achieved that. About user gesture I also set up, can let the user have the autonomy to decide whether to put.
