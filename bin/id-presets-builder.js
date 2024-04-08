#!/usr/bin/env node

import mkdirp from 'mkdirp'
import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml'
// const mkdirp = require('mkdirp')
// const path = require('path')
// const fs = require('fs')
// const yaml = require('js-yaml')
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2), {
  default: {
    dir: path.resolve('build')
  },
  boolean: 'custom',
  alias: {
    d: 'dir'
  }
})
const cmd = argv._[0] || 'build'

if (['build', 'lint'].indexOf(cmd) < 0) {
  console.error('Unknown command:', cmd)
  process.exit(1)
}

import generatePresets from '../lib/presets.js'
import generateTranslate from '../lib/translate.js'
import generateTranslations from '../lib/translations.js'

const cwd = process.cwd()
const buildDir = argv.dir
const presetsBuildFile = path.join(buildDir, 'presets.json')
const translationsBuildFile = path.join(buildDir, 'translations.json')
const translateBuildFile = path.join(buildDir, 'translate.yaml')

const options = {}
if (argv.custom) options.additionalProperties = true

generatePresets(cwd, options, function (err, presets) {
  if (err) return done(err)
  if (cmd === 'lint') return

  const translations = generateTranslations(presets.categories, presets.fields, presets.presets)
  const translate = generateTranslate(presets.fields, presets.presets, translations)
  const translateYaml = yaml.safeDump(
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
  return (a === b + '#')
    ? -1
    : (b === a + '#')
        ? 1
        : (a > b ? 1 : a < b ? -1 : 0)
}

function done (err) {
  if (!err) return
  console.error(err)
  process.exit(1)
}
