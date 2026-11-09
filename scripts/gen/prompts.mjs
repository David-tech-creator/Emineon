// Shared art direction for the Emineon image library (BRIEF §4).
// Every prompt = subject + STYLE so the series reads as one body of work.
//
// Nov 2026, light-first re-theme ("the images should also be a bit lighter"):
// every photo with `light: true` is rendered with LIGHT_STYLE / LIGHT_ABSTRACT_STYLE:
// high-key daylight, pale warm-neutral palette, lots of air, matte film grain.
// Think a Swiss annual report or Kinfolk, not cinematic noir. The original dark
// prompts are kept in `nightPrompt` for history (originals in _gen/old-photos/).
// STYLE / ABSTRACT_STYLE (dark) still apply to og-default and oak-still.

export const LIGHT_STYLE = [
  'Editorial documentary photograph, shot on medium-format film with fine matte grain, high-key exposure.',
  'Bright overcast daylight or soft diffused morning light, no harsh shadows, no dramatic contrast, nothing dark or moody.',
  'Pale warm-neutral palette: bone white, warm stone, pale grey, soft desaturated steel blue; whites slightly creamy, blacks lifted to soft grey.',
  'A single small, restrained touch of ember orange (#FF5B1F) only where it occurs naturally (a detail, a reflection, a marker), never a glow.',
  'Lots of air and negative space, architectural calm, precise Swiss composition, quiet and expensive, like a page from a Swiss annual report or Kinfolk magazine.',
  'Absolutely no text, no letters, no numbers, no signage, no logos, no watermarks, no UI overlays.',
  'No faces in focus. Not CGI-looking, no HDR, no glossy AI sheen, no lens flare, no stock-photo look, no teal-and-orange grade.',
].join(' ');

export const LIGHT_ABSTRACT_STYLE = [
  'Minimal fine-art still life photograph, seen very close, medium-format film with fine matte grain, high-key exposure.',
  'Soft diffused north-window daylight on a pale bone and warm stone background (#F1EEE8 / #E8E4DC), gentle soft shadows, airy and bright.',
  'Pale warm-neutral palette with soft steel-blue greys; a single thin, restrained accent of ember orange (#FF5B1F) as the only saturated colour.',
  'Precise, calm, generous negative space, museum-quality restraint, like a product plate in a Swiss design annual.',
  'Absolutely no text, no letters, no numbers, no logos, no watermarks, no UI, no people.',
  'Not a 3D render, no glossy AI sheen, no dark background, no neon, no dramatic spotlight.',
].join(' ');

export const STYLE = [
  'Cinematic editorial photograph, shot on 35mm film with fine natural grain, low-key lighting.',
  'Restrained palette: deep charcoal and near-black shadows, cool blue-grey shadow tones, warm bone highlights,',
  'and a single molten ember-orange (#FF5B1F) practical or rim light as the only saturated accent.',
  'Architectural precision, calm Swiss composition with generous negative space, quiet and expensive, understated.',
  'Absolutely no text, no letters, no numbers, no signage, no logos, no watermarks, no UI overlays.',
  'No visible faces. Not illustrative, not CGI-looking, no lens-flare cliches, no neon cyberpunk, no stock-photo look.',
].join(' ');

export const ABSTRACT_STYLE = [
  'Abstract fine-art image with photographic realism, as if a macro photograph or long exposure, 35mm film grain.',
  'Near-black void background (#07080A), deep charcoal tones, warm bone highlights and molten ember-orange (#FF5B1F) light as the only accent.',
  'Precise, minimal, calm, generous negative space, museum-quality restraint.',
  'Absolutely no text, no letters, no numbers, no logos, no watermarks, no UI, no people.',
  'Not a sci-fi render, no neon cyberpunk, no blue glowing brains, no circuit-board cliches.',
].join(' ');

