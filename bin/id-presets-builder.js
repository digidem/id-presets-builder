#!/usr/bin/env node

var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')

var generatePresets = require('../lib/presets')

var cwd = process.cwd()
var buildDir = path.join(cwd, 'build')
var presetsBuildFile = path.join(buildDir, 'presets.json')
mkdirp.sync(buildDir)

generatePresets(cwd, function (err, presets) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  fs.writeFileSync(presetsBuildFile, JSON.stingify(presets, null, 4))
})
