"use strict";

const MapOfValueKeys = require("./map-of-value-keys");
import test from "ava";

test("basic", t => {
  const objKey = { a: "a" };
  const duplicateKey = { a: "a" };
  const duplicateKeyButNeverAdded = { a: "a" };
  const value = "value";

  // Empty.

  const plainMap = new Map();
  const mapOfValueKeys = new MapOfValueKeys();
  mapOfValueKeys.retainOrginalReferences();

  t.is(plainMap.size, 0);
  t.is(mapOfValueKeys.size, 0);

  t.deepEqual(plainMap.has(objKey), false);
  t.deepEqual(plainMap.get(objKey), undefined);
  t.deepEqual(mapOfValueKeys.has(objKey), false);
  t.deepEqual(mapOfValueKeys.get(objKey), undefined);

  t.deepEqual(plainMap.has(duplicateKey), false);
  t.deepEqual(plainMap.get(duplicateKey), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKey), false);
  t.deepEqual(mapOfValueKeys.get(duplicateKey), undefined);

  t.deepEqual(plainMap.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(plainMap.get(duplicateKeyButNeverAdded), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(mapOfValueKeys.get(duplicateKeyButNeverAdded), undefined);

  // One entry.

  plainMap.set(objKey, value);
  mapOfValueKeys.set(objKey, value);

  t.is(plainMap.size, 1);
  t.is(mapOfValueKeys.size, 1);

  t.deepEqual(plainMap.has(objKey), true);
  t.deepEqual(plainMap.get(objKey), value);
  t.deepEqual(mapOfValueKeys.has(objKey), true);
  t.deepEqual(mapOfValueKeys.get(objKey), value);

  t.deepEqual(plainMap.has(duplicateKey), false);
  t.deepEqual(plainMap.get(duplicateKey), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKey), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKey), value);

  t.deepEqual(plainMap.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(plainMap.get(duplicateKeyButNeverAdded), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKeyButNeverAdded), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKeyButNeverAdded), value);

  // Add the same key twice.

  plainMap.set(objKey, value);
  mapOfValueKeys.set(objKey, value);

  t.is(plainMap.size, 1);
  t.is(mapOfValueKeys.size, 1);

  t.deepEqual(plainMap.has(objKey), true);
  t.deepEqual(plainMap.get(objKey), value);
  t.deepEqual(mapOfValueKeys.has(objKey), true);
  t.deepEqual(mapOfValueKeys.get(objKey), value);

  t.deepEqual(plainMap.has(duplicateKey), false);
  t.deepEqual(plainMap.get(duplicateKey), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKey), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKey), value);

  t.deepEqual(plainMap.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(plainMap.get(duplicateKeyButNeverAdded), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKeyButNeverAdded), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKeyButNeverAdded), value);

  // Add another key with same value.

  plainMap.set(duplicateKey, value);
  mapOfValueKeys.set(duplicateKey, value);

  t.is(plainMap.size, 2);
  t.is(mapOfValueKeys.size, 1);

  t.deepEqual(plainMap.has(objKey), true);
  t.deepEqual(plainMap.get(objKey), value);
  t.deepEqual(mapOfValueKeys.has(objKey), true);
  t.deepEqual(mapOfValueKeys.get(objKey), value);

  t.deepEqual(plainMap.has(duplicateKey), true);
  t.deepEqual(plainMap.get(duplicateKey), value);
  t.deepEqual(mapOfValueKeys.has(duplicateKey), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKey), value);

  t.deepEqual(plainMap.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(plainMap.get(duplicateKeyButNeverAdded), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKeyButNeverAdded), true);
  t.deepEqual(mapOfValueKeys.get(duplicateKeyButNeverAdded), value);

  // originalReferences functionality.

  t.deepEqual(mapOfValueKeys.keys().next().value, JSON.stringify(objKey));
  t.deepEqual(mapOfValueKeys.originalReferences.values().next().value, objKey);

  // Delete duplicate value.

  plainMap.delete(duplicateKey);
  mapOfValueKeys.delete(duplicateKey);

  t.is(plainMap.size, 1);
  t.is(mapOfValueKeys.size, 0);

  t.deepEqual(plainMap.has(objKey), true);
  t.deepEqual(plainMap.get(objKey), value);
  t.deepEqual(mapOfValueKeys.has(objKey), false);
  t.deepEqual(mapOfValueKeys.get(objKey), undefined);

  t.deepEqual(plainMap.has(duplicateKey), false);
  t.deepEqual(plainMap.get(duplicateKey), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKey), false);
  t.deepEqual(mapOfValueKeys.get(duplicateKey), undefined);

  t.deepEqual(plainMap.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(plainMap.get(duplicateKeyButNeverAdded), undefined);
  t.deepEqual(mapOfValueKeys.has(duplicateKeyButNeverAdded), false);
  t.deepEqual(mapOfValueKeys.get(duplicateKeyButNeverAdded), undefined);
});

test("json", t => {
  const mapOfValueKeys = new MapOfValueKeys();

  mapOfValueKeys.set("key", "value");

  t.deepEqual(mapOfValueKeys.jsonObj(), { key: "value" });
});
