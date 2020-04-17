const presetSchema = require('mapeo-schema/schema/preset.json')

// mapeo-schema defines presets as having an id property. For preset definitions
// this comes from the filename, so it is not required in the JSON definitions
module.exports = {
  ...presetSchema,
  required: presetSchema.required.filter(prop => prop !== 'id')
}
