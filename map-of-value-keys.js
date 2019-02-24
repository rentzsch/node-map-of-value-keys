"use strict";

const valueOrJson = require("value-or-json");

class MapOfValueKeys extends Map {
  set(key, value) {
    const keyValue = valueOrJson(key);
    if (this.originalReferences) {
      this.originalReferences.set(keyValue, key);
    }
    return super.set(keyValue, value);
  }
  has(key) {
    return super.has(valueOrJson(key));
  }
  get(key) {
    return super.get(valueOrJson(key));
  }
  delete(key) {
    const keyValue = valueOrJson(key);
    if (this.originalReferences) {
      this.originalReferences.delete(keyValue);
    }
    return super.delete(keyValue);
  }
  retainOrginalReferences() {
    this.originalReferences = new Map();
  }
  jsonObj() {
    const result = Object.create(null);
    for (const key of this.keys()) {
      result[key] = this.get(key);
    }
    return result;
  }
}

module.exports = MapOfValueKeys;
