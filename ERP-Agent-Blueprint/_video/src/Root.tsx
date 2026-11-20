import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {CaptionSamples, SAMPLE_FRAMES} from './CaptionSamples';
import {FPS, H, W} from './theme';
import {layout, TOTAL_FRAMES} from './timeline';

export const Root: React.FC = () => (
  <>
    <Composition id="CaptionSamples" component={CaptionSamples} durationInFrames={SAMPLE_FRAMES} fps={FPS} width={W} height={H} defaultProps={{}} />
    <Composition id="V01" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} defaultProps={{}} />
    {layout().map(({seg, dur}) => (
      <Composition key={seg.id} id={`seg-${seg.id}`} component={Main} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
    ))}
  </>
);
