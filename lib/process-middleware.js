const processMiddleware = (req, permissions, key, permObjs, middleware, asArray = false, i = 0) => {
  permissions[key] = permissions[key] || {
    result: false,
    enforce: false
  }
  let result
  let enforce
  let p = permissions[key]
  if (Array.isArray(permObjs) && !asArray) {
    processMiddleware(req, permissions, key, permObjs, middleware, true, i)
  } else if (asArray) {
    let perm = permObjs[i]
    if (typeof perm.middleware === 'string') {
      const mw = middleware[perm.middleware]
      if (!mw || typeof mw.exec !== 'function') throw new Error(`${perm.middleware} is not valid permissions middleware.`)
      if (mw.exec.apply(null, [req, ...(perm.params || [])])) {
        let newResult = !!perm.result
        result = !!(p.enforce ? perm.enforce ? newResult : p.result : newResult)
        enforce = p.enforce ? true : !!perm.enforce
        permissions[key] = { result, enforce }
      }
      if (i < permObjs.length - 1) {
        processMiddleware(req, permissions, key, permObjs, middleware, true, ++i)
      }
    }
  } else if (typeof permObjs === 'object') {
    let perm = permObjs
    if (typeof perm.middleware === 'string') {
      const mw = middleware[perm.middleware]
      if (!mw || typeof mw.middleware !== 'function') throw new Error(`${perm.middleware} is not valid permissions middleware.`)
      if (mw.middleware.apply(null, [req, ...(perm.params || [])])) {
        let newResult = !!perm.result
        result = !!(p.enforce ? perm.enforce ? newResult : p.result : newResult)
        enforce = p.enforce ? true : !!perm.enforce
        permissions[key] = { result, enforce }
      }
      if (i !== permObjs.length - 1) {
        processMiddleware(req, permissions, key, permObjs, middleware, true, ++i)
      }
    }
  }
}

module.exports = processMiddleware
