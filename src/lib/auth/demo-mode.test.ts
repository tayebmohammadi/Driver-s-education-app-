import assert from "node:assert/strict";
import test from "node:test";
import { isDemoAutoLoginEnabled } from "./demo-mode";
import { getConfiguredDemoStudentEmail } from "./demo-student";

test("production denies demo auto-login when the flag is absent", () => {
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "production",
      DEMO_STUDENT_EMAIL: "demo@example.com",
    }),
    false
  );
});

test("production denies demo auto-login even when explicitly enabled", () => {
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "production",
      ENABLE_DEMO_AUTO_LOGIN: "true",
      DEMO_STUDENT_EMAIL: "demo@example.com",
    }),
    false
  );
});

test("non-production denies demo auto-login when the flag is absent or false", () => {
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "development",
      DEMO_STUDENT_EMAIL: "demo@example.com",
    }),
    false
  );
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "development",
      ENABLE_DEMO_AUTO_LOGIN: "false",
      DEMO_STUDENT_EMAIL: "demo@example.com",
    }),
    false
  );
});

test("non-production denies demo auto-login without an explicit email", () => {
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "development",
      ENABLE_DEMO_AUTO_LOGIN: "true",
    }),
    false
  );
  assert.equal(
    getConfiguredDemoStudentEmail({ NODE_ENV: "development" }),
    null
  );
});

test("non-production enables demo auto-login only with flag and explicit email", () => {
  assert.equal(
    isDemoAutoLoginEnabled({
      NODE_ENV: "development",
      ENABLE_DEMO_AUTO_LOGIN: "true",
      DEMO_STUDENT_EMAIL: "demo@example.com",
    }),
    true
  );
});
