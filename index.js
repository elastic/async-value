'use strict'

const assert = require('assert')

module.exports = class AsyncValue {
  constructor(value) {
    this.value = value
    this.callbacks = []
  }

  get(callback) {
    assert(typeof callback === 'function', 'slot callback must be a function')
    if (typeof this.value !== 'undefined') {
      callback(this.value)
    } else {
      this.callbacks.push(callback)
    }
  }

  set(value) {
    assert(typeof this.value === 'undefined', 'slot value can only be set once')
    for (let callback of this.callbacks) {
      callback(value)
    }
    this.callbacks = null
    this.value = value
  }
}
