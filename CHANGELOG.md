# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/digidem/id-presets-builder/compare/v2.0.1...v3.0.0) (2024-04-10)


### Bug Fixes

* Store preset with valid default props ([25bf275](https://github.com/digidem/id-presets-builder/commit/25bf2751f669c5c94ee4ab2177ac19e783f1e214))

### ⚠ BREAKING CHANGES

* Update to ES modules, use `import` and `export` instead of `require` and `module.exports` ([25bf2751](https://github.com/digidem/id-presets-builder/commit/25bf2751f669c5c94ee4ab2177ac19e783f1e214))
* Update to latest [@mapeo/schema@3.0.0-next.14](https://github.com/digidem/mapeo-schema) ([25bf2751](https://github.com/digidem/id-presets-builder/commit/25bf2751f669c5c94ee4ab2177ac19e783f1e214))

### [2.0.1](https://github.com/digidem/id-presets-builder/compare/v2.0.0...v2.0.1) (2022-05-18)


### Bug Fixes

* include field options in translatable strings ([cfcc94e](https://github.com/digidem/id-presets-builder/commit/cfcc94e809c6b16ff069c3cda1288ffd22e0a95e))

## [2.0.0](https://github.com/digidem/id-presets-builder/compare/v1.5.0...v2.0.0) (2020-04-17)


### ⚠ BREAKING CHANGES

* Use schemas from mapeo-schema

### Features

* Use schemas from mapeo-schema ([879c5c3](https://github.com/digidem/id-presets-builder/commit/879c5c34410e914ce9a61a972ff980b84874493f))

## [1.5.0](https://github.com/digidem/id-presets-builder/compare/v1.4.2...v1.5.0) (2020-04-15)


### Features

* Add helperText property to fields ([324aeea](https://github.com/digidem/id-presets-builder/commit/324aeeaee2cc473eba5e1078e5a56dd84a76a491))

### [1.4.2](https://github.com/digidem/id-presets-builder/compare/v1.4.1...v1.4.2) (2020-03-04)


### Bug Fixes

* Fix error messages (again) ([8bc686b](https://github.com/digidem/id-presets-builder/commit/8bc686b6866cc29e550ae1de93e96c3542263ad6))

### [1.4.1](https://github.com/digidem/id-presets-builder/compare/v1.4.0...v1.4.1) (2020-03-04)


### Bug Fixes

* Fix warning messages and formatting ([dd1da1d](https://github.com/digidem/id-presets-builder/commit/dd1da1d0d37ff25b04780f38cb461138d306654b))

## [1.4.0](https://github.com/digidem/id-presets-builder/compare/v1.3.0...v1.4.0) (2019-11-12)


### Features

* Add new field type `select_multiple` ([29ff2cd](https://github.com/digidem/id-presets-builder/commit/29ff2cde6c33af1c6cf03a837b5e0fc5c3b670a5))

## [1.3.0] - 2019-05-30
### Added
- New field type `select_one`

## [1.2.2] - 2017-06-26
### Fixed
- Fix default build dir path

## [1.2.1] - 2016-12-13
### Fixed
- Remove some stray console.log

## [1.2.0] - 2016-10-05
### Added
- Command line option `--dir`, defaults to `./build`
- Option to allow presets with additional properties outside schema

## [1.1.0] - 2016-08-16
### Added
- `id-presets lint` - lints presets without writing any files

## 1.0.0 - 2016-08-16

Initial release

[1.1.0]: https://github.com/digidem/id-presets-builder/compare/v1.0.0...v1.1.0
