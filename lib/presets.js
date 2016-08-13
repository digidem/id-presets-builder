var path = require('path')
var _ = require('lodash')
var runParallel = require('run-parallel')
var generateCategories = require('./categories')
var generateFields = require('./fields')
var generatePresetsData = require('./presets_data')
var generateDefaults = require('./defaults')

module.exports = function generatePresets (dir, cb) {
  if (arguments.length === 1) {
    cb = dir
  }
  if (typeof dir !== 'string') {
    dir = process.cwd()
  }
  runParallel([
    generateCategories.bind(null, path.join(dir, 'categories')),
    generateFields.bind(null, path.join(dir, 'fields')),
    generatePresetsData.bind(null, path.join(dir, 'presets')),
    generateDefaults.bind(null, path.join(dir, 'defaults.json'))
  ], function (err, results) {
    if (err) return cb(err)
    var presets = {
      categories: results[0],
      fields: results[1],
      presets: results[2]
    }
    if (results[3]) {
      presets.defaults = results[3]
    }
    if (!validateCategoryPresets(presets.categories, presets.presets) ||
        !validatePresetFields(presets.presets, presets.fields) ||
        !validateDefaults(presets.defaults, presets.categories, presets.presets)) {
      cb(new Error('Preset validation failed'))
    }
    cb(null, presets)
  })
}

function validateCategoryPresets (categories, presets) {
  var valid = true
  _.forEach(categories, function (category) {
    if (category.members) {
      category.members.forEach(function (preset) {
        if (presets[preset] === undefined) {
          console.error('Unknown preset: ' + preset + ' in category ' + category.name)
          valid = false
        }
      })
    }
  })
  return valid
}

function validatePresetFields (presets, fields) {
  var valid = true
  _.forEach(presets, function (preset) {
    if (preset.fields) {
      preset.fields.forEach(function (field) {
        if (fields[field] === undefined) {
          console.error('Unknown preset field: ' + field + ' in preset ' + preset.name)
          valid = false
        }
      })
    }
  })
  return valid
}

function validateDefaults (defaults, categories, presets) {
  var valid = true
  _.forEach(defaults, function (members, name) {
    members.forEach(function (id) {
      if (!presets[id] && !categories[id]) {
        console.error('Unknown category or preset: ' + id + ' in default ' + name)
        valid = false
      }
    })
  })
  return valid
}
