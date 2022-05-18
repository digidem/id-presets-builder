const glob = require('glob')
const path = require('path')
const runParallel = require('run-parallel')
const read = require('./utils').read
const validate = require('./utils').validate
const categorySchema = require('../schema/category.json')

module.exports = function generateCategories (dir, cb) {
  glob('*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) console.warn('Warning: no category json files found in', dir)
    const categories = {}
    const tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, field, categorySchema)) {
            return cb(new Error(file + ': Category structure is invalid'))
          }
          const id = 'category-' + path.basename(file, '.json')
          categories[id] = field
          cb()
        })
      }
    })
    runParallel(tasks, function (err) {
      if (err) return cb(err)
      cb(null, categories)
    })
  })
}
