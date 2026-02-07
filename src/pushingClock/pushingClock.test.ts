import { describe, expect, test } from "vitest";
import { PushingClock } from "./pushingClock.ts";
import { PushingClockClient, DifferentClockClient } from "./pushingClockClients.ts";

describe("tests of observed clock", () => {
  test("single observer", () => {
    const clock1 = new PushingClock();
    const observer1 = new PushingClockClient(clock1);
    expect(observer1.time).toBe(0);
    clock1.tick();
    clock1.tick();
    expect(observer1.time).toBe(2);
  });

  test("test of DifferentClockClient", () => {
    const clock1 = new PushingClock();
    const observer1 = new DifferentClockClient(clock1);
    expect(observer1.time).toBe(0);
    clock1.tick();
    expect(observer1.time).toBe(1);
    clock1.tick();
    expect(observer1.time).toBe(2);
  });

  test("DifferentClockClient reports the time correctly", () => {
    const clock1 = new PushingClock();
    clock1.tick();
    const differentClient = new DifferentClockClient(clock1);
    expect(differentClient.time).toBe(1);
    clock1.tick();
    expect(differentClient.time).toBe(2);
    clock1.tick();
    expect(differentClient.time).toBe(3);
  });

  test("DifferentClockClient accumulates the times correctly", () => {
    const clock1 = new PushingClock();
    clock1.tick();
    const differentClient = new DifferentClockClient(clock1);
    expect(differentClient.time).toBe(1);
    expect(differentClient.notifications).toEqual([]);
    clock1.tick();
    clock1.tick();
    clock1.tick();
    expect(differentClient.time).toBe(4);
    expect(differentClient.notifications).toEqual([2, 3, 4]);
  });

  test("Multiple Observers", () => {
    const clock1 = new PushingClock();
    const observer1 = new DifferentClockClient(clock1);
    const observer2 = new PushingClockClient(clock1);
    const observer3 = new PushingClockClient(clock1);
    clock1.tick();
    clock1.tick();
    expect(observer1.time).toBe(2);
    expect(observer2.time).toBe(2);
    expect(observer3.time).toBe(2);
  });
});
