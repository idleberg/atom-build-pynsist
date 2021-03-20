# build-pynsist

[![apm](https://flat.badgen.net/apm/license/build-pynsist)](https://atom.io/packages/build-pynsist)
[![apm](https://flat.badgen.net/apm/v/build-pynsist)](https://atom.io/packages/build-pynsist)
[![apm](https://flat.badgen.net/apm/dl/build-pynsist)](https://atom.io/packages/build-pynsist)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-build-pynsist)](https://circleci.com/gh/idleberg/atom-build-pynsist)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-build-pynsist)](https://david-dm.org/idleberg/atom-build-pynsist)
[![Gitter](https://flat.badgen.net/badge/chat/on%20gitter/ff69b4)](https://gitter.im/NSIS-Dev/Atom)

[Atom Build](https://atombuild.github.io/) for Pynsist, builds Windows installers for Python applications.

## Installation

### apm

Install `build-pynsist` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-pynsist`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
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
