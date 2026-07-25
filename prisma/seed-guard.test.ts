import assert from "node:assert/strict";
import test from "node:test";
import { assertDestructiveSeedAllowed } from "./seed-guard";

test("seed guard refuses production even with explicit authorization", () => {
  assert.throws(
    () =>
      assertDestructiveSeedAllowed({
        NODE_ENV: "production",
        ALLOW_DESTRUCTIVE_SEED: "true",
      }),
    /disabled in production/
  );
});

test("seed guard refuses non-production without explicit authorization", () => {
  assert.throws(
    () => assertDestructiveSeedAllowed({ NODE_ENV: "development" }),
    /ALLOW_DESTRUCTIVE_SEED=true/
  );
});

test("seed guard permits explicitly authorized non-production seeding", () => {
  assert.doesNotThrow(() =>
    assertDestructiveSeedAllowed({
      NODE_ENV: "development",
      ALLOW_DESTRUCTIVE_SEED: "true",
    })
  );
});
