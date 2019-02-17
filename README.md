# PersonaSpace Node.js Server ACL Middleware
[![CircleCI](https://circleci.com/gh/personaspace/node-server-acl-middleware/tree/master.svg?style=svg)](https://circleci.com/gh/personaspace/node-server-acl-middleware/tree/master)
[![codecov](https://codecov.io/gh/personaspace/node-server-acl-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/personaspace/node-server-acl-middleware)
[![Known Vulnerabilities](https://snyk.io/test/github/personaspace/node-server-acl-middleware/master/badge.svg?targetFile=package.json)](https://snyk.io/test/github/personaspace/node-server-acl-middleware/master?targetFile=package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A package containing default middleware and handling of middleware for PersonaSpace Node.js servers.

PersonaSpace uses a powerful ACL implementation that give an owner unparalleled control over which visitors can interact with their data, where visitors can access their data from, and when visitors can access it. `@personaspace/server-acl-middleware` contains the ACL middleware that can modify an ACL dynamically based on request data, date, time, etc...

*This package provides only the middleware ACLs. The [`@personaspace/server-acl`](https://github.com/personaspace/node-server-acl) package handles resolution of ACLs of a visitor's access to the data. The [`@personaspace/server-resource`](https://github.com/personaspace/node-server-resource) package handles validation of the visitor's access to the data.*

## Installation

Install `@personaspace/server-acl-middleware` using npm.
```
npm i @personaspace/server-acl-middleware
```

## Usage

```js
//  request is the web request on a PersonaSpace server.
const { resolveAcl } = require('@personaspace/server-acl')
const { middleware } = require('@personaspace/server-acl-middleware')
const resource = './ebntly/data/notes/test'
const identity = 'https://ebntly.personaspace.com'
const acl = require(`${resource}.json`)['@acl']
const defaultAcl = require('../support/default-acl.json')
const groups = require('../support/groups.json')

resolveAcl(resourcePath, request, identity, acl, defaultAcl, groups, middleware, (resultantPerms) => {
    //  Check resultantPerms
})
```

## Contributing to PersonaSpace
PersonaSpace is a large project and [contributors](https://github.com/personaspace/node-server-acl-middleware/blob/master/CONTRIBUTORS.md) are welcome. Thank you for your support and efforts!

There are a lot of ways to contribute:

* [Create a new issue](https://github.com/personaspace/node-server-acl-middleware/issues/new) to report bugs or request features
* [Fix an issue](https://github.com/personaspace/node-server-acl-middleware/issues)

Be sure to look at [CONTRIBUTING.md](https://github.com/personaspace/node-server-acl-middleware/blob/master/CONTRIBUTING.md).

## License
PersonaSpace is licensed under [the MIT License](https://github.com/personaspace/node-server-acl-middleware/blob/master/LICENSE).
