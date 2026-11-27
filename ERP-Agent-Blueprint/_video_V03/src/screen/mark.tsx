import React from 'react';
import {C} from '../theme';

/** Inline highlight around a phrase. `on` 0..1 */
export const Mark: React.FC<{on?: number; children: React.ReactNode; color?: string; block?: boolean}> = ({on = 0, children, color = C.hi, block}) => (
  <span style={{
    display: block ? 'block' : 'inline', borderRadius: 8, padding: block ? '6px 10px' : '1px 3px', margin: block ? '-6px -10px' : 0,
    boxShadow: on > 0.01 ? `0 0 0 ${4 * on}px ${color}, 0 0 ${22 * on}px ${color}88` : 'none',
    background: on > 0.01 ? `${color}${Math.round(on * 0x22).toString(16).padStart(2, '0')}` : 'transparent',
  }}>{children}</span>
);

