var glob = require('glob')
var path = require('path')
var runParallel = require('run-parallel')
var read = require('./utils').read
var validate = require('./utils').validate
var stripLeadingUnderscores = require('./utils').stripLeadingUnderscores
var fieldSchema = require('../schema/field')

module.exports = function generateFields (dir, cb) {
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length)
      console.warn('Warning: no field json files found in', dir)
    var fields = {}
    var tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, fieldSchema)) {
            return cb(new Error(file + ': Field structure is invalid'))
          }
          var id = stripLeadingUnderscores(file.match(/([^.]*)\.json/)[1])
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
