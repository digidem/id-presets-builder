const glob = require('glob')
const path = require('path')
const runParallel = require('run-parallel')
const read = require('./utils').read
const validate = require('./utils').validate
const stripLeadingUnderscores = require('./utils').stripLeadingUnderscores
const fieldSchema = require('../schema/field')

module.exports = function generateFields (dir, cb) {
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) { console.warn('Warning: no field json files found in', dir) }
    const fields = {}
    const tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, fieldSchema)) {
            return cb(new Error(file + ': Field structure is invalid'))
          }
          const id = stripLeadingUnderscores(file.match(/([^.]*)\.json/)[1])
          fields[id] = field
          cb()
        })
      }
    })
    runParallel(tasks, function (err) {
      if (err) return cb(err)
      cb(null, fields)
    })
  })
}
