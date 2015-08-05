
# cli-output

> My take on simple output for Node.js command-line apps!

[![node](https://img.shields.io/node/v/cli-output.svg?style=flat-square)](https://www.npmjs.com/package/cli-output) [![npm](https://img.shields.io/npm/v/cli-output.svg?style=flat-square)](https://www.npmjs.com/package/cli-output) [![Travis](https://img.shields.io/travis/GochoMugo/cli-output.svg?style=flat-square)](https://travis-ci.org/GochoMugo/cli-output) [![Gemnasium](https://img.shields.io/gemnasium/GochoMugo/cli-output.svg?style=flat-square)](https://gemnasium.com/GochoMugo/cli-output) [![Coveralls](https://img.shields.io/coveralls/GochoMugo/cli-output.svg?style=flat-square)](https://coveralls.io/github/GochoMugo/cli-output?branch=master)


![ScreenShot](https://github.com/GochoMugo/cli-output/blob/master/screenshot.png)

## installation:

```bash
⇒ npm install cli-output
```


## API:

```js
var out = require("cli-output");
```

### out.debug()

For debugging purposes. Expects same arguments as `console.log()`.

This output is only shown if the environment variable `${DEBUG}` is set.


### out.error()

For error messages. Expects same arguments as `console.error()`.


### out.log()

For normal messages. Expects same arguments as `console.log()`.

Alias: `out.info()`


### out.success()

For success messages. Expects same arguments as `console.log()`.


### out.prettyJSON(json)

Outputs `json` in terminal-friendly manner, without the braces, double quotes, etc.

Alias: `out.pjson(json)`


### out.rawJSON(json)

Outputs `json` in its normal format but with indentations.

Alias: `out.rjson(json)`


## license:

**The MIT License (MIT)**

Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
