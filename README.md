# Penemue

[![Build Status](https://travis-ci.com/kyusu/Penemue.svg?branch=master)](https://travis-ci.com/kyusu/Penemue)
[![Coverage Status](https://coveralls.io/repos/github/kyusu/Penemue/badge.svg?branch=master)](https://coveralls.io/github/kyusu/Penemue?branch=master)
[![dependencies Status](https://david-dm.org/kyusu/Penemue/status.svg)](https://david-dm.org/kyusu/Penemue)
[![devDependencies Status](https://david-dm.org/kyusu/Penemue/dev-status.svg)](https://david-dm.org/kyusu/Penemue?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/c2b6971343ff284370af/maintainability)](https://codeclimate.com/github/kyusu/Penemue/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/kyusu/Penemue/badge.svg)](https://snyk.io/test/github/kyusu/Penemue)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/kyusu/Penemue/graphs/commit-activity)
[![GitHub license](https://img.shields.io/github/license/kyusu/Penemue.svg)](https://github.com/kyusu/Penemue/blob/master/LICENSE)



## Purpose
[Penemue](https://en.wikipedia.org/wiki/Penemue) is just a small command-line application which is lets you convert the content of a JavaScript file to a [RunKit](https://runkit.com/) URL embedded in an iframe.
This iframe can then be embedded again into an HTML5 presentation frameworks like [reveal.js](https://revealjs.com).

## Motivation
While HTML5 presentation frameworks usually have decent to excellent syntax highlighting, I've yet to see one which lets me actually execute the code to show the result. Sometimes having a little _play_ button or something similar would be helpful if during a presentation one wants to show the result of running the code.

[RunKit](https://runkit.com/) lets me execute my [Node.js](https://nodejs.org/) scripts in the browser which is exactly what I was looking for.

Since I usually save the code for a presentation in separate files, I was looking for a way to easily convert those files into embeddable [RunKit](https://runkit.com/) URLs.

## Usage

Say you have your code for your presentation saved in a file _slide1.js_ with the following content:
```JavaScript
console.log('פְּנִימִי');
```
You can run
```bash
$ ls slide1.js | node index.js
```
and you'll get back the output:
```
<iframe data-file-name="slide1.js" src="https://runkit.com/e?name=slide1.js&gutterStyle=outside&base64source=Y29uc29sZS5sb2coJ9ek1rDWvNeg1rTXmdee1rTXmScpOwo%3D"></iframe>
```

This can be then embedded into the HTML5 presentation framework of your choice.

To convert all files in a directory, simply run
```bash
$ ls *.js | node index.js
```


## License

  [MIT](LICENSE)
