#!/usr/bin/env node
import getStdinAsync from "./getStdinAsync.js";
import getFileContentAsBuffer from "./getFileContentAsBuffer.js";
import getIframes from './getIframe.js';
/*eslint better/explicit-return: 0*/
/*eslint fp/no-nil: 0*/
const errFn = err => {
    console.error(err);
    process.exit(1);
};
/*eslint fp/no-unused-expression: 0*/
getIframes({
    getStdinAsync,
    getFileContentAsBuffer
}).fork(errFn, console.log);
