import { expect, test } from "vitest";
import { SimpleClock, ClockClient } from "./simpleClockUsingPull.ts";

test("test of SimpleClock", () => {
  const clock1 = new SimpleClock();
  expect(clock1.currentTime()).toBe(0);
  clock1.tick();
  clock1.tick();
  expect(clock1.currentTime()).toBe(2);
  clock1.reset();
  expect(clock1.currentTime()).toBe(0);
});

test("test that clocks are independent", () => {
  const clock1 = new SimpleClock();
  const clock2 = new SimpleClock();
  expect(clock1.currentTime()).toBe(0);
  expect(clock2.currentTime()).toBe(0);
  clock1.tick();
  clock1.tick();
  clock1.tick();
  expect(clock1.currentTime()).toBe(3);
  expect(clock2.currentTime()).toBe(0);
  clock2.tick();
  clock2.tick();
  expect(clock1.currentTime()).toBe(3);
  expect(clock2.currentTime()).toBe(2);
  clock1.reset();
  expect(clock1.currentTime()).toBe(0);
  expect(clock2.currentTime()).toBe(2);
});

test("test of ClockClient", () => {
  const clock1 = new SimpleClock();
  expect(clock1.currentTime()).toBe(0);
  const client1 = new ClockClient(clock1);
  expect(clock1.currentTime()).toBe(0);
  expect(client1.time).toBe(0);
  clock1.tick();
  clock1.tick();
  expect(client1.time).toBe(2);
});
