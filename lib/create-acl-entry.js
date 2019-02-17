const createAclEntry = (name, formValues, middleware, { enforce = false, result = false } = {}) => {
  return {
    middleware: name,
    params: middleware.writeParams.map(param => param(formValues, middleware.form)),
    result,
    enforce
  }
}

module.exports = createAclEntry
