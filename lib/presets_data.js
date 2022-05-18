const path = require('path')
const glob = require('glob')
const runParallel = require('run-parallel')
const read = require('./utils').read
const validate = require('./utils').validate
const stripLeadingUnderscores = require('./utils').stripLeadingUnderscores
const presetSchema = require('../schema/preset')

module.exports = function generatePresetsData (dir, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  presetSchema.additionalProperties =
    presetSchema.additionalProperties || (opts && opts.additionalProperties)
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) { console.warn('Warning: no preset json files found in', dir) }
    const presets = {}
    const tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, presetSchema)) {
            return cb(new Error(file + ': Field structure is invalid'))
          }
          const id = stripLeadingUnderscores(file.match(/([^.]*)\.json/)[1])
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
