/**
 * Wizard dome / background tuning.
 *
 * Top area uses wizard-dome where the background circle does not reach.
 * The circle creates a natural curved edge without a rectangular clip.
 */
export const wizardDomeConfig = {
  /** Toggle the dotted background overlay */
  showDotPattern: false,

  /** Content offset from the top of the page (px) */
  contentPaddingTop: 8,

  /**
   * Large background circle — rendered below the dot pattern.
   * Keep the center below the top arc so the upper edge stays curved.
   */
  blackCircle: {
    diameter: 900,
    /** Vertical center of the circle from the top of the page (px) */
    centerY: 490,
  },

  /** Decorative background logo (bg-logo-tr.png) — scales from top-right */
  logoBgTr: {
    top: 100,
    right: 0,
    width: 430,
    scale: 1.6,
  },
} as const
