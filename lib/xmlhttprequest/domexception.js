'use strict'

/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

let domException = globalThis.DOMException

if (!domException) {
  try {
    const { MessageChannel } = require('worker_threads')
    const port = new MessageChannel().port1
    const ab = new ArrayBuffer()
    port.postMessage(ab, [ab, ab])
  } catch (err) {
    if (err.constructor.name === 'DOMException') {
      domException = err.constructor
    }
  }
}

module.exports = {
  DOMException: domException
}
