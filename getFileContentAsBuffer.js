const fs = require('fs');
const {fromNode} = require('crocks/Async');

const getFileContentAsBuffer = fromNode(fs.readFile);

module.exports = getFileContentAsBuffer;
