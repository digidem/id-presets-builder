module.exports = function generateTranslations (categories, fields, presets) {
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


    if (fields[id].strings) {
      for (var i in fields[id].strings) {
        t[i] = fields[id].strings[i]
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
