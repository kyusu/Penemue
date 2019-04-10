const UrlAssembler = require('url-assembler');
const {Rejected, Resolved, all} = require('crocks/Async');
const {split, compose, reject, isEmpty, map, join} = require('ramda');
const getStdinAsync = require('./getStdinAsync.js');
const getFileContentAsBuffer = require('./getFileContentAsBuffer.js');

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
    .chain(checkInput(`"${fileName}" is empty!`))
    .map(bufferToBase64)
    .map(getRunkitURL(fileName))
    .map(getIframe(fileName));

const checkInput = errorMessage => input => input && input.length ? Resolved(input) : Rejected(errorMessage);

const getLines = compose(reject(isEmpty), split('\n'));

const getIframes = compose(all, map(convertFileToRunkitIframe));

module.exports = getStdinAsync()
    .chain(checkInput('No input was given!'))
    .map(getLines)
    .chain(getIframes)
    .map(join('\n'));
