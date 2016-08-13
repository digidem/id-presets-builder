var _ = require('lodash')

module.exports = function generateTranslate (fields, presets, translations) {
  var translate = _.cloneDeep(translations)

  _.forEach(translate.fields, function (field, id) {
    var f = fields[id]
    if (f.keys) {
      field['label#'] = _.each(f.keys).map(function (key) { return key + '=*' }).join(', ')
      if (!_.isEmpty(field.options)) {
        _.each(field.options, function (v, k) {
          if (id === 'access') {
            field.options[k]['title#'] = field.options[k]['description#'] = 'access=' + k
          } else {
            field.options[k + '#'] = k + '=yes'
          }
        })
      }
    } else if (f.key) {
      field['label#'] = f.key + '=*'
      if (!_.isEmpty(field.options)) {
        _.each(field.options, function (v, k) {
          field.options[k + '#'] = f.key + '=' + k
        })
      }
    }

    if (f.placeholder) {
      field['placeholder#'] = id + ' field placeholder'
    }
  })

  _.forEach(translate.presets, function (preset, id) {
    var p = presets[id]
    if (!_.isEmpty(p.tags)) {
      preset['name#'] = _.toPairs(p.tags).map(function (pair) {
        return pair[0] + '=' + pair[1]
      }).join(', ')
    }
    if (p.terms && p.terms.length) {
      preset['terms#'] = 'terms: ' + p.terms.join()
    }
    preset.terms = "<translate with synonyms or related terms for '" + preset.name + "', separated by commas>"
  })

  return translate
}
