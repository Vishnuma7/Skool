import React from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {C, INTER} from '../theme';
import {prog} from '../lib/anim';

/** Stocky: flat robot (rounded navy body, blue screen face, white eyes, antenna). */
export const StockyBot: React.FC<{size?: number; f?: number; wave?: boolean}> = ({size = 220, f = 0, wave}) => {
  const blink = f % 110 > 104 ? 0.15 : 1;
  const bob = Math.sin(f / 14) * 4;
  const arm = wave ? Math.sin(f / 5) * 18 : 0;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220" style={{overflow: 'visible', transform: `translateY(${bob}px)`}}>
      <line x1="100" y1="18" x2="100" y2="46" stroke={C.navy} strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="14" r="10" fill={C.hi} />
      <rect x="28" y="44" width="144" height="112" rx="34" fill={C.navy} />
      <rect x="44" y="60" width="112" height="78" rx="22" fill={C.blue} />
      <ellipse cx="78" cy="96" rx="11" ry={11 * blink} fill={C.white} />
      <ellipse cx="122" cy="96" rx="11" ry={11 * blink} fill={C.white} />
      <path d="M84 118 Q100 128 116 118" stroke={C.white} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="56" y="160" width="88" height="44" rx="16" fill={C.navy} />
      <rect x="78" y="172" width="44" height="10" rx="5" fill={C.green} />
      <g transform={`rotate(${-arm} 30 120)`}>
        <rect x="6" y="104" width="24" height="44" rx="12" fill={C.navy} />
      </g>
      <rect x="170" y="104" width="24" height="44" rx="12" fill={C.navy} />
    </svg>
  );
};

type AvatarProps = {size?: number; skin?: string; hair?: string; shirt?: string; hairStyle?: 'long' | 'short' | 'bald'; badge?: string};
/** Generic flat person avatar inside a circle. */
export const Avatar: React.FC<AvatarProps> = ({size = 160, skin = '#C68863', hair = '#3B2A20', shirt = C.blue, hairStyle = 'long', badge}) => (
  <svg width={size} height={size} viewBox="0 0 160 160">
    <defs>
      <clipPath id={`clip-${shirt}-${hair}`}>
        <circle cx="80" cy="80" r="78" />
      </clipPath>
    </defs>
    <circle cx="80" cy="80" r="78" fill="#E0E7FF" />
    <g clipPath={`url(#clip-${shirt}-${hair})`}>
      {hairStyle === 'long' && <path d="M38 78 Q36 30 80 28 Q124 30 122 78 L126 128 L34 128 Z" fill={hair} />}
      <path d="M22 160 Q24 116 80 112 Q136 116 138 160 Z" fill={shirt} />
      <rect x="68" y="92" width="24" height="24" rx="8" fill={skin} />
      <ellipse cx="80" cy="70" rx="30" ry="34" fill={skin} />
      {hairStyle === 'long' && <path d="M48 64 Q52 34 80 34 Q110 34 112 62 Q96 50 70 54 Q58 56 48 64 Z" fill={hair} />}
      {hairStyle === 'short' && <path d="M50 62 Q50 34 80 34 Q110 34 110 62 Q104 46 80 46 Q58 46 50 62 Z" fill={hair} />}
      {hairStyle === 'bald' && <path d="M52 56 Q56 38 80 36 Q104 38 108 56 Q96 48 80 48 Q64 48 52 56 Z" fill={hair} opacity={0.6} />}
      <circle cx="69" cy="72" r="3.4" fill="#1F2937" />
      <circle cx="91" cy="72" r="3.4" fill="#1F2937" />
      <path d="M71 86 Q80 92 89 86" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
      {badge && <rect x="92" y="128" width="26" height="18" rx="4" fill={C.white} />}
    </g>
  </svg>
);

/** Realistic portrait in a circle (Unsplash-licensed photos in public/faces, see SOURCES.txt). */
export const Face: React.FC<{name: 'sarah' | 'tom' | 'harrison' | 'intern'; size?: number; ring?: string}> = ({name, size = 160, ring = C.white}) => (
  <div style={{width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, boxShadow: `0 0 0 ${Math.max(3, size / 28)}px ${ring}, 0 10px 24px rgba(2,6,23,0.35)`}}>
    <Img src={staticFile(`faces/${name}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </div>
);
export const Sarah: React.FC<{size?: number}> = ({size}) => <Face name="sarah" size={size} />;
export const Tom: React.FC<{size?: number}> = ({size}) => <Face name="tom" size={size} />;
export const Harrison: React.FC<{size?: number}> = ({size}) => <Face name="harrison" size={size} />;
export const Intern: React.FC<{size?: number}> = ({size}) => <Face name="intern" size={size} />;

/** Analogue clock that animates between two times (hours as decimals, e.g. 8.5 → 11). */
export const Clock: React.FC<{size?: number; f: number; fromH: number; toH: number; at: number; dur?: number}> = ({size = 200, f, fromH, toH, at, dur = 40}) => {
  const h = interpolate(prog(f, at, at + dur), [0, 1], [fromH, toH]);
  const minA = (h % 1) * 360;
  const hrA = ((h % 12) / 12) * 360;
  const label = `${Math.floor(h) > 12 ? Math.floor(h) - 12 : Math.floor(h)}:${String(Math.round((h % 1) * 60) % 60).padStart(2, '0')} AM`;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill={C.white} stroke={C.navy} strokeWidth="5" />
        {Array.from({length: 12}).map((_, i) => (
          <line key={i} x1="50" y1="9" x2="50" y2={i % 3 === 0 ? 16 : 13} stroke={C.slate} strokeWidth={i % 3 === 0 ? 3 : 1.6} transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <line x1="50" y1="50" x2="50" y2="28" stroke={C.navy} strokeWidth="5" strokeLinecap="round" transform={`rotate(${hrA} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="17" stroke={C.blue} strokeWidth="3" strokeLinecap="round" transform={`rotate(${minA} 50 50)`} />
        <circle cx="50" cy="50" r="4" fill={C.navy} />
      </svg>
      <div style={{fontFamily: INTER, fontSize: size * 0.18, fontWeight: 800, color: C.navy}}>{label}</div>
    </div>
  );
};

/** 12 month blocks, `fill` months filled (can be fractional). */
export const MonthBar: React.FC<{fill: number; color?: string}> = ({fill, color = C.red}) => {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <div style={{display: 'flex', gap: 10}}>
      {months.map((m, i) => {
        const v = Math.max(0, Math.min(1, fill - i));
        return (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
            <div style={{width: 62, height: 110, borderRadius: 14, background: C.slateSoft, overflow: 'hidden', display: 'flex', alignItems: 'flex-end'}}>
              <div style={{width: '100%', height: `${v * 100}%`, background: color}} />
            </div>
            <div style={{fontFamily: INTER, fontSize: 22, fontWeight: 700, color: C.slate}}>{m}</div>
          </div>
        );
      })}
    </div>
  );
};
