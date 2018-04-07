const fs = require('fs');
const Async = require('crocks/Async');
const UrlAssembler = require('url-assembler');

const {fromNode} = Async;

const getFileContentAsBuffer = fromNode(fs.readFile);

const bufferToBase64 = buffer => buffer.toString('base64');

const getRunkitURL = fileName => base64Code => UrlAssembler('https://runkit.com')
    .prefix('e')
    .query({
        name: fileName,
        gutterStyle: 'outside',
        base64source: base64Code
    })
    .toString();

const getIframe = fileName => url => `<iframe data-file-name="${fileName}" src="${url}"></iframe>`;


const convertFileToRunkitIframe = fileName => getFileContentAsBuffer(fileName)
    .map(bufferToBase64)
    .map(getRunkitURL(fileName))
    .map(getIframe(fileName))
    .fork(console.log, console.log);

module.exports = convertFileToRunkitIframe;
