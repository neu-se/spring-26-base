export type IPushingClockListener = (time: number) => void;

export interface IPushingClock {
  /** increments the time, notifies consumers of the new time */
  tick(): void;

  /** resets the time to 0 */
  reset(): void;

  /** returns the current time */
  currentTime(): number;

  /** adds a new consumer */
  addListener(listener: IPushingClockListener): void;
}
