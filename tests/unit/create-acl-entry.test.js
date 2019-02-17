/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const { createAclEntry } = require('../../lib')
const { onDomain } = require('../../lib').middleware

registerSuite('create-acl-entry', {
  'creates the ACL entry for the ACL item (default enforce, result)' () {
    const aclEntry = createAclEntry('onDomain', ['example.com'], onDomain)
    assert.equal(aclEntry.middleware, 'onDomain')
    assert.isFalse(aclEntry.result)
    assert.isFalse(aclEntry.enforce)
    assert.equal(aclEntry.params[0], 'example.com')
  },
  'creates the ACL entry for the ACL item (defined enforce)' () {
    const aclEntry = createAclEntry('onDomain', ['example.com'], onDomain, { enforce: true })
    assert.equal(aclEntry.middleware, 'onDomain')
    assert.isFalse(aclEntry.result)
    assert.isTrue(aclEntry.enforce)
    assert.equal(aclEntry.params[0], 'example.com')
  },
  'creates the ACL entry for the ACL item (defined result)' () {
    const aclEntry = createAclEntry('onDomain', ['example.com'], onDomain, { result: true })
    assert.equal(aclEntry.middleware, 'onDomain')
    assert.isTrue(aclEntry.result)
    assert.isFalse(aclEntry.enforce)
    assert.equal(aclEntry.params[0], 'example.com')
  },
  'creates the ACL entry for the ACL item (defined enforce, result)' () {
    const aclEntry = createAclEntry('onDomain', ['example.com'], onDomain, { enforce: true, result: true })
    assert.equal(aclEntry.middleware, 'onDomain')
    assert.isTrue(aclEntry.result)
    assert.isTrue(aclEntry.enforce)
    assert.equal(aclEntry.params[0], 'example.com')
  }
})
