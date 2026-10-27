// Web Audio API Supercar Engine Sound Synthesizer
// Zero external assets required — pure synthesized audio using Web Audio API

class SupercarSoundEngine {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.filter = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.isMuted = true;
    this.baseFreq = 48; // Deep idle rumble (Hz)
    this.targetFreq = 48;
    this.currentVelocity = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

      // Lowpass Filter (muffles idle, opens up on acceleration)
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3, this.ctx.currentTime);

      // Oscillator 1 - Main Sawtooth for bite
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(this.baseFreq, this.ctx.currentTime);

      // Oscillator 2 - Triangle for body and harmonic warmth
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(this.baseFreq * 1.5, this.ctx.currentTime);

      // Sub Oscillator - Sine for low-end punch
      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(this.baseFreq * 0.5, this.ctx.currentTime);

      // Routing
      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);
      this.subOsc.connect(this.filter);

      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.subOsc.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Web Audio not supported or blocked:", e);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx && !muted) {
      this.init();
    }
    if (this.ctx && this.gainNode) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const targetGain = muted ? 0 : 0.08;
      this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
  }

  // Update pitch and revs based on scroll velocity (0 to 1)
  updateVelocity(velocity) {
    if (!this.ctx || this.isMuted) return;

    this.currentVelocity = Math.min(Math.max(velocity, 0), 1);
    // Interpolate frequency from 48Hz (idle) to 180Hz (top speed)
    const targetHz = this.baseFreq + this.currentVelocity * 135;
    const filterHz = 260 + this.currentVelocity * 1200;
    const volume = 0.04 + this.currentVelocity * 0.08;

    const now = this.ctx.currentTime;
    this.osc1.frequency.setTargetAtTime(targetHz, now, 0.05);
    this.osc2.frequency.setTargetAtTime(targetHz * 1.5, now, 0.05);
    this.subOsc.frequency.setTargetAtTime(targetHz * 0.5, now, 0.05);
    this.filter.frequency.setTargetAtTime(filterHz, now, 0.05);
    this.gainNode.gain.setTargetAtTime(volume, now, 0.08);
  }
}

export const soundEngine = new SupercarSoundEngine();
