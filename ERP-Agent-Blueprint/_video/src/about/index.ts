// Separate entry for the About page video, so the course (V01) project is untouched.
// Studio: npx remotion studio src/about/index.ts   Render: npx remotion render src/about/index.ts About out/about_raw.mp4
import {registerRoot} from 'remotion';
import {AboutRoot} from './Root';
registerRoot(AboutRoot);
