import type { IPullingClock } from "../pullingClock/IPullingClock.ts";

class PrivateClock implements IPullingClock {
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

let privateClock: null | IPullingClock = null;
export function clockInstance(): IPullingClock {
  if (!privateClock) {
    privateClock = new PrivateClock();
  }
  return privateClock;
}
