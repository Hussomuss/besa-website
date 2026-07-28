/**
 * Copy and specification for the internal component lab at /lab. This is not
 * site content, so its shapes live here rather than in shared/types/content.
 * One block per component; it leaves the repo with the route.
 */

/** Control points of a cubic-bezier, in CSS argument order. */
export type Curve = readonly [number, number, number, number];

export const LAB_PAGE = {
  heading: "Components, in isolation",
  lead: "One section per component, on the grounds it ships on. Everything here is live rather than a picture of itself, so decisions can be made by pressing something.",
  hint: "Press and hold. Touch screens have no hover, so :active carries the whole animation there and a phone is the only honest place to judge these.",
};

/* -------------------------------------------------------------- Button --- */

export interface RiseDuration {
  id: string;
  ms: string;
  note: string;
}

export interface RiseCoupling {
  id: string;
  name: string;
  note: string;
  /** Inline custom properties driving the label's own motion. */
  lift: string;
  liftDelay: string;
}

/**
 * Firm: medium stiffness, critical damping. Chosen over the front-loaded
 * curves because the plane reads as having mass rather than speed.
 */
export const RISE_CURVE: Curve = [0.33, 1, 0.68, 1];

/** Held constant wherever a row below is varying something else. */
export const RISE_MS = "440ms";

export const BUTTON_SECTION = {
  heading: "Button",
  lead: "Filled at rest, because an outline that only fills on hover is a button that never finishes on a phone. Under the finger a plane of the partner colour rises from the baseline.",
  curveNote:
    "Firm. Medium stiffness, critical damping, which is plain ease-out. It spends its travel evenly instead of front-loading it, so the duration carries more of the feel than it would under a curve that arrives early.",
  partner:
    "The rise colour is the fill's tonal partner rather than its opposite: ink pairs with moss, bone pairs with sand. The label therefore never changes colour mid-gesture, which removes the only thing the current button has to gate behind reduced motion.",
  duration: "Duration",
  durationLead:
    "The open question. Same curve, same distance, four durations.",
  coupling: "Label coupling",
  couplingLead:
    "The plane is clipped by the button, so an overshoot on it cannot be seen: a curve that passes scaleY(1) just arrives early and holds against the top edge. The label is not clipped, which makes it the only place in the gesture where a spring survives.",
};

export const RISE_DURATIONS: RiseDuration[] = [
  {
    id: "280",
    ms: "280ms",
    note: "Quick enough that the curve stops being the point. Take this one if Firm read as slow rather than as calm.",
  },
  {
    id: "360",
    ms: "360ms",
    note: "Roughly where Firm matches the perceived speed of a front-loaded curve at 420ms, which buys its quickness in the first fifth where Firm has none to spend.",
  },
  {
    id: "440",
    ms: "440ms",
    note: "Visible travel, and still clear of the finger on an ordinary tap. The default the rows above and below are set to.",
  },
  {
    id: "560",
    ms: "560ms",
    note: "Slow enough to watch on purpose. Considered on the closing panel, lag on a header call to action.",
  },
];

export const RISE_COUPLINGS: RiseCoupling[] = [
  {
    id: "none",
    name: "Plane only",
    note: "The fill arrives and nothing moves. The honest baseline for whether the rest of this is worth its complexity.",
    lift: "0px",
    liftDelay: "0ms",
  },
  {
    id: "lift",
    name: "Sprung",
    note: "The label lifts two pixels as the plane passes under it, on a lightly damped curve that overshoots and settles.",
    lift: "-2px",
    liftDelay: "0ms",
  },
  {
    id: "lag",
    name: "Lagged",
    note: "The same lift started seventy milliseconds later. That delay is the whole difference between the plane appearing to push the label and the two appearing to be wired together.",
    lift: "-2px",
    liftDelay: "70ms",
  },
];
