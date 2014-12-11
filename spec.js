var assert = require('assert');
var except = require('./');

describe('except', function() {
  it('returns empty object if first argument is null', function() {
    assert.deepEqual(except(null, 'foo'), {});
  });

  it('removes nothing if no exclude key given', function() {
    assert.deepEqual(except({ foo: 1, bar: 2, baz: 3 }, null), { foo: 1, bar: 2, baz: 3 });
  });

  it('can remove a single property', function() {
    assert.deepEqual(except({ foo: 1, bar: 2, baz: 3 }, 'baz'), { foo: 1, bar: 2 });
  });

  it('can remove several properties', function() {
    assert.deepEqual(except({ foo: 1, bar: 2, baz: 3 }, 'foo', 'baz'), { bar: 2 });
  });

  it('can remove properties given as array', function() {
    assert.deepEqual(except({ foo: 1, bar: 2, baz: 3 }, ['foo', 'baz']), { bar: 2 });
  });

  it('can remove prototype properties', function() {
    var Obj = function() {};
    Obj.prototype = { foo: 1, bar: 2, baz: 3 };
    assert.deepEqual(except(new Obj(), 'bar'), { foo: 1, baz: 3 });
  });
});
