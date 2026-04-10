import { beforeEach, expect, test, vi } from "vitest";
import { TranscriptDB } from "./transcript.service.ts";

let db: TranscriptDB;
beforeEach(() => {
  db = new TranscriptDB();
});

test("addStudent should add a student to the database", () => {
  expect(db.nameToIDs("blair")).toEqual([]);
  const id1 = db.addStudent("blair");
  expect(db.nameToIDs("blair")).toEqual([id1]);
});

/** Returns true half the time, otherwise false */
function coinFlip() {
  return Math.random() >= 0.5;
}

test("coinFlip should call Math.random", () => {
  const spyRandom = vi.spyOn(Math, "random");
  coinFlip();
  expect(spyRandom).toHaveBeenCalled();
  expect(spyRandom).toHaveBeenCalledTimes(1);
});

test("coinFlip notices Math.random's output", () => {
  const spyRandom = vi.spyOn(Math, "random");
  spyRandom.mockImplementationOnce(() => 0.9);
  expect(coinFlip()).toBe(true);
  spyRandom.mockImplementationOnce(() => 0.1);
  expect(coinFlip()).toBe(false);
});

/**
 * @param randomSource - randomness source
 * @returns true if randomSource returns >= 0.5
 */
function coinFlip2(randomSource: () => number) {
  return randomSource() >= 0.5;
}

test("coinFlip2 uses the randomness source", () => {
  expect(coinFlip2(() => 0.9)).toBe(true);
  expect(coinFlip2(() => 0.1)).toBe(false);
});

test("a simple mock", () => {
  const myMock = vi.fn();
  expect(myMock(104)).toBeUndefined();
  expect(myMock("Hello", "you")).toBeUndefined();
  expect(myMock.mock.calls).toEqual([[104], ["Hello", "you"]]);
});

/** Greets the person whose name is passed via console.log */
function sayHello(name: string) {
  console.log(`Hello, ${name}`);
}

test("sayHello prints a greeting", () => {
  const spyLog = vi.spyOn(console, "log");
  spyLog.mockImplementation(() => {});
  sayHello("CS4530");

  // One way of checking the input
  expect(spyLog.mock.calls).toEqual([["Hello, CS4530"]]);

  // Equivalent check in this case
  expect(spyLog).toHaveBeenCalledExactlyOnceWith(`Hello, CS4530`);
});