// size: L = 1536x1024 landscape, P = 1024x1536 portrait
export const IMAGES = {
  'hero-geneva': {
    size: 'L',
    alt: 'Lake Geneva at blue hour in soft mist, the Jet d’eau a faint silhouette against the distant shore lights.',
    prompt: 'Lake Geneva at blue hour, wide calm view across still water wrapped in low mist, the Jet d’eau fountain only a faint pale vertical silhouette in the haze in the middle distance, distant shoreline with a few warm ember-orange lights reflecting as long streaks on the water, mountains barely suggested, vast quiet sky, the lower third dark water.',
  },
  atrium: {
    size: 'L',
    alt: 'A brutalist concrete atrium in darkness, crossed by a single warm beam of light.',
    prompt: 'Interior of a monumental brutalist board-formed concrete atrium in near darkness, tall slender columns and a deep coffered ceiling, a single sharp beam of warm ember-orange sunlight cutting diagonally through a slot in the roof and landing on the polished concrete floor, dust motes in the beam, cool blue-grey ambient shadows, perfectly symmetrical one-point perspective, empty.',
  },
  'oak-veins': {
    size: 'L',
    alt: 'Macro of deeply furrowed oak bark with fine veins of ember light running through its fissures.',
    prompt: 'Extreme macro photograph of deeply furrowed old oak tree bark, the fissures threaded with very fine fibre-optic strands glowing molten ember-orange like veins of light, as if data were flowing through the wood, shallow depth of field, the rest of the bark in deep charcoal shadow with cool grey texture highlights.',
    abstract: true,
  },
  filaments: {
    size: 'L',
    alt: 'Molten ember filaments weaving into a fine three-dimensional lattice against a black void.',
    prompt: 'Thin molten glowing ember-orange filaments, like incandescent wire or long-exposure light trails, weaving together into a delicate three-dimensional lattice of nodes and connecting lines, small bright points where strands meet, floating in a black void, gentle depth of field, some strands fading into darkness, elegant and sparse.',
    abstract: true,
  },
  'hands-graph': {
    size: 'L',
    alt: 'Hands resting over a dark glass table lit by a projected network of light.',
    prompt: 'Overhead three-quarter view of two hands (no face visible, dark tailored sleeves) resting near the edge of a dark smoked-glass boardroom table, a faint projected network graph of thin bone-white lines and small ember-orange nodes glowing across the glass surface and softly lighting the fingers from below, the rest of the room in deep darkness.',
  },
  'ind-trading': {
    size: 'L',
    alt: 'A crude oil tanker at dusk on a calm, dark sea under a fading ember horizon.',
    prompt: 'A large crude oil tanker in profile far out on a perfectly calm dark sea at dusk, a thin band of ember-orange afterglow on the horizon, the ship a dark silhouette with a few small warm deck lights, cool blue-grey sky above, glassy water with subtle reflections, tiny in the frame with vast negative space.',
  },
  'ind-banking': {
    size: 'L',
    alt: 'An empty marble hall of a private bank at night, lit by a few warm lamps.',
    prompt: 'An empty grand private-bank hall at night, dark veined marble floor and walls, tall bronze-framed doors, a long dark wood counter, a few warm ember-toned brass lamps creating pools of light, cool moonlight from high windows, deep shadows, perfect symmetry, discreet old-money calm.',
  },
  'ind-intl': {
    size: 'L',
    alt: 'An empty assembly hall with interpretation booths glowing softly above curved rows of seats.',
    prompt: 'An empty international assembly hall in low light, curved concentric rows of desks with small microphones, a row of glass interpretation booths high on the back wall glowing softly warm ember, the rest in cool blue-grey shadow, a modern conference chamber, wide shot, no people, no flags, no emblems.',
  },
  'ind-life': {
    size: 'L',
    alt: 'Macro of laboratory pipette tips and glass vials in cool light with an ember reflection.',
    prompt: 'Macro photograph in a dark laboratory: a precise row of clear glass vials and a multichannel pipette with translucent tips, a single droplet suspended at a tip, cool blue-grey light from the side and a warm ember-orange reflection gleaming on the curved glass, shallow depth of field, clinical and serene.',
  },
  'ind-fragrance': {
    size: 'L',
    alt: 'A perfumer’s organ of tiered glass bottles glowing amber in a dark studio.',
    prompt: 'A perfumer’s organ: tiered curved wooden shelves holding dozens of small unlabelled glass essence bottles in amber, smoke and clear tones, warm ember backlight glowing through the liquids, a dark atelier, cool shadows, shallow depth of field, quiet craft.',
  },
  'ind-manufacturing': {
    size: 'L',
    alt: 'Ember sparks fly from a precision machining tool in a dark workshop.',
    prompt: 'Close view of a precision CNC milling spindle cutting a polished steel component, a fine fan of bright ember-orange sparks and metal chips flying, coolant mist, the machine body in dark graphite tones with cool blue-grey highlights, dark factory background, high shutter speed, precise and industrial.',
  },
  // Case series: abstract-but-sector-suggestive, one consistent visual grammar:
  // a single object/material from the sector seen in darkness, crossed by a thin ember line.
  'case-1': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a dark steel ship hull curve crossed by a thin line of ember light.',
    prompt: 'Minimal abstract still life: the curved dark steel bow of a ship hull seen extremely close, water beads on the painted metal, a single thin horizontal line of ember-orange light grazing across it, everything else falling into black.',
  },
  'case-2': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a polished black marble surface crossed by a thin line of ember light.',
    prompt: 'Minimal abstract still life: a polished black veined marble surface and the edge of a heavy brass vault door hinge seen extremely close, a single thin horizontal line of ember-orange light grazing across the stone, everything else falling into black.',
  },
  'case-3': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a stack of heavy paper and a conference microphone in darkness, grazed by ember light.',
    prompt: 'Minimal abstract still life: the slim black gooseneck of a conference-desk microphone curving over a neat stack of blank heavy cream paper sheets on a dark walnut desk, seen extremely close, a single thin horizontal line of ember-orange light grazing across the paper edges, everything else falling into black.',
  },
  'case-4': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a glass vial and droplet in darkness, crossed by a thin line of ember light.',
    prompt: 'Minimal abstract still life: a single clear glass laboratory vial with a liquid droplet clinging to its rim, seen extremely close, a single thin horizontal line of ember-orange light grazing across the glass, everything else falling into black.',
  },
  'case-5': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a faceted glass essence bottle in darkness, crossed by a thin line of ember light.',
    prompt: 'Minimal abstract still life: an unlabelled faceted glass perfume essence flask with amber liquid and a glass dropper, seen extremely close, a single thin horizontal line of ember-orange light grazing across the glass, everything else falling into black.',
  },
  'case-6': {
    size: 'L', abstract: true,
    alt: 'Abstract still life: a machined steel gear in darkness, crossed by a thin line of ember light.',
    prompt: 'Minimal abstract still life: a precision-machined brushed steel gear and bearing seen extremely close, fine tool marks on the metal, a single thin horizontal line of ember-orange light grazing across the teeth, everything else falling into black.',
  },
  // Insight covers: procedural dot-lattice series (BRIEF §8), rendered by scripts/gen/dot-covers.mjs
  // (masters insight-N-v2.png). The prompts below produced the retired v1 photo covers (_gen/old-insights).
  'insight-1': {
    size: 'L', abstract: true,
    alt: "Abstract cover: loose, scattered dots resolving into an ordered lattice that rises to the right, on a grainy ember and steel-blue gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: a scattered field of tiny dim bone-coloured points on the left gradually aligning into a single clean ascending line of ember light on the right, like a prototype becoming a production system, long-exposure feel.',
  },
  'insight-2': {
    size: 'L', abstract: true,
    alt: "Abstract cover: a field of dots rippling out from two sources, the wave fronts meeting and branching, on a grainy ember gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: several thin ember-orange light paths flowing horizontally and branching then rejoining at small bright nodes, like an autonomous workflow routing documents, faint translucent glass panes floating in the void.',
  },
  'insight-3': {
    size: 'L', abstract: true,
    alt: "Abstract cover: three nested domes of dots, each opened to reveal the one inside, on a grainy ember and steel-blue gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: a small glowing ember-orange core of light enclosed by several concentric translucent smoked-glass planes, like protected data held within boundaries, cool grey reflections on the glass edges.',
  },
  'insight-4': {
    size: 'L', abstract: true,
    alt: "Abstract cover: a balanced torus of white dots, its two halves in equilibrium, on a grainy ember and steel-blue gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: a perfectly balanced minimal composition, a dark polished stone sphere resting on a thin bone-coloured beam opposite a small glowing ember disc, like a precise scale weighing value, soft studio light.',
  },
  'insight-5': {
    size: 'L', abstract: true,
    alt: "Abstract cover: a widening helix of dots spiralling down to a single anchor point, on a grainy ember and steel-blue gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: a distant faint constellation of bone-coloured nodes and lines in the background, a single bright ember-orange filament extending from it into the sharp foreground and anchoring onto a dark matte surface, like an engineer embedded on site, depth of field.',
  },
  'insight-6': {
    size: 'L', abstract: true,
    alt: "Abstract cover: a dome of evenly spaced white dots with a single ember dot among them, on a grainy gradient.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'Abstract editorial cover: a fine faint bone-coloured measurement grid receding in perspective with neat rows of small matte spheres placed on it, one sphere glowing ember-orange, like systematic evaluation and quality control, calm and exact.',
  },
  careers: {
    size: 'L',
    alt: 'A silhouetted figure at a desk by a tall window at dusk, a warm lamp beside them.',
    prompt: 'A modern minimal studio at dusk, a single person seen from behind as a dark silhouette sitting at a long oak desk in front of a tall window overlooking a misty lake and distant mountains, a warm ember-toned desk lamp beside them, a laptop with a dim screen, cool blue evening light outside, contemplative, focused.',
  },
  'about-geneva': {
    size: 'L',
    alt: 'Old Geneva rooftops and the lake in mist at dawn, seen from above.',
    prompt: 'Elevated view over the old town rooftops of Geneva at dawn in fog, slate and copper roofs, the cathedral towers as soft silhouettes, Lake Geneva beyond dissolving into mist, first ember-orange light catching the edges of the roofs, cool blue shadows, serene.',
  },
  'og-default': {
    size: 'L',
    alt: "A dome of white dots on a grainy ember and graphite gradient, set to the right of the frame.",
    procedural: 'scripts/gen/dot-covers.mjs',
    prompt: 'A majestic oak tree formed entirely of fine glowing light filaments and tiny nodes like a neural graph, bone-white branches with ember-orange pulses travelling from the roots up into the canopy, roots fanning into a faint lattice below, the whole tree including its roots fully visible and contained within the vertical middle of the frame with generous empty margins above and below, tree positioned in the right third of a black void frame and filling about seventy percent of the frame height, the left half completely empty dark negative space for a title, wide composition.',
    abstract: true,
  },
  // Still for the hero-oak video (not an exported page image).
  'oak-still': {
    size: 'L', internal: true,
    alt: 'An oak tree made of glowing light filaments with ember pulses on a black void.',
    prompt: 'A majestic oak tree formed entirely of thousands of fine glowing light filaments and tiny luminous nodes like a living neural network graph, bone-white branches with scattered ember-orange glowing pulses, roots fanning below into a faint luminous lattice on a dark ground plane, centered in the frame, a black void background, quiet and monumental.',
    abstract: true,
  },
};

