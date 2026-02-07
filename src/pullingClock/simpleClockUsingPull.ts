import type { IPullingClock } from "./IPullingClock.ts";

export class SimpleClock implements IPullingClock {
  private _time = 0;
  reset() {
    this._time = 0;
  }
  tick() {
    this._time++;
  }
  currentTime() {
    return this._time;
  }
}

export class ClockClient {
  private _theClock: IPullingClock;
  constructor(theClock: IPullingClock) {
    this._theClock = theClock;
  }
  get time(): number {
    return this._theClock.currentTime();
  }
}
