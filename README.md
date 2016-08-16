# id-presets-builder

[![npm version][1]][2]
[![js-standard-style][6]][7]

[1]: https://img.shields.io/npm/v/id-presets-builder.svg
[2]: https://www.npmjs.com/package/id-presets-builder
[3]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[4]: http://standardjs.com/

> Build preset files for [iDEditor](https://github.com/openstreetmap/iD)

Will take a collection of iD preset, field and category definition files, verify that the schema is correct and definitions are valid, and builds a preset file, translations, and a YAML file for translation. Useful for deploying iD Editor with custom preset files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```
$ npm install --global id-presets-builder
```

## Usage

```
$ id-presets
```

Looks for iD [preset files][5] in `./presets/`, [field files][6] in `./fields/`, categories in `./categories/` and defaults in `./defaults.json`. Please see the [iD Presets README.md][7] for details about iD presets. Outputs `presets.json`, `translations.json` and `translate.json` in `./build/`.

[5]: https://github.com/openstreetmap/iD/tree/master/data/presets#preset-files
[6]: https://github.com/openstreetmap/iD/tree/master/data/presets#field-files
[7]: https://github.com/openstreetmap/iD/tree/master/data/presets

## API

```js
var presetsBuilder = require('id-presets-builder')
```

### `presetsBuilder.generatePresets([dir], callback)`

Looks for preset, field and category files in dirs `${dir}/presets/`, `${dir}/fields/`, `${dir}/categories/` and `${dir}/defaults.json`. `dir` defaults to `process.cwd()`. Callback is called with a presets object:

```js
{
  presets: {...},
  categories: {...},
  fields: {...},
  defaults: {...}
}
```

### `presetsBuilder.generateTranslations(categories, fields, presets)`

Generates an object of localized names for presets that can be used in iD editor for localized names of presets in the UI.

### `presetsBuilder.generateTranslate(fields, presets, translations)`

Generates a translate object that defines preset terms that need translation, for use in [transifex][8] or similar localization platform.

[8]: https://www.transifex.com

## Contribute

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © Gregor MacLennan / Digital Democracy
