export default function generateTranslations (categories, fields, presets) {
  const translations = {
    categories: {},
    fields: {},
    presets: {}
  }
  Object.keys(categories).forEach(function (id) {
    translations.categories[id] = { name: categories[id].name }
  })
  Object.keys(fields).forEach(function (id) {
    const t = translations.fields[id] = {
      label: fields[id].label
    }

    if (fields[id].placeholder) {
      t.placeholder = fields[id].placeholder
    }

    if (fields[id].helperText) {
      t.helperText = fields[id].helperText
    }

    if (fields[id].options) {
      t.options = t.options || {}
      for (const option of fields[id].options) {
        let value
        let label
        if (option && option.value && option.label) {
          value = option.value
          label = option.label
        } else {
          value = option
          label = option
        }
        if (typeof value === 'string') {
          t.options[value] = label
        }
      }
    }
  })
  Object.keys(presets).forEach(function (id) {
    translations.presets[id] = {
      name: presets[id].name,
      terms: (presets[id].terms || []).join(',')
    }
  })
  return translations
}
