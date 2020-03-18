module.exports = function generateTranslations (categories, fields, presets) {
  var messages = {}

  Object.keys(categories).forEach(function (id) {
    messages[`categories.${id}`] = { name: categories[id].name }
  })

  Object.keys(fields).map((id) => {
    var field = fields[id]

    messages[`fields.${id}.label`] = {
      description: `Label displayed to user to give context for ${field.label}`,
      message: field.label
    }

    messages[`fields.${id}.placeholder`] = {
      description: `An example to guide the user for ${field.label}`,
      message: field.placeholder
    }

    messages[`fields.${id}.helperText`] = {
      description: `Descriptive text for ${field.label}`,
      message: field.helperText
    }

    if (field.type === 'select_one' || field.type === 'select_multiple') {
      field.options.map((option) => {
        messages[`forest-settings.fields.${id}.options.${option}`] = {
          description: `An option for ${field.label}`,
          message: option
        }
      })
    }
  })

  Object.keys(presets).map((id) => {
    var preset = presets[id]
    messages[`presets.${id}.name`] = {
      description: `The name of preset ${id}`,
      message: preset.name
    }
    messages[`presets.${id}.terms`] = {
      description: 'List of terms',
      message: (presets[id].terms || []).join(',')
  }
  return translations
}

