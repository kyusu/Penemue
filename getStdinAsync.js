const getStdin = require('get-stdin');
const {fromPromise} = require('crocks/Async');

const getStdinAsync = fromPromise(getStdin);

module.exports = getStdinAsync;
