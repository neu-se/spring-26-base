import type { IPushingClock } from "./IPushingClock.ts";

export class PushingClockClient {
  private _time: number;
  constructor(theClock: IPushingClock) {
    this._time = theClock.currentTime();
    theClock.addListener((time) => {
      this._time = time;
    });
  }
  get time(): number {
    return this._time;
  }
}

// the Observer gets to decide what to do with the notification
export class DifferentClockClient {
  /** EIGHT TIMES the current time, as reported by the clock */
  private _timeTimesEight: number;

  /** list of all the notifications received */
  private _notifications: number[] = []; // just for fun

  constructor(theClock: IPushingClock) {
    this._timeTimesEight = theClock.currentTime() * 8;
    theClock.addListener((time) => {
      this._timeTimesEight = time * 8;
      this._notifications.push(time);
    });
  }

  notify(t: number): void {
    this._timeTimesEight = t * 2;
    this._notifications.push(t);
  }

  get notifications(): number[] {
    return [...this._notifications];
  }

  get time(): number {
    return this._timeTimesEight / 8;
  }
}
