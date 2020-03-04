#!/usr/bin/env node

var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')
var yaml = require('js-yaml')

var argv = require('minimist')(process.argv.slice(2), {
  default: {
    dir: path.resolve('build')
  },
  boolean: 'custom',
  alias: {
    d: 'dir'
  }
})
var cmd = argv._[0] || 'build'

if (['build', 'lint'].indexOf(cmd) < 0) {
  console.error('Unknown command %s', cmd)
  process.exit(1)
}

var generatePresets = require('../lib/presets')
var generateTranslate = require('../lib/translate')
var generateTranslations = require('../lib/translations')

var cwd = process.cwd()
var buildDir = argv.dir
var presetsBuildFile = path.join(buildDir, 'presets.json')
var translationsBuildFile = path.join(buildDir, 'translations.json')
var translateBuildFile = path.join(buildDir, 'translate.yaml')

var options = {}
if (argv.custom) options.additionalProperties = true

generatePresets(cwd, options, function (err, presets) {
  if (err) return done(err)
  if (cmd === 'lint') return

  var translations = generateTranslations(presets.categories, presets.fields, presets.presets)
  var translate = generateTranslate(presets.fields, presets.presets, translations)
  var translateYaml = yaml.safeDump(
    { en: { presets: translate } },
    { sortKeys: sortKeys, lineWidth: -1 }
  ).replace(/'.*#':/g, '#')

  mkdirp.sync(buildDir)
  fs.writeFile(presetsBuildFile, stringify(presets), done)
  fs.writeFile(translationsBuildFile, stringify({ en: { presets: translations } }), done)
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
