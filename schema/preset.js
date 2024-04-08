const {valueSchemas} = await import('@mapeo/schema')
export const presetSchema = valueSchemas['preset']
// mapeo-schema defines presets as having an id property. For preset definitions
// this comes from the filename, so it is not required in the JSON definitions
export const required = presetSchema.required.filter(prop => prop !== 'id')
