import {loadFont} from '@remotion/google-fonts/Inter';

export const {fontFamily: INTER} = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const C = {
  navy: '#1F2A44',
  navyDeep: '#0F172A',
  ink: '#0B1220',
  blue: '#2563EB',
  blueSoft: '#DBEAFE',
  green: '#16A34A',
  greenSoft: '#DCFCE7',
  red: '#DC2626',
  redSoft: '#FEE2E2',
  amber: '#F59E0B',
  amberSoft: '#FEF3C7',
  hi: '#FFD84D',
  slate: '#64748B',
  slateSoft: '#E2E8F0',
  paper: '#F8FAFC',
  white: '#FFFFFF',
  odoo: '#714B67',
};

export const shadow = '0 24px 60px rgba(2,6,23,0.35), 0 4px 14px rgba(2,6,23,0.18)';
export const softShadow = '0 10px 30px rgba(2,6,23,0.18)';
