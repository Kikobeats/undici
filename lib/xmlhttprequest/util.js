'use strict'

/**
 * @see https://fetch.spec.whatwg.org/#header-value
 * @param {string} value
 */
function isValidHeaderValue (value) {
  // see: https://chromium.googlesource.com/chromium/src/+/7d15b7fc471b33e2d52a45876cb8323a4fb0e780/third_party/WebKit/Source/platform/network/HTTPParsers.cpp#224
  return (
    containsOnlyLatin1(value) &&
    !value.includes('\r') &&
    !value.includes('\n') &&
    !value.includes('\0')
  )
}

/**
 * @param {string} string
 */
function containsOnlyLatin1 (string) {
  for (let i = 0; i < string.length; i++) {
    const byte = string.charCodeAt(i)
    if (byte > 255) {
      return false
    }
  }

  return true
}

/**
 * @see https://mimesniff.spec.whatwg.org/#serialize-a-mime-type
 */
function serializeMimeType (mimeType) {
  // 1. Let serialization be the concatenation of mimeType’s type,
  //    U+002F (/), and mimeType’s subtype.
  let serialization = `${mimeType.type}/${mimeType.subtype}`

  // 2. For each name → value of mimeType’s parameters:
  for (let [name, value] of mimeType.parameters) {
    // 1. Append U+003B (;) to serialization.
    serialization += ';'

    // 2. Append name to serialization.
    serialization += name

    // 3. Append U+003D (=) to serialization.
    serialization += '='

    // 4. If value does not solely contain HTTP token code points or
    //    value is the empty string, then:
    if (value.length === 0 || !/^[!#$%&'*+-.^_|~A-z0-9]+$/.test(value)) {
      // 1. Precede each occurence of U+0022 (") or U+005C (\) in
      //    value with U+005C (\).
      value = value.replace(/("|\\)/g, '\\$1')

      // 2. Prepend U+0022 (") to value.
      // 3. Append U+0022 (") to value.
      value = `"${value}"`
    }

    // 5. Append value to serialization.
    serialization += value
  }

  // 3. Return serialization.
  return serialization
}

/**
 * @see https://fetch.spec.whatwg.org/#header-list-extract-a-length
 */
function extractLengthFromHeadersList (headers) {
  const header = headers.get('content-length')

  if (header === null) {
    return null
  }

  // 1. Let values be the result of getting, decoding, and
  //    splitting `Content-Length` from headers.
  const values = header.split(',').map(value => value.trim())

  // 2. If values is null, then return null.

  // 3. Let candidateValue be null.
  let candidateValue = null

  // 4. For each value of values:
  for (const value of values) {
    // 1. If candidateValue is null, then set candidateValue to value.
    if (candidateValue === null) {
      candidateValue = value
    } else if (value !== candidateValue) {
      // 2. Otherwise, if value is not candidateValue, return failure.
      return 'failure'
    }
  }

  // 5. If candidateValue is the empty string or has a code point that
  //    is not an ASCII digit, then return null.
  if (candidateValue.length === 0 || !/^[0-9]+$/.test(candidateValue)) {
    return null
  }

  // 6. Return candidateValue, interpreted as decimal number.
  return Number(candidateValue)
}

module.exports = {
  isValidHeaderValue,
  serializeMimeType,
  extractLengthFromHeadersList
}
