const read = require('./utils').read
const validate = require('./utils').validate
const defaultsSchema = require('../schema/defaults.json')

module.exports = function generateDefaults (file, cb) {
  read(file, function (err, defaults) {
    if (err) {
      console.warn('Warning: no defaults.json file found')
      return cb(null)
    }
    if (!validate(file, defaults, defaultsSchema)) {
      return cb(new Error(file + ': Field structure is invalid'))
    }
    cb(null, defaults)
  })
}
