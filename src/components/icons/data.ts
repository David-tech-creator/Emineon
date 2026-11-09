/**
 * Emineon icon geometry. 24px grid, 1.5 stroke, square caps, miter joins.
 * DNA: line work (branches) terminating in small filled nodes (r = 1.5), echoing the oak graph.
 * Pure data so it can be rendered by React and by the contact-sheet generator alike.
 */

export const ICON_KEYS = [
  "strategy",
  "agents",
  "platform",
  "operations",
  "adoption",
  "trading",
  "banking",
  "intl-orgs",
  "life-sciences",
  "fragrance",
  "manufacturing",
  "trust",
  "residency",
  "fde",
  "sprint",
  "evals",
  "outcome",
  "globe",
  "roots",
  "branch",
  "shield",
  "spark",
  "arrow-right",
  "arrow-up-right",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

export type IconNode = readonly [x: number, y: number, r?: number];

export interface IconDef {
  /** Stroked path data (fill none). */
  readonly strokes: readonly string[];
  /** Filled node circles. */
  readonly nodes: readonly IconNode[];
}

export const ICONS: Record<IconKey, IconDef> = {
  // A fork in the path: one branch explored, the other carried to the flag.
  strategy: {
    strokes: ["M7.5 20.25V15", "M7.5 15L3.75 10.5", "M7.5 15L14.25 11.25", "M14.25 11.25V3.75", "M14.25 3.75H20.25L18 6.75L20.25 9.75H14.25"],
    nodes: [[7.5, 15], [3.75, 10.5], [14.25, 11.25]],
  },

  // A bounded unit (the agent) acting through its tools.
  agents: {
    strokes: ["M7.5 7.5H15V15H7.5Z", "M15 7.5L19.5 3.75", "M7.5 15L4.5 19.5", "M15 15L19.5 19.5", "M11.25 7.5V3.75"],
    nodes: [[11.25, 11.25], [19.5, 3.75], [4.5, 19.5], [19.5, 19.5], [11.25, 3.75]],
  },

  // Data below, systems above; the platform is the trunk that carries one to the other.
  platform: {
    strokes: ["M3.75 3.75H10.125V8.25H3.75Z", "M13.875 3.75H20.25V8.25H13.875Z", "M3.75 15.75H20.25V20.25H3.75Z", "M12 15.75V12", "M6.9375 8.25V12H17.0625V8.25"],
    nodes: [[12, 12]],
  },

  // Run loop with a live signal inside: monitor, evaluate, harden.
  operations: {
    strokes: ["M19.5 12A7.5 7.5 0 1 1 12 4.5", "M9.75 2.25L12 4.5L9.75 6.75", "M7.5 12H9.75L10.875 10.125L13.125 13.875L14.25 12H16.5"],
    nodes: [[19.5, 12], [12, 19.5]],
  },

  // One person, then the team: capability spreading along the graph.
  adoption: {
    strokes: [
      "M12 4.125A2.625 2.625 0 1 1 12 9.375A2.625 2.625 0 1 1 12 4.125Z",
      "M7.5 18V16.5A4.5 4.5 0 0 1 16.5 16.5V18",
      "M9.75 8.25L5.25 11.25",
      "M14.25 8.25L18.75 11.25",
      "M2.25 19.5A3 3 0 0 1 5.25 16.5",
      "M21.75 19.5A3 3 0 0 0 18.75 16.5",
    ],
    nodes: [[5.25, 11.25], [18.75, 11.25]],
  },

  // A laden hull under a trade route.
  trading: {
    strokes: ["M3 15H21L18.75 19.5H5.25Z", "M14.25 15V11.25H18V15", "M4.5 9.75L9 6L12.75 8.25L18 4.5"],
    nodes: [[4.5, 9.75], [9, 6], [12.75, 8.25], [18, 4.5]],
  },

  // The hall: pediment and columns, each column a branch from the base.
  banking: {
    strokes: ["M3.75 9L12 3.75L20.25 9", "M3.75 9H20.25", "M6.75 12V17.25", "M12 12V17.25", "M17.25 12V17.25", "M3.75 20.25H20.25"],
    nodes: [[12, 3.75], [6.75, 12], [12, 12], [17.25, 12]],
  },

  // The hemicycle: delegations around a single floor.
  "intl-orgs": {
    strokes: ["M3.75 17.25A8.25 8.25 0 0 1 20.25 17.25", "M7.5 17.25A4.5 4.5 0 0 1 16.5 17.25", "M3 20.25H21"],
    nodes: [[4.86, 13.13], [12, 9], [19.14, 13.13], [12, 17.25]],
  },

  // Flask with rising nodes.
  "life-sciences": {
    strokes: ["M9.75 3.75V9.75L4.5 19.5V20.25H19.5V19.5L14.25 9.75V3.75", "M8.25 3.75H15.75", "M6.75 15.75H17.25"],
    nodes: [[10.5, 18], [13.5, 12.75], [14.25, 17.25]],
  },

  // Flacon, collar and atomised notes drifting off.
  fragrance: {
    strokes: ["M6 11.25H15.75V20.25H6Z", "M9 8.25H12.75V11.25", "M8.25 4.5H13.5V8.25H8.25Z", "M13.5 6.375L17.25 5.25"],
    nodes: [[17.25, 5.25], [20.25, 3], [20.25, 7.5]],
  },

  // A robot arm: segments as edges, joints as nodes.
  manufacturing: {
    strokes: ["M4.5 20.25H12", "M8.25 20.25V15", "M8.25 15L12 8.25", "M12 8.25L18 10.5", "M18 10.5V12.75", "M16.5 15V12.75H19.5V15"],
    nodes: [[8.25, 15], [12, 8.25], [18, 10.5]],
  },

  // Lock: your data stays yours.
  trust: {
    strokes: ["M8.25 10.5V7.5A3.75 3.75 0 0 1 15.75 7.5V10.5", "M5.25 10.5H18.75V20.25H5.25Z", "M12 15V17.25"],
    nodes: [[12, 14.625]],
  },

  // Located in Switzerland: pin with the cross, anchored by a node.
  residency: {
    strokes: [
      "M12 20.25C9.5 17.5 5.25 13.5 5.25 9.75A6.75 6.75 0 0 1 18.75 9.75C18.75 13.5 14.5 17.5 12 20.25Z",
      "M12 7.125V12.375",
      "M9.375 9.75H14.625",
    ],
    nodes: [[12, 20.25]],
  },

  // Forward-deployed: a node travels into the client team and joins its graph.
  fde: {
    strokes: ["M11.25 4.5H20.25V19.5H11.25", "M3 12H14.25", "M5.25 9.75L7.5 12L5.25 14.25", "M14.25 12L17.25 8.25", "M14.25 12L17.25 15.75"],
    nodes: [[14.25, 12], [17.25, 8.25], [17.25, 15.75]],
  },

  // Time-boxed: a stopwatch whose hand is a branch.
  sprint: {
    strokes: ["M19.5 13.5A7.5 7.5 0 1 1 4.5 13.5A7.5 7.5 0 1 1 19.5 13.5Z", "M10.125 2.625H13.875", "M12 2.625V6", "M12 13.5L15.75 9.75", "M18 6.75L19.5 5.25"],
    nodes: [[12, 13.5], [15.75, 9.75]],
  },

  // Inspection: every output checked.
  evals: {
    strokes: ["M16.5 10.5A6 6 0 1 1 4.5 10.5A6 6 0 1 1 16.5 10.5Z", "M14.75 14.75L20.25 20.25", "M7.5 10.5L9.75 12.75L13.5 9"],
    nodes: [[20.25, 20.25]],
  },

  // Paid on outcomes: the result, not the hours.
  outcome: {
    strokes: ["M19.4 10.6A7.5 7.5 0 1 1 13.4 4.6", "M12 12L19.5 4.5", "M16.5 4.5H19.5V7.5", "M15.375 12A3.375 3.375 0 1 1 12 8.625"],
    nodes: [[12, 12]],
  },

  // Rooted in Genève, connected everywhere.
  globe: {
    strokes: [
      "M20.25 12A8.25 8.25 0 1 1 3.75 12A8.25 8.25 0 1 1 20.25 12Z",
      "M12 3.75C9 6.75 9 17.25 12 20.25",
      "M12 3.75C15 6.75 15 17.25 12 20.25",
      "M3.75 12H20.25",
    ],
    nodes: [[9.75, 12], [14.25, 12], [12, 3.75]],
  },

  // Roots: your data, branching below the ground line.
  roots: {
    strokes: ["M3.75 4.5H20.25", "M12 4.5V10.5", "M12 10.5L6.75 14.25", "M12 10.5L17.25 14.25", "M6.75 14.25L4.5 19.5", "M6.75 14.25L9.75 19.5", "M17.25 14.25L19.5 19.5"],
    nodes: [[12, 10.5], [6.75, 14.25], [17.25, 14.25], [4.5, 19.5], [9.75, 19.5], [19.5, 19.5]],
  },

  // Branch: a workflow growing into new paths.
  branch: {
    strokes: ["M10.5 20.25V14.25", "M10.5 14.25L5.25 8.25", "M10.5 14.25L15.75 10.5", "M15.75 10.5V4.5", "M15.75 10.5L20.25 8.25"],
    nodes: [[10.5, 14.25], [5.25, 8.25], [15.75, 10.5], [15.75, 4.5], [20.25, 8.25]],
  },

  // Shield with the oak's fork inside.
  shield: {
    strokes: ["M12 3L19.5 5.625V11.25C19.5 15.75 16.5 19.125 12 21C7.5 19.125 4.5 15.75 4.5 11.25V5.625Z", "M12 16.5V12.375", "M12 12.375L9 9", "M12 12.375L15 9"],
    nodes: [[12, 12.375], [9, 9], [15, 9]],
  },

  // Forge spark: a four-point star, struck, with an ember fleck.
  spark: {
    strokes: ["M11.25 3.75L13.25 10.75L20.25 12.75L13.25 14.75L11.25 21.75L9.25 14.75L2.25 12.75L9.25 10.75Z"],
    nodes: [[19.5, 4.5]],
  },

  "arrow-right": {
    strokes: ["M5.25 12H19.5", "M13.5 6L19.5 12L13.5 18"],
    nodes: [[4.5, 12]],
  },

  "arrow-up-right": {
    strokes: ["M6.75 17.25L17.25 6.75", "M8.25 6.75H17.25V15.75"],
    nodes: [[6, 18]],
  },
};
