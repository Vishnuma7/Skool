import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/** Branded backdrop: deep navy with slow drifting colour glows and a faint dot grid. */
export const Bg: React.FC<{light?: boolean}> = ({light}) => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 240) * 60;
  const dy = Math.cos(f / 300) * 40;
  if (light) {
    return (
      <AbsoluteFill style={{background: C.paper}}>
        <AbsoluteFill
          style={{
            backgroundImage: 'radial-gradient(rgba(15,23,42,0.07) 1.5px, transparent 1.5px)',
            backgroundSize: '34px 34px',
          }}
        />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${C.navyDeep} 0%, #13203A 55%, ${C.navy} 100%)`}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 600px at ${300 + dx}px ${260 + dy}px, rgba(37,99,235,0.28), transparent 70%),
                       radial-gradient(800px 600px at ${1650 - dx}px ${880 - dy}px, rgba(22,163,74,0.16), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          backgroundPosition: `${(f * 0.15) % 36}px 0px`,
        }}
      />
    </AbsoluteFill>
  );
};
