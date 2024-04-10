import glob from 'glob'
import path from 'node:path'
import runParallel from 'run-parallel'
import { read, validate, stripLeadingUnderscores } from './utils.js'
import { fieldSchema } from '../schema/field.js'

export default function generateFields (dir, cb) {
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) { console.warn('Warning: no field json files found in', dir) }
    const fields = {}
    const tasks = files.map(function (file) {
      return function (cb) {
        read(path.join(dir, file), function (err, field) {
          if (err) return cb(err)
          if (!validate(file, {...field, schemaName: 'field'}, fieldSchema)) {
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
