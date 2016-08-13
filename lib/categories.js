var glob = require('glob')
var path = require('path')
var runParallel = require('run-parallel')
var read = require('./utils').read
var validate = require('./utils').validate
var categorySchema = require('../schema/category.json')

module.exports = function generateCategories (dir, cb) {
  glob('*.json', {cwd: dir}, function (err, files) {
    if (err) return cb(err)
    var categories = {}
    var tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, categorySchema)) {
            return cb(new Error(file + ': Category structure is invalid'))
          }
          var id = 'category-' + path.basename(file, '.json')
          categories[id] = field
        })
      }
    })
    runParallel(tasks, function (err) {
      if (err) return cb(err)
      cb(null, categories)
    })
  })
}
