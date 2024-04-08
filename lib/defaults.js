import { read, validate, readJSON } from './utils.js'

export default function generateDefaults (file, cb) {
  read(file, async function (err, defaults) {
    if (err) {
      console.warn('Warning: no defaults.json file found')
      return cb(null)
    }
    const defaultsSchema = await readJSON('../schema/defaults.json')
    if (!validate(file, defaults, defaultsSchema)) {
      return cb(new Error(file + ': Field structure is invalid'))
    }
    cb(null, defaults)
  })
}
