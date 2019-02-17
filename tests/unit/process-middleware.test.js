/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const { processMiddleware } = require('../../lib')
const middleware = require('../../lib').middleware

const req = { headers: { host: 'example.com' } }
const permissions = {
  create: {
    result: true,
    enforce: false
  },
  read: {
    result: false,
    enforce: true
  }
}
const permObjs = [
  {
    middleware: 'onDomain',
    params: ['example.com'],
    result: false,
    enforce: true
  },
  {
    result: true,
    enforce: false
  }
]

registerSuite('process-middleware', {
  'processes middleware on given permissions' () {
    processMiddleware(req, permissions, 'create', permObjs, middleware)
    assert.isFalse(permissions.create.result)
    assert.isTrue(permissions.create.enforce)
    assert.isFalse(permissions.read.result)
    assert.isTrue(permissions.read.enforce)
  }
})
