import { onDomain } from "@personaspace/server-acl-middleware-ondomain";
import intern from "intern";
import { processMiddleware } from "../../src";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");

const req = { headers: { host: "example.com" } };
const permissions = {
  create: {
    enforce: false,
    result: true,
  },
  read: {
    enforce: true,
    result: false,
  },
};
const permObjs = [
  {
    enforce: true,
    middleware: "onDomain",
    params: ["example.com"],
    result: false,
  },
  {
    enforce: false,
    result: true,
  },
];

registerSuite("process-middleware", {
  "processes middleware on given permissions"() {
    processMiddleware(req, "create", permissions, permObjs, [onDomain]);
    assert.isFalse(permissions.create.result);
    assert.isTrue(permissions.create.enforce);
    assert.isFalse(permissions.read.result);
    assert.isTrue(permissions.read.enforce);
  },
});
