import glob from 'glob'
import path from 'node:path'
import runParallel from 'run-parallel'
import { read, validate, readJSON } from './utils.js'

export default function generateCategories (dir, cb) {
  glob('*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) console.warn('Warning: no category json files found in', dir)
    const categories = {}
    const tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), async function (err, field) {
          if (err) return cb(err)
          const categorySchema = await readJSON('../schema/category.json')
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
