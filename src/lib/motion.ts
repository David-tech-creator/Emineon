/** Shared motion constants. Keep motion precise and calm (BRIEF §4). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  ui: 0.2,
  reveal: 0.8,
  slow: 1.1,
} as const;

/** Default viewport options for whileInView reveals. */
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -12% 0px" } as const;
