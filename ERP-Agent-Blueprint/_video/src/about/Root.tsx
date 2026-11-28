import React from 'react';
import {Composition, Still} from 'remotion';
import {About} from './About';
import {Thumb} from './Thumb';
import {FPS, TOTAL_FRAMES} from './timeline';

export const AboutRoot: React.FC = () => (
  <>
    <Composition id="About" component={About} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{}} />
    <Still id="AboutThumb" component={Thumb} width={1920} height={1080} />
  </>
);
