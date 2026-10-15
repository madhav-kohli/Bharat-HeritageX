/**
 * Ambient Audio Engine for Bharat Heritage X
 * Uses Web Audio API to produce subtle realistic ambient wind,
 * soft sacred drone, and acoustic resonant temple bells without external audio files.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private windGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private bellInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: ((muted: boolean) => void)[] = [];

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (muted: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isMuted));
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      // Strike a gentle greeting temple bell
      this.playTempleBell(640, 0.25);
    }
    this.notify();
    return this.isMuted;
  }

  public startAmbient() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // 1. Subtle Procedural Wind Generator (Filtered Pink Noise)
    if (!this.windGain) {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.05;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.windGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 2.0);

      whiteNoise.connect(filter);
      filter.connect(this.windGain);
      this.windGain.connect(this.ctx.destination);
      whiteNoise.start();
    }

    // 2. Soft Sacred Meditative Drone (Harmonics of Tanpura root C# 138Hz)
    if (!this.droneGain) {
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3.0);

      const droneFreqs = [138.6, 207.6, 277.2];
      droneFreqs.forEach(freq => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.connect(this.droneGain!);
        osc.start();
      });

      this.droneGain.connect(this.ctx.destination);
    }

    // 3. Periodic subtle temple bell chime every 18 seconds
    if (!this.bellInterval) {
      this.bellInterval = setInterval(() => {
        if (!this.isMuted) {
          this.playTempleBell(720 + Math.random() * 60, 0.15);
        }
      }, 18000);
    }
  }

  public stopAmbient() {
    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.windGain) {
        this.windGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.windGain?.disconnect();
          this.windGain = null;
        }, 900);
      }
      if (this.droneGain) {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        setTimeout(() => {
          this.droneGain?.disconnect();
          this.droneGain = null;
        }, 900);
      }
    }
    if (this.bellInterval) {
      clearInterval(this.bellInterval);
      this.bellInterval = null;
    }
  }

  /**
   * Resonant Indian Temple Bell (Ghanta) simulation using physical metallic inharmonics
   */
  public playTempleBell(fundamental = 740, volume = 0.28) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const partials = [
      { ratio: 1.0, decay: 3.5, amp: 1.0 },
      { ratio: 1.84, decay: 2.8, amp: 0.65 },
      { ratio: 2.58, decay: 2.2, amp: 0.45 },
      { ratio: 3.42, decay: 1.6, amp: 0.25 },
      { ratio: 4.12, decay: 1.1, amp: 0.15 },
    ];

    const masterBell = this.ctx.createGain();
    masterBell.gain.setValueAtTime(volume, now);
    masterBell.connect(this.ctx.destination);

    partials.forEach(p => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * p.ratio, now);

      gain.gain.setValueAtTime(p.amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gain);
      gain.connect(masterBell);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }

  /**
   * Ceremonial Aarti Multi-Bell Chime Sequence
   */
  public playAartiChimeSequence() {
    this.init();
    const notes = [640, 720, 810, 720, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTempleBell(freq, 0.32 - idx * 0.03);
      }, idx * 380);
    });
  }
}

export const ambientAudio = new AmbientAudioEngine();
