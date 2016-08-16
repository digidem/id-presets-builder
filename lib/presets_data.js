var path = require('path')
var glob = require('glob')
var runParallel = require('run-parallel')
var read = require('./utils').read
var validate = require('./utils').validate
var stripLeadingUnderscores = require('./utils').stripLeadingUnderscores
var presetSchema = require('../schema/preset.json')

module.exports = function generatePresetsData (dir, cb) {
  glob('**/*.json', {cwd: dir}, function (err, files) {
    if (err) return cb(err)
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
