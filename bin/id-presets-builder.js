#!/usr/bin/env node

var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')
var yaml = require('js-yaml')

var generatePresets = require('../lib/presets')
var generateTranslate = require('../lib/translate')
var generateTranslations = require('../lib/translations')

var cwd = process.cwd()
var buildDir = path.join(cwd, 'build')
var presetsBuildFile = path.join(buildDir, 'presets.json')
var translationsBuildFile = path.join(buildDir, 'translations.json')
var translateBuildFile = path.join(buildDir, 'translate.yaml')

mkdirp.sync(buildDir)

generatePresets(cwd, function (err, presets) {
  if (err) return done(err)
  var translations = generateTranslations(presets.categories, presets.fields, presets.presets)
  var translate = generateTranslate(presets.fields, presets.presets, translations)
  var translateYaml = yaml.safeDump(
    {en: {presets: translate}},
    {sortKeys: sortKeys, lineWidth: -1}
  ).replace(/'.*#':/g, '#')

  fs.writeFile(presetsBuildFile, stringify(presets), done)
  fs.writeFile(translationsBuildFile, stringify({en: {presets: translations}}), done)
  fs.writeFile(translateBuildFile, translateYaml, done)
})

function stringify (o) {
  return JSON.stringify(o, null, 4)
}

// comment keys end with '#' and should sort immediately before their related key.
function sortKeys (a, b) {
  return (a === b + '#') ? -1
    : (b === a + '#') ? 1
      : (a > b ? 1 : a < b ? -1 : 0)
}

function done (err) {
  if (!err) return
  console.error(err)
  process.exit(1)
}
