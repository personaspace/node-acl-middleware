module.exports = {
  name: 'Domain',
  exec (req, domain) {
    return req.headers.host === domain
  },
  description: 'Checks the domain that a visitor is visiting from.',
  form: [
    {
      label: 'Domain name',
      type: 'text',
      description: 'Enter the domain name to allow/disallow requests from.',
      validate: /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/,
      examples: [
        'example.com'
      ]
    }
  ],
  writeParams: [
    (formValues) => {
      return formValues[0]
    }
  ]
}
