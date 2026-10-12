import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { except } from "./index.ts";

describe("except", function () {
  it("returns empty object if first argument is null", function () {
    deepEqual(except(null as any, "foo"), {});
  });

  it("removes nothing if no exclude key given", function () {
    deepEqual(except({ foo: 1, bar: 2, baz: 3 }, null as any), {
      foo: 1,
      bar: 2,
      baz: 3,
    });
  });

  it("can remove a single property", function () {
    deepEqual(except({ foo: 1, bar: 2, baz: 3 }, "baz"), { foo: 1, bar: 2 });
  });

  it("can remove several properties", function () {
    deepEqual(except({ foo: 1, bar: 2, baz: 3 }, "foo", "baz"), { bar: 2 });
  });

  it("can remove properties given as array", function () {
    deepEqual(except({ foo: 1, bar: 2, baz: 3 }, ["foo", "baz"]), { bar: 2 });
  });

  it("can remove properties given as mix of array and strings", function () {
    deepEqual(except({ foo: 1, bar: 2, baz: 3 }, "foo", ["baz"]), { bar: 2 });
  });

  it("can remove prototype properties", function () {
    var Obj = function () {};
    Obj.prototype = { foo: 1, bar: 2, baz: 3 };
    deepEqual(except(new (Obj as any)(), "bar"), { foo: 1, baz: 3 });
  });
});
