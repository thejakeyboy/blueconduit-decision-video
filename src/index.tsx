import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {ConferenceBoothDemo} from './ConferenceBoothDemo';
import {CreativeShowcase} from './CreativeShowcase';
import {DecisionEngineDemo2026} from './DecisionEngineDemo2026';
import {DecisionEngineLiveLoopDraft, ProductDemoAnnotatedDraft} from './LiveFootageDrafts';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DecisionEngineDemo2026"
        component={DecisionEngineDemo2026}
        durationInFrames={1650}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="DecisionEngineLiveLoopDraft"
        component={DecisionEngineLiveLoopDraft}
        durationInFrames={2250}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ProductDemoAnnotatedDraft"
        component={ProductDemoAnnotatedDraft}
        durationInFrames={7200}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ConferenceBoothDemo"
        component={ConferenceBoothDemo}
        durationInFrames={1350}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="CreativeShowcase"
        component={CreativeShowcase}
        durationInFrames={2520}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

registerRoot(RemotionRoot);
