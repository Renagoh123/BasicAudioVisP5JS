# Basic Music Visualizer

## Description
This project is a simple music visualization program created using p5.js and JavaScript. It features seven distinct visualizations that transform sound into visual elements using p5.js's Fast Fourier Transform (FFT) object.

## Visualizations
1. **Spectrum:** Displays horizontal bars that change color from green to red based on amplitude.
2. **Wavepattern:** Visualizes the sound waveform with an array of values representing the amplitude over time.
3. **Needles:** Shows volume values for four frequency bands (bass, mid-low, mid-high, and treble).
4. **Blank:** A placeholder visualization with no display.
5. **Ridge Plots:** Visualizes sound frequencies with ridge-like patterns.
6. **Block Mid High Low:** Displays blocks representing different frequency ranges.
7. **Spinning Wheel:** A customizable audio analyzer that consists of five parts corresponding to five music frequencies: bass, low mid, mid, high, and treble. Changes in frequency affect the colors of each part of the wheel, and the wheel rotates with each frame. A colorful particle effect is triggered based on a certain level of music amplitude.

### Spinning Wheel Customization
The GUI panel for the Spinning Wheel visualization includes options for:
- Rotate direction: left, right
- Size of the wheel
- Center shape of the wheel: square, ellipse, triangle
- Color of the center shape (RGB)

## Features
- **Three Visualizations:** The program includes seven distinct visualizations for audio representation.
- **FFT Analysis:** Utilizes `FFT.analyze()`, `FFT.waveform()`, and `FFT.energy()` to process audio data and create visual effects.

## How to Use
1. **Playback and Fullscreen:** Click the playback button to start the music and display a visualization.
2. **Visualization Menu:** Press the space bar to display the visualizations menu. The menu lists all available visualizations.

## Technologies Used
- p5.js
- JavaScript

## Documentation
For more information on the FFT object and its methods, refer to the [p5.sound documentation](https://p5js.org/reference/#/p5.FFT).
