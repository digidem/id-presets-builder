import path from 'node:path'
import glob from 'glob'
import runParallel from 'run-parallel'
import { read, validate, stripLeadingUnderscores } from './utils.js'
import { presetSchema } from '../schema/preset.js'

export default function generatePresetsData (dir, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }
  presetSchema.additionalProperties =
    presetSchema.additionalProperties || (opts && opts.additionalProperties)
  glob('**/*.json', { cwd: dir }, function (err, files) {
    if (err) return cb(err)
    if (!files.length) {
      console.warn('Warning: no preset json files found in', dir)
    }
    const presets = {}
    const tasks = files.map(function (filename) {
      return function (cb) {
        read(path.join(dir, filename), function (err, preset) {
          if (err) return cb(err)
          const presetWithDefaults = {
            fieldIds: [],
            removeTags: {},
            addTags: {},
            terms: [],
            ...preset
          }
          const isValid = validate(
            filename,
            { ...presetWithDefaults, schemaName: 'preset' },
            presetSchema
          )
          if (!isValid) {
            return cb(new Error(filename + ': Field structure is invalid'))
          }
          const id = stripLeadingUnderscores(filename.match(/([^.]*)\.json/)[1])
          presets[id] = presetWithDefaults
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
