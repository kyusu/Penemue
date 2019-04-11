#!/usr/bin/env node
const getIframes = require('./getIframe');
/*eslint better/explicit-return: 0*/
/*eslint fp/no-nil: 0*/
const errFn = err => {
    console.error(err);
    process.exit(1);
};
/*eslint fp/no-unused-expression: 0*/
getIframes.fork(errFn, console.log);
