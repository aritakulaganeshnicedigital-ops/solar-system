/**
 * Audio System using the Web Audio API
 * Generates an ambient space drone and futuristic sci-fi UI feedback effects.
 */

class CosmosAudioSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isInitialized: boolean = false;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient track gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.isInitialized = true;
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return this.isMuted;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    const targetGain = this.isMuted ? 0 : 0.45;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.5);

    if (!this.isMuted && this.oscillators.length === 0) {
      this.startAmbientDrone();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.ambientGain) return;

    // Deep sub-bass cosmic drone: 55Hz (A1) and 82.4Hz (E2 fifth)
    const baseFreqs = [55, 55.4, 82.4, 110];

    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter to keep it deep and warm
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220 + idx * 40, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      // Gentle LFO filter modulation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(50, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.12 / baseFreqs.length, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.ambientGain);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  public playUiClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  public playUiHover() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  public playPlanetSelect() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.2);

      osc2.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.36);
      osc2.stop(this.ctx.currentTime + 0.36);
    } catch {}
  }

  public playWarp() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch {}
  }

  public playBlackHoleSelect() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      // Deep downward gravitational pitch bend
      osc1.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.65);

      osc2.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(24, this.ctx.currentTime + 0.85);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(55, this.ctx.currentTime + 0.85);
      filter.Q.setValueAtTime(4.5, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.92);
      osc2.stop(this.ctx.currentTime + 0.92);
    } catch {}
  }
}

export const audioSystem = new CosmosAudioSystem();
