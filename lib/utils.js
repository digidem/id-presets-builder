import fs from 'node:fs'
import jsonschema from 'jsonschema'

/**
 * Read a file and parse contents as JSON.
 * @param  {string} filename
 * @param  {Function} cb Callback
 */
export function read (filename, cb) {
  fs.readFile(filename, 'utf8', function (err, str) {
    if (err) return cb(err)
    try {
      const data = JSON.parse(str)
      cb(null, data)
    } catch (e) {
      console.error('Error parsing', filename)
      cb(e)
    }
  })
}

/**
 * Validate an object (instance) against a schema
 * @param  {string} filename
 * @param  {object} instance
 * @param  {object} schema
 * @return {bool} true if passed validation.
 */
export function validate (filename, instance, schema) {
  const errors = jsonschema.validate(instance, schema).errors
  if (!errors.length) return true
  console.error(filename + ': ')
  errors.forEach(function (error) {
    if (error.property) {
      console.error(error.property + ' ' + error.message)
    } else {
      console.error(error)
    }
  })
  return false
}

export function stripLeadingUnderscores (str) {
  return str.split('/').map(function (s) { return s.replace(/^_/, '') }).join('/')
}

/**
 * Load JSON from path
 * @param  {string} filename
 * @return {Promise<JSON>}
 */
export async function readJSON(filename){
  return JSON.parse(
    await fs.promises.readFile(
      new URL(filename, import.meta.url)
    ))
}
