'use strict'

const { test } = require('tap')
const { XMLHttpRequest } = require('../..')
const { createServer } = require('http')

test('getters', (t) => {
  t.equal(XMLHttpRequest.prototype.UNSENT, 0)
  t.equal(XMLHttpRequest.prototype.OPENED, 1)
  t.equal(XMLHttpRequest.prototype.HEADERS_RECEIVED, 2)
  t.equal(XMLHttpRequest.prototype.LOADING, 3)
  t.equal(XMLHttpRequest.prototype.DONE, 4)

  const xhr = new XMLHttpRequest()
  t.equal(xhr.UNSENT, 0)
  t.equal(xhr.OPENED, 1)
  t.equal(xhr.HEADERS_RECEIVED, 2)
  t.equal(xhr.LOADING, 3)
  t.equal(xhr.DONE, 4)

  t.end()
})

test('readyState getter', (t) => {
  t.plan(5)

  const xhr = new XMLHttpRequest()
  let state = 0

  const server = createServer((req, res) => {
    res.end()
  }).listen(0, () => {
    // before a request is sent, readyState is 0
    t.equal(xhr.readyState, state++)

    xhr.addEventListener('readystatechange', () => {
      t.equal(xhr.readyState, state++)
    })

    xhr.open('GET', 'https://www.example.org/')
    xhr.send()
  })

  t.teardown(server.close.bind(server))
})
