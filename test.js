'use strict'

var tap = require('tap')
var AsyncValue = require('./')

tap.test('set in constructor', t => {
  var value = new AsyncValue('hello')

  value.get(value => {
    t.equal(value, 'hello')
    t.end()
  })
})

tap.test('get then sync set', t => {
  var value = new AsyncValue()

  value.get(value => {
    t.equal(value, 'hello')
    t.end()
  })

  value.set('hello')
})

tap.test('get then async set', t => {
  var value = new AsyncValue()

  value.get(value => {
    t.equal(value, 'hello')
    t.end()
  })

  setImmediate(() => {
    value.set('hello')
  })
})

tap.test('throw on non-function arguments to get', t => {
  var value = new AsyncValue()
  var types = [
    1,
    null,
    undefined,
    'string',
    /regex/,
    {},
    []
  ]
  types.forEach(type => {
    t.throws(() => value.get(type))
  })
  t.end()
})

tap.test('throw on multiple calls to set', t => {
  var value = new AsyncValue()
  value.set('first')
  t.throws(() => value.set('second'))
  t.end()
})
