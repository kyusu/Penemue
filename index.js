#!/usr/bin/env node
const getStdInAsync = require('./getStdinAsync.js');
const getFileContentAsBuffer = require('./getFileContentAsBuffer.js');
const getIframes = require('./getIframe');
/*eslint better/explicit-return: 0*/
/*eslint fp/no-nil: 0*/
const errFn = err => {
    console.error(err);
    process.exit(1);
};
/*eslint fp/no-unused-expression: 0*/
getIframes({
    getStdInAsync,
    getFileContentAsBuffer
}).fork(errFn, console.log);
