[![npm version](https://img.shields.io/npm/v/buildtool.js)](https://www.npmjs.com/package/buildtool.js)

## `buildtool.js`

A simple task runner with minimal dependencies and web development in mind.

```bash
> npm i -g buildtool.js
```

## Features

* Dependency-free
* Watch-mode
* Flag to select `debug` (default) / `release` profile
* [Filename hashing](#filename-hashing)

## Usage

```bash
> node my.build.js [-w] [-h|--help] [--release]
```

|                                               |                                                |
| --------------------------------------------- | ---------------------------------------------- |
| <code>&nbsp;-w</code>                         | Watch files for changes after the first build. |
| <code>--help</code></br><code>&nbsp;-h</code> | Print a usage guide.                           |
| <code>--release</code>                        | Build in release mode (default is debug).      |

## Build Configuration

`buildtool.js` is configured by defining tasks in a build configuration file.

Each task is composed of a glob pattern selecting the source file(s), a target file name and a function, that produces the target file.

Example:

```js
// my.build.js

const { tasks, log } = require('buildtool.js');

tasks
({
    'src/(**).ts': ['dist/$1.js', async (src, dest) =>
    {
        log('tsc', dest);

        // compile typescript (src => dest) ...
    }],

    ...
});
```

A minimal but complete example of a build-configuration, that uses the [sass](https://www.npmjs.com/package/sass) package in order to compile scss, can be found in [build.example.js](build.example.js).

### Debug and Release profile

`buildtool.js` supports two build profiles:

* `debug` (default)
* `release` (selected when building with `--release`).

Tasks can freely implement specific behaviour for `debug` / `release` builds by checking the value of `debug` – a variable exported by `buildtool.js`:

```js
const { tasks, log, debug } = require('buildtool.js');

tasks
({
    'src/(**).ts': ['dist/$1.js', async (src, dest) =>
    {
        log('tsc', dest);

        if (debug)
        {
            // Build profile is 'debug'
        }
        else
        {
            // Build profile is 'release'
        }
    }],

    ...
});
```

### Filename hashing

Having web development in mind, `buildtool.js` provides a simple way to hash destination filenames, [similar to webpack](https://webpack.js.org/guides/caching/#output-filenames).

Filename hashing is turned off by default and may be enabled per task, by prefixing the source file name glob pattern with `hash:`.

Example:

```js
const { tasks, log } = require('buildtool.js');

tasks
({
    'src/(**).ts': ['dist/$1.js', async (src, dest) =>
    {
        log('tsc', dest);

        // for 'src/main.ts':
        // output filename (dest): 'dist/main.js'
    }],

    'hash:src/(**).scss': ['dist/$1.css', async (src, dest) =>
    {
        log('scss', dest);

        // for 'src/home.scss':
        // output filename (dest): 'dist/home.ddce269a1e3d054cae349621c198dd52.css'
    }],

    ...
});
```

---

buildtool.js - Lesosoftware 2022