// --- Nov 2026 light re-shoot -------------------------------------------------
// Same subjects and aspect ratios, new daylight direction. The dark prompt/alt
// each replaces is kept as nightPrompt / nightAlt.
const LIGHT = {
  'hero-geneva': {
    alt: 'Lake Geneva on a bright, hazy morning, the Jet d’eau a soft white plume above pale silver water.',
    prompt: 'Lake Geneva on a bright hazy morning, a wide calm view across pale silver-grey still water, the Jet d’eau fountain a soft white plume in the middle distance, the far shoreline a pale blue-grey band dissolving in haze, the Alps only faintly suggested, a vast pale sky filling the upper half, a single small ember-orange mooring buoy floating in the near water, serene and airy.',
  },
  atrium: {
    alt: 'A pale concrete atrium filled with soft daylight falling from a long skylight.',
    prompt: 'Interior of a monumental brutalist atrium in pale light-grey board-formed concrete, tall slender columns and a coffered ceiling with a long skylight, soft diffused daylight filling the space evenly and falling gently onto a pale polished concrete floor, perfectly symmetrical one-point perspective, empty, calm, a single slim ember-orange bench far away at the end of the hall.',
  },
  'oak-veins': {
    abstract: true,
    alt: 'Macro of pale, weathered oak bark in daylight, a fine ember thread running along one fissure.',
    prompt: 'Extreme macro photograph of the deeply furrowed bark of an old oak, weathered to pale silvery grey and warm stone tones, lit by soft overcast daylight, one single very fine ember-orange thread laid precisely along a fissure like a line of data running through the wood, shallow depth of field.',
  },
  filaments: {
    abstract: true,
    alt: 'A delicate lattice of fine taut threads and small nodes suspended in a bright white gallery, a few strands in ember.',
    prompt: 'A delicate three-dimensional lattice of very fine taut threads strung between small matte pins, mostly pale graphite and bone-white thread with a few strands in ember orange, forming a network of nodes and connecting lines like a string-art installation suspended in a bright white daylit gallery, soft shadows on the pale wall, gentle depth of field, sparse and elegant.',
  },
  'hands-graph': {
    alt: 'Hands resting on a pale table in daylight beside a hand-drawn network of fine lines and dots.',
    prompt: 'Overhead three-quarter view of two hands (no face visible, pale linen shirt sleeves) resting at the edge of a pale oak table in soft window daylight, beside a large sheet of cream paper with a hand-drawn network graph of fine graphite lines and small dots, one dot marked in ember orange, a graphite pencil nearby, calm and considered.',
  },
  'ind-trading': {
    alt: 'A tanker far out on a calm, pale sea under a bright overcast sky.',
    prompt: 'A large crude oil tanker in profile far out on a perfectly calm sea on a bright overcast morning, pale grey-blue water and pale sky almost merging at a soft horizon, the ship small in the frame with a pale grey hull and a thin rust-orange waterline, glassy water with soft reflections, vast airy negative space.',
  },
  'ind-banking': {
    alt: 'An empty private-bank hall in soft daylight, pale marble and tall windows.',
    prompt: 'An empty grand private-bank hall in soft morning daylight, pale cream travertine and lightly veined white marble floor and walls, tall windows with sheer linen curtains diffusing the light, a long pale oak counter, slim brushed-brass details, perfect symmetry, discreet old-money calm, bright and airy.',
  },
  'ind-intl': {
    alt: 'An empty assembly hall in daylight, curved rows of pale desks below glass interpretation booths.',
    prompt: 'An empty international assembly hall in bright daylight, curved concentric rows of pale ash-wood desks with slim microphones and light grey seats, a row of glass interpretation booths along the back wall, a large skylight and tall windows washing the room with soft even light, modern conference chamber, wide shot, no people, no flags, no emblems.',
  },
  'ind-life': {
    alt: 'Clear glass vials and a pipette on a bright laboratory bench in soft daylight.',
    prompt: 'A bright laboratory bench by a large window: a precise row of clear glass vials in a white rack and a multichannel pipette with translucent tips, a single droplet suspended at a tip, soft diffused daylight, white, pale grey and soft steel-blue tones, one vial cap in ember orange, shallow depth of field, clinical and serene.',
  },
  'ind-fragrance': {
    alt: 'A perfumer’s organ of small glass bottles on pale wooden tiers in a bright atelier.',
    prompt: 'A perfumer’s organ in a bright daylit atelier: tiered curved shelves in pale oak holding dozens of small unlabelled glass essence bottles in clear, pale straw and soft amber tones, soft window light passing through the liquids, a pale stone worktop, shallow depth of field, quiet craft.',
  },
  'ind-manufacturing': {
    alt: 'A precision-machined steel part in a clean, daylit workshop.',
    prompt: 'A precision-machined brushed-steel component clamped on the bed of a clean CNC milling machine, the machine body in pale grey and white, soft daylight from high factory windows, fine tool marks catching the light, a small ember-orange machine detail, a bright, orderly modern workshop softly out of focus behind, precise and calm.',
  },
  // Case series: one sector object on pale stone in soft daylight, crossed by a thin ember line.
  'case-1': {
    abstract: true,
    alt: 'Abstract still life: the pale curve of a ship’s hull in daylight, crossed by a thin ember line.',
    // v3 pick: v2 read as a lampshade, so the harbour/quay cue was added.
    prompt: 'Clearly a large ship in a harbour: the tall flared steel bow of a cargo ship seen from the quay at water level, with visible hull plating seams, a few rivet lines and the calm pale harbour water at the bottom of the frame. Minimal abstract still life: the curved bow of a ship hull in pale grey painted steel seen extremely close in soft daylight, fine water beads on the paint, a single thin horizontal ember-orange stripe running across it, pale sky behind.',
  },
  'case-2': {
    abstract: true,
    alt: 'Abstract still life: pale veined marble and a brass hinge in daylight, crossed by a thin ember line.',
    prompt: 'Minimal abstract still life: a pale lightly veined white marble surface and the edge of a brushed-brass vault door hinge seen extremely close in soft daylight, a single thin taut ember-orange thread running horizontally across the stone.',
  },
  'case-3': {
    abstract: true,
    alt: 'Abstract still life: a conference microphone over a stack of blank paper in daylight, crossed by a thin ember line.',
    prompt: 'Minimal abstract still life: the slim pale grey gooseneck of a conference-desk microphone curving over a neat stack of blank cream paper sheets on a pale oak desk, seen close in soft daylight, a single thin taut ember-orange thread running horizontally across the paper edges.',
  },
  'case-4': {
    abstract: true,
    alt: 'Abstract still life: a glass vial and droplet on pale stone in daylight, crossed by a thin ember line.',
    prompt: 'Minimal abstract still life: a single clear glass laboratory vial with a liquid droplet clinging to its rim, standing on pale stone, seen extremely close in soft daylight with gentle soft shadow, a single thin taut ember-orange thread running horizontally behind the glass.',
  },
  'case-5': {
    abstract: true,
    alt: 'Abstract still life: a faceted glass essence bottle on pale stone in daylight, crossed by a thin ember line.',
    prompt: 'Minimal abstract still life: an unlabelled faceted glass perfume essence flask with pale amber liquid and a glass dropper, standing on pale stone, seen extremely close in soft daylight with soft caustics, a single thin taut ember-orange thread running horizontally behind it.',
  },
  'case-6': {
    abstract: true,
    alt: 'Abstract still life: a machined steel gear on pale stone in daylight, crossed by a thin ember line.',
    prompt: 'Minimal abstract still life: a precision-machined brushed-steel gear and bearing lying on pale stone, seen extremely close in soft daylight, fine tool marks on the metal, a single thin taut ember-orange thread running horizontally across the frame.',
  },
  careers: {
    alt: 'A person seen from behind at a long pale desk by a tall window, a hazy lake beyond, in morning light.',
    prompt: 'A bright minimal studio in soft morning daylight, a single person seen from behind and slightly out of focus, sitting at a long pale oak desk in front of a tall window overlooking a hazy pale lake and faint distant mountains, a laptop, a ceramic cup and an ember-orange notebook on the desk, white walls, calm and focused.',
  },
  'about-geneva': {
    alt: 'Geneva’s old town rooftops and the lake on a bright, hazy morning, seen from above.',
    prompt: 'Elevated view over the old town rooftops of Geneva on a bright hazy morning, pale slate and soft verdigris copper roofs, the cathedral towers in soft focus, Lake Geneva beyond dissolving into pale luminous haze, soft even daylight, airy and serene.',
  },
};
for (const [k, v] of Object.entries(LIGHT)) {
  const old = IMAGES[k];
  IMAGES[k] = { ...old, nightPrompt: old.prompt, nightAlt: old.alt, ...v, light: true };
}

export function fullPrompt(key) {
  const i = IMAGES[key];
  if (i.light) return `${i.prompt} ${i.abstract ? LIGHT_ABSTRACT_STYLE : LIGHT_STYLE}`;
  return `${i.prompt} ${i.abstract ? ABSTRACT_STYLE : STYLE}`;
}
