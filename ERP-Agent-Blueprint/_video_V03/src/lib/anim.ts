import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../theme';

export const sec = (s: number) => Math.round(s * FPS);

/** 0→1 spring that starts at `start` (frames). */
export const pop = (frame: number, start: number, damping = 14, durationInFrames?: number) =>
  spring({frame: frame - start, fps: FPS, config: {damping, mass: 0.7, stiffness: 140}, durationInFrames});

/** Linear-eased 0→1 progress between two frames. */
export const prog = (frame: number, a: number, b: number, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});

/** Visible window helper: fades in at a, out at b (frames). */
export const win = (frame: number, a: number, b: number, fade = 8) =>
  Math.min(prog(frame, a, a + fade), 1 - prog(frame, b - fade, b));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
