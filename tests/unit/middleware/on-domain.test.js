/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')
const { onDomain } = require('../../../lib').middleware
const { exec, description, form, writeParams } = onDomain
registerSuite('middleware on-domain', {
  'test description' () {
    assert.equal(description, 'Checks the domain that a visitor is visiting from.')
  },
  'test exec' () {
    assert.isTrue(exec({ headers: { host: 'example.com' } }, 'example.com'))
    assert.isFalse(exec({ headers: { host: 'test.example.com' } }, 'example.com'))
  },
  'test form examples' () {
    form.forEach(input => {
      input.examples.forEach(ex => {
        assert.isTrue(input.validate.test(ex))
      })
    })
  },
  'test writeParams' () {
    let param = writeParams[0]
    assert.equal(param(['example.com']), 'example.com')
  }
})
