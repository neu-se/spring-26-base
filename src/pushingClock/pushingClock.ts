import type { IPushingClock, IPushingClockListener } from "./IPushingClock.ts";

export class PushingClock implements IPushingClock {
  private _time = 0;
  private _observers: IPushingClockListener[] = [];
  private _notifyAll() {
    this._observers.forEach((observer) => observer(this._time));
  }

  reset() {
    this._time = 0;
    this._notifyAll();
  }

  tick() {
    this._time += 1;
    this._notifyAll();
  }

  addListener(observer: IPushingClockListener) {
    this._observers.push(observer);
  }

  currentTime() {
    return this._time;
  }
}
