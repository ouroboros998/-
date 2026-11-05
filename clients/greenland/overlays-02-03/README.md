# Greenland 02/03: titles + captions overlay (Remotion)

Transparent ProRes 4444 layers for Moe's Resolve timelines "Greenland 02 VO" / "Greenland 03 VO" (3840x2160, 25 fps).
- `src/data.json`: caption sentences (Moe's script, word for word) and titles (phrases from the VO), in timeline frames. VO starts at frame 13.
- Fonts: copy Thmanyah from NAS `AI Editing/Edit/Greenland/Brand/Fonts/Thmanyah-Font-Family` to `public/fonts/title.otf` (sans Black/Heavy) and `public/fonts/caption.otf` (sans Bold).
- `npm i && npm run studio` to review; `npm run render02` / `npm run render03` export the alpha layers.
