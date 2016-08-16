var fs = require('fs')
var jsonschema = require('jsonschema')

/**
 * Read a file and parse contents as JSON.
 * @param  {string} filename
 * @param  {Function} cb Callback
 */
function read (filename, cb) {
  fs.readFile(filename, 'utf8', function (err, str) {
    if (err) return cb(err)
    try {
      var data = JSON.parse(str)
      cb(null, data)
    } catch (e) {
      cb(e)
    }
  })
}

/**
 * Validate an object (instance) against a schema
 * @param  {string} filename
 * @param  {object} instance
 * @param  {object} schema
 * @return {bool} true if passed validation.
 */
function validate (filename, instance, schema) {
  var errors = jsonschema.validate(instance, schema).errors
  if (!errors.length) return true
  console.error(filename + ': ')
  errors.forEach(function (error) {
    if (error.property) {
      console.error(error.property + ' ' + error.message)
    } else {
      console.error(error)
    }
  })
  return false
}

function stripLeadingUnderscores (str) {
  return str.split('/').map(function (s) { return s.replace(/^_/, '') }).join('/')
}

module.exports = {
  read: read,
  validate: validate,
  stripLeadingUnderscores: stripLeadingUnderscores
}
