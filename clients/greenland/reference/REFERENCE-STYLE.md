# Greenland v2: reference style (from Moe's reference video, 67 s, 16:9)

Moe rejected the 9:16 v1 ("مش حلو ابدا"). v2 is **landscape 16:9** and follows this reference.

## Look
- Format: 16:9. Native 3840x2160 from the drone (no crop); preview at 1920x1080. 25 fps (matches the footage).
- Grade: vivid and punchy, with strong saturation and contrast. Greens are lush, roofs warm, sky clean. Nothing flat.
- No word-by-word captions.

## Typography (Thmanyah Sans Black/Bold)
- Big kinetic Arabic headlines, white, with a soft dark shadow and a slight glow. Key words in **yellow #FCFD0B** with a yellow glow, e.g. «ناعــــور» huge, stretched with kashida, under a small white «بموقع استراتيجي في».
- Reveals: mask/slide-up per line with a spring, sometimes a large word sliding in from the edge. Frame math only.
- Some headlines are projected ON THE GROUND in perspective inside a plot (e.g. «مساحات متنوعة / من 500 الى 1000م» with the numbers in yellow), tracked to the drone move.

## Persistent lower bars (from right after the hook to the end card)
- Bottom right: «مساحات من 500 الى 1000م» in neon green #21FF0C with a glow.
- Bottom left: «لمزيد من المعلومات :» / «+962 7970 33330» in neon green.

## Plot outlines (signature element)
- Plots drawn on the ground in perspective, tracked to camera motion: white glowing stroke (~4 px), dark translucent fill (black ~45%), plot number in neon green and «731 m2»-style area in white, both lying on the ground plane.
- Tracking: compute a per-frame homography with OpenCV (ORB/AKAZE features, or LK optical flow on ground points + findHomography with RANSAC) from a reference frame. Export it as JSON per shot and apply it to the SVG overlay in Remotion (matrix3d or per-point transform). Choose shots with clear ground (0324, 0298, 0283, 0329, 0307, 0269...).
- Do NOT invent plot numbers/areas. Until Moe sends the real plot map, show outlines with only range text («من 500 الى 1000م») or no numbers.

## End card
- White background, color logo centered, then: www.greenland.jo · greenlandjor@gmail.com · +962 79 70 3333 0, and a CTA line («تواصل معنا واعرف أكثر»).
