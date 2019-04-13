const UrlAssembler = require('url-assembler');
const {Rejected, Resolved, all} = require('crocks/Async');
const {split, compose, reject, isEmpty, map, join, chain} = require('ramda');
const {ask, liftFn, AsyncReader} = require('./AsyncReader.js');

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

const convertFileToRunkitIframe = getFileContentAsBuffer => fileName => getFileContentAsBuffer(fileName)
    .chain(checkInput(`"${fileName}" is empty!`))
    .map(bufferToBase64)
    .map(getRunkitURL(fileName))
    .map(getIframe(fileName));

const checkInput = errorMessage => input => input && input.length ? Resolved(input) : Rejected(errorMessage);

const getLines = compose(reject(isEmpty), split('\n'));

const getIframes = getFileContentAsBuffer => compose(
    all,
    map(convertFileToRunkitIframe(getFileContentAsBuffer))
);

const getStdIn = () => AsyncReader(({getStdInAsync}) => getStdInAsync());

module.exports = env => compose(
    map(join('\n')),
    chain(fileName => AsyncReader(({getFileContentAsBuffer}) => getIframes(getFileContentAsBuffer)(fileName))),
    map(getLines),
    chain(liftFn(checkInput('No input was given!'))),
    chain(getStdIn),
    ask
)().runWith(env);
