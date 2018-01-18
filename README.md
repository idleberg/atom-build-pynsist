# build-pynsist

[![apm](https://img.shields.io/apm/l/build-pynsist.svg?style=flat-square)](https://atom.io/packages/build-pynsist)
[![apm](https://img.shields.io/apm/v/build-pynsist.svg?style=flat-square)](https://atom.io/packages/build-pynsist)
[![apm](https://img.shields.io/apm/dm/build-pynsist.svg?style=flat-square)](https://atom.io/packages/build-pynsist)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-pynsist.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-pynsist)
[![David](https://img.shields.io/david/idleberg/atom-build-pynsist.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-pynsist)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-pynsist.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-pynsist?type=dev)
[![Gitter](https://img.shields.io/badge/chat-Gitter-ed1965.svg?style=flat-square)](https://gitter.im/NSIS-Dev/Atom)

[Atom Build](https://atombuild.github.io/) for Pynsist, builds Windows installers for Python applications.

## Installation

### apm

Install `build-pynsist` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-pynsist`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-pynsist`:

```bash
$ git clone https://github.com/idleberg/atom-build-pynsist build-pynsist
```

Inside the cloned directory, install Node dependencies:

```bash
$ yarn || npm install
```

## Configuration

Make sure to specify the path to your `pynsist` in the package settings.

**Example**:

```cson
"build-pynsist":
    pathToPynsist: "C:\\Python27\\Scripts\\pynsist.exe"
```

## Usage

Before you can build, select an active target with your preferred build option.

Available targets:

* `Pynsist: Compile Installer`
* `Pynsist: Generate Script`

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Choose target**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Toggle build panel**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

**Build script**

<kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

## License

This work is dual-licensed under [The MIT License](https://opensource.org/licenses/MIT) and the [GNU General Public License, version 2.0](https://opensource.org/licenses/GPL-2.0)

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-pynsist) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`