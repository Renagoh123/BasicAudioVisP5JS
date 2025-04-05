# Basic Music Visualizer

An interactive, audio-reactive **music visualization tool** built with **p5.js**.  
This program features **seven dynamic visualizations** that translate sound into art using **Fast Fourier Transform (FFT)** techniques.

[🎥 Watch the demo video](https://youtu.be/epZVgCs9Jyc)

## Overview

- Built using **JavaScript** and **p5.js**
- Uses **p5.sound's FFT object** for analyzing audio frequencies
- Real-time audio visualization synced to music playback
- GUI customization available for selected visualizations


## Available Visualizations

1. **Spectrum**  
   Horizontal bars that change color (green to red) based on amplitude.
   
2. **Wavepattern**  
   A waveform that visualizes amplitude over time.
   
3. **Needles**  
   Needle indicators for four frequency bands: bass, mid-low, mid-high, and treble.
   
4. **Blank**  
   A placeholder with no visual output.
   
5. **Ridge Plots**  
   Layered frequency visualizations resembling ridge patterns.
   
6. **Block Mid High Low**  
   Blocks representing distinct frequency ranges.
   
7. **Spinning Wheel**  
   A multi-part wheel visualization where each segment reacts to specific frequencies (bass, low-mid, mid, high, treble). Color and rotation animate based on audio input. Includes a reactive particle burst effect.

## Controls
- ▶️ **Play/Stop**: Click the playback button
- 🔲 **Fullscreen**: Click the fullscreen button
- ⌨️ **Show Menu**: Press the `Spacebar` to switch visualizations

## Technology Stack
- **p5.js** – Creative coding library
- **p5.sound** – FFT audio analysis and waveform data. For more information on the FFT object and its methods, refer to the [FFT Documentation](https://p5js.org/reference/#/p5.FFT)
- **JavaScript** – Core scripting


