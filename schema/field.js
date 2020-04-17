const fieldSchema = require('mapeo-schema/schema/field.json')

// mapeo-schema defines presets as having an id property. For preset definitions
// this comes from the filename, so it is not required in the JSON definitions
module.exports = {
  ...fieldSchema,
  required: fieldSchema.required.filter(prop => prop !== 'id')
}
