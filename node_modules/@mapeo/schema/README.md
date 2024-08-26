# mapeo-schema

[![Build Status](https://img.shields.io/travis/digidem/mapeo-schema.svg)](https://travis-ci.org/digidem/mapeo-schema)
[![npm](https://img.shields.io/npm/v/mapeo-schema.svg)](https://www.npmjs.com/package/mapeo-schema)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?maxAge=2592000)](http://standardjs.com/)

> Document schemas, validators and flow types for Mapeo

Original draft: https://hackmd.io/wlMcMM65TmuPXGYOEbOR2g#

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
npm install --save mapeo-schema
```

## Usage

### JS validation functions

```js
const mapeoSchema = require('mapeo-schema')
// also
const validateObservation = require('mapeo-schema/validateObservation')

const testObservation = {...}

const isValid = mapeoSchema.validateObservation(testObservation);
// returns true if validates against schema, false otherwise.
// errors a static prop on mapeoSchema.validateObservation.errors
```

### Flow types

```js
import type { Observation } from 'mapeo-schema'

const myObs: Observation = {...}
```

## API

## Maintainers

[@digidem](https://github.com/digidem)

## Contributing

**It looks like there is no code in this repo**. All the code is generated from
the [JSON Schema definitions](schema/). To build the validator functions and
flow definitions:

```sh
npm run build
```

Tests are also generated dynamically. Place an example minimal and valid JSON
for a particular schema in the [examples](examples/) folder, with a filename
that matches the schema filename, e.g. if you add a schema called
`mySchema.json` then add an example `mySchema.minimal.json` and
`mySchema.full.json`. "Minimal" means with only the required properties, where
"full" means with all the defined properties in the schema document. To run
tests:

```sh
npm test
```

Before publishing, update the docs with:

```sh
npm run docs
```

## License

MIT © 2019 Digital Democracy
