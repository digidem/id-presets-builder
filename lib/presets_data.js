var path = require('path')
var glob = require('glob')
var runParallel = require('run-parallel')
var read = require('./utils').read
var validate = require('./utils').validate
var stripLeadingUnderscores = require('./utils').stripLeadingUnderscores
var presetSchema = require('../schema/preset')

module.exports = function generatePresetsData (dir, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  presetSchema.additionalProperties =
    presetSchema.additionalProperties || (opts && opts.additionalProperties)
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length)
      console.warn('Warning: no preset json files found in', dir)
    var presets = {}
    var tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, presetSchema)) {
            return cb(new Error(file + ': Field structure is invalid'))
          }
          var id = stripLeadingUnderscores(file.match(/([^.]*)\.json/)[1])
          presets[id] = field
          cb()
        })
      }
    })
    runParallel(tasks, function (err) {
      if (err) return cb(err)
      cb(null, presets)
    })
  })
}
