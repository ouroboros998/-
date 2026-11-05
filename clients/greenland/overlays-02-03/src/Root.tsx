import React from 'react';
import {Composition} from 'remotion';
import {Overlay, OverlayData} from './Overlay';
import data from './data.json';

const d = data as unknown as Record<'02' | '03', OverlayData>;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Overlay02" component={Overlay} durationInFrames={d['02'].durationInFrames}
      fps={25} width={3840} height={2160} defaultProps={{data: d['02']}} />
    <Composition id="Overlay03" component={Overlay} durationInFrames={d['03'].durationInFrames}
      fps={25} width={3840} height={2160} defaultProps={{data: d['03']}} />
  </>
);
