import test from "node:test";
import assert from "node:assert/strict";
import { visibleLen } from "../src/ansi";

test("visibleLen strips ANSI escape sequences", () => {
  assert.equal(visibleLen("\x1b[32mCtx\x1b[0m 12%"), 7);
});
