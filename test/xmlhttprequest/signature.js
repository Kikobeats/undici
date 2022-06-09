/* eslint no-unused-expressions: 0 */

'use strict'

const { test } = require('tap')
const { XMLHttpRequest } = require('../..')

test('argument length & function name', (t) => {
  t.equal(XMLHttpRequest.prototype.open.length, 2)
  t.equal(XMLHttpRequest.prototype.open.name, 'open')

  t.equal(XMLHttpRequest.prototype.setRequestHeader.length, 2)
  t.equal(XMLHttpRequest.prototype.setRequestHeader.name, 'setRequestHeader')

  t.equal(XMLHttpRequest.prototype.send.length, 0)
  t.equal(XMLHttpRequest.prototype.send.name, 'send')

  t.equal(XMLHttpRequest.prototype.abort.length, 0)
  t.equal(XMLHttpRequest.prototype.abort.name, 'abort')

  t.equal(XMLHttpRequest.prototype.getResponseHeader.length, 1)
  t.equal(XMLHttpRequest.prototype.getResponseHeader.name, 'getResponseHeader')

  t.equal(XMLHttpRequest.prototype.getAllResponseHeaders.length, 0)
  t.equal(XMLHttpRequest.prototype.getAllResponseHeaders.name, 'getAllResponseHeaders')

  t.equal(XMLHttpRequest.prototype.overrideMimeType.length, 1)
  t.equal(XMLHttpRequest.prototype.overrideMimeType.name, 'overrideMimeType')

  t.end()
})

test('illegal invocation', (t) => {
  t.throws(() => {
    XMLHttpRequest.prototype.open.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.setRequestHeader.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.send.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.abort.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.getResponseHeader.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.getAllResponseHeaders.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.overrideMimeType.call()
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.readyState
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.timeout
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.withCredentials
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.upload
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.responseURL
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.status
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.statusText
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.responseType
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.response
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.responseText
  }, TypeError('illegal invocation'))

  t.throws(() => {
    XMLHttpRequest.prototype.responseXML
  }, TypeError('illegal invocation'))

  t.end()
})
