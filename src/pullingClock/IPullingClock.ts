export interface IPullingClock {
  /** sets the time to 0 */
  reset(): void;

  /** increments the time */
  tick(): void;

  /** returns the current time */
  currentTime(): number;
}
