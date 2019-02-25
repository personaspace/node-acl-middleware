import { onDomain } from "@personaspace/server-acl-middleware-ondomain";
import intern from "intern";
import { createACLEntry } from "../../src";
const { registerSuite } = intern.getPlugin("interface.object");
const { assert } = intern.getPlugin("chai");

registerSuite("create-acl-entry", {
  "creates the ACL entry for the ACL item (default enforce, result)"() {
    const aclEntry = createACLEntry(onDomain, ["example.com"]);
    assert.equal(aclEntry.middleware, "onDomain");
    assert.isFalse(aclEntry.result);
    assert.isFalse(aclEntry.enforce);
    assert.isNotEmpty(aclEntry.params);
    assert.equal(aclEntry.params ? aclEntry.params[0] : "", "example.com");
  },
  "creates the ACL entry for the ACL item (defined enforce)"() {
    const aclEntry = createACLEntry(onDomain, ["example.com"], undefined, true);
    assert.equal(aclEntry.middleware, "onDomain");
    assert.isFalse(aclEntry.result);
    assert.isTrue(aclEntry.enforce);
    assert.equal(aclEntry.params ? aclEntry.params[0] : "", "example.com");
  },
  "creates the ACL entry for the ACL item (defined result)"() {
    const aclEntry = createACLEntry(onDomain, ["example.com"], true);
    assert.equal(aclEntry.middleware, "onDomain");
    assert.isTrue(aclEntry.result);
    assert.isFalse(aclEntry.enforce);
    assert.equal(aclEntry.params ? aclEntry.params[0] : "", "example.com");
  },
  "creates the ACL entry for the ACL item (defined enforce, result)"() {
    const aclEntry = createACLEntry(onDomain, ["example.com"], true, true);
    assert.equal(aclEntry.middleware, "onDomain");
    assert.isTrue(aclEntry.result);
    assert.isTrue(aclEntry.enforce);
    assert.equal(aclEntry.params ? aclEntry.params[0] : "", "example.com");
  },
});
