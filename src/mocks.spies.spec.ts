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

test("a simple mock", () => {
  const myMock = vi.fn();
  expect(myMock(104)).toBeUndefined();
  expect(myMock("Hello", "you")).toBeUndefined();
  expect(myMock.mock.calls).toEqual([[104], ["Hello", "you"]]);
});

function sayHello(name: string) {
  console.log(`Hello, ${name}`);
}

test("sayHello prints a greeting", () => {
  const spyLog = vi.spyOn(console, "log");
  spyLog.mockImplementation(() => {});
  sayHello("CS4530");
  expect(spyLog.mock.calls).toEqual([["Hello, CS4530"]]);
});
