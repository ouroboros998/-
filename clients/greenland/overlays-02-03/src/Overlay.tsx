import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, continueRender, delayRender} from 'remotion';

// Brand (Greenland): green #0C884E, lime #B2CE42, dark green #09703F, white. Font: Thmanyah.
const DARK = '#09703F';
const LIME = '#B2CE42';
// Font files are copied from NAS Greenland/Brand/Fonts into public/fonts/ (set the two names below).
const TITLE_FONT_FILE = 'fonts/title.otf';
const CAPTION_FONT_FILE = 'fonts/caption.otf';

const fontHandle = delayRender('fonts');
Promise.all([
  new FontFace('GLTitle', `url(${staticFile(TITLE_FONT_FILE)})`).load(),
  new FontFace('GLCaption', `url(${staticFile(CAPTION_FONT_FILE)})`).load(),
]).then((faces) => { faces.forEach((f) => document.fonts.add(f)); continueRender(fontHandle); })
  .catch((e) => { console.error(e); continueRender(fontHandle); });

type Caption = {from: number; to: number; text: string};
type Title = {from: number; to: number; text: string; sub: string; items?: {text: string; at: number}[]};
export type OverlayData = {durationInFrames: number; captions: Caption[]; titles: Title[]};

// Dark-green outline built from shadows (keeps the white fill clean), plus a soft drop shadow.
const stroke = (px: number) => {
  const r = Math.max(2, Math.round(px / 2));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]];
  return {
    whiteSpace: 'nowrap' as const,
    textShadow: [...dirs.map(([x, y]) => `${x * r}px ${y * r}px 0 ${DARK}`), `0 ${px}px ${px * 2.5}px rgba(0,0,0,0.5)`].join(', '),
  };
};

const fadeInOut = (frame: number, len: number, inF = 6, outF = 6) =>
  interpolate(frame, [0, inF, len - outF, len], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const CaptionView: React.FC<{c: Caption}> = ({c}) => {
  const f = useCurrentFrame();
  const len = c.to - c.from;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 190}}>
      <div dir="rtl" style={{
        fontFamily: 'GLCaption', fontSize: 118, color: 'white', textAlign: 'center',
        lineHeight: 1.35, opacity: fadeInOut(f, len, 3, 3), ...stroke(10),
      }}>{c.text}</div>
    </AbsoluteFill>
  );
};

const TitleView: React.FC<{t: Title}> = ({t}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const len = t.to - t.from;
  const pop = spring({frame: f, fps, config: {damping: 200, mass: 0.6}});
  const scale = interpolate(pop, [0, 1], [0.94, 1]);
  const y = interpolate(pop, [0, 1], [30, 0]);
  const op = fadeInOut(f, len, 7, 8);
  return (
    <AbsoluteFill style={{alignItems: 'center', paddingTop: 230}}>
      <div dir="rtl" style={{opacity: op, transform: `translateY(${y}px) scale(${scale})`, textAlign: 'center'}}>
        {t.items ? (
          <div style={{display: 'flex', gap: 44, justifyContent: 'center'}}>
            {t.items.map((it, i) => {
              const local = f - (it.at - t.from);
              const p = spring({frame: local, fps, config: {damping: 200, mass: 0.6}});
              return (
                <div key={i} style={{fontFamily: 'GLTitle', fontSize: 108, color: 'white', opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px)`, ...stroke(12)}}>
                  {it.text}{i < t.items!.length - 1 ? <span style={{color: LIME, marginInlineStart: 44}}>•</span> : null}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div style={{fontFamily: 'GLTitle', fontSize: 190, color: 'white', lineHeight: 1.2, ...stroke(14)}}>{t.text}</div>
            {t.sub ? <div style={{fontFamily: 'GLTitle', fontSize: 120, color: LIME, marginTop: 10, ...stroke(11)}}>{t.sub}</div> : null}
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Overlay: React.FC<{data: OverlayData}> = ({data}) => (
  <AbsoluteFill style={{backgroundColor: 'transparent'}}>
    {/* Titles track (V3) */}
    {data.titles.map((t, i) => (
      <Sequence key={`t${i}`} from={t.from} durationInFrames={t.to - t.from} layout="none"><TitleView t={t} /></Sequence>
    ))}
    {/* Captions track (V2): whole sentence at once */}
    {data.captions.map((c, i) => (
      <Sequence key={`c${i}`} from={c.from} durationInFrames={c.to - c.from} layout="none"><CaptionView c={c} /></Sequence>
    ))}
  </AbsoluteFill>
);
