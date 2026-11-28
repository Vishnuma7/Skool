import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {CaptionSamples, SAMPLE_FRAMES} from './CaptionSamples';
import {FPS, H, W} from './theme';
import {layout, TOTAL_FRAMES} from './timeline';
import {Main02} from './v02/Main';
import {Main04, Main04Full} from './v04/Main';
import {layout as layout04, fullLayout as fullLayout04, FULL_TOTAL as TOTAL04} from './v04/timeline';
import {Main06} from './v06/Main';
import {fullLayout as fullLayout06, FULL_TOTAL as TOTAL06} from './v06/timeline';
import {layout as layout02, TOTAL_FRAMES as TOTAL02} from './v02/timeline';

export const Root: React.FC = () => (
  <>
    <Composition id="CaptionSamples" component={CaptionSamples} durationInFrames={SAMPLE_FRAMES} fps={FPS} width={W} height={H} defaultProps={{}} />
    <Composition id="V01" component={Main} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} defaultProps={{}} />
    {layout().map(({seg, dur}) => (
      <Composition key={seg.id} id={`seg-${seg.id}`} component={Main} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
    ))}
    <Composition id="V02" component={Main02} durationInFrames={TOTAL02} fps={FPS} width={W} height={H} defaultProps={{}} />
    {layout02().map(({seg, dur}) => (
      <Composition key={`v02-${seg.id}`} id={`v02-${seg.id}`} component={Main02} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
    ))}
      <Composition id="V04" component={Main04Full} durationInFrames={TOTAL04} fps={FPS} width={W} height={H} defaultProps={{}} />
      {fullLayout04().filter((x) => x.seg.kind !== 'screen').map(({seg, dur}) => (
        <Composition key={`v04full-${seg.id}`} id={`v04f-${seg.id}`} component={Main04Full} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
      ))}
      {layout04().map(({seg, dur}) => (
        <Composition key={`v04-${seg.id}`} id={`v04-${seg.id}`} component={Main04} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
      ))}
      <Composition id="V06" component={Main06} durationInFrames={TOTAL06} fps={FPS} width={W} height={H} defaultProps={{}} />
      {fullLayout06().map(({seg, dur}) => (
        <Composition key={`v06-${seg.id}`} id={`v06-${seg.id}`} component={Main06} durationInFrames={dur} fps={FPS} width={W} height={H} defaultProps={{only: seg.id}} />
      ))}
  </>
);
