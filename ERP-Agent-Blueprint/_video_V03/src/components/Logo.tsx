import React from 'react';
import {Img, staticFile} from 'remotion';

export type LogoName = 'n8n_mark' | 'odoo_mark' | 'claude_mark' | 'openai_mark' | 'gmail' | 'sheets' | 'odoo' | 'n8n' | 'claude' | 'chatgpt' | 'openai' | 'sap' | 'oracle' | 'microsoft' | 'chrome';
/** Official brand marks (public/logos/*.svg, Wikimedia Commons) for nominative/educational use. */
export const Logo: React.FC<{name: LogoName; w?: number; h?: number; style?: React.CSSProperties}> = ({name, w = 48, h, style}) => (
  <Img src={staticFile(`logos/${name}.svg`)} style={{width: w, height: h ?? w, objectFit: 'contain', display: 'block', ...style}} />
);
