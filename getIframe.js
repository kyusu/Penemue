import UrlAssembler from 'url-assembler/index.js';
import Async from 'crocks/Async/index.js';
import {split, compose, reject, isEmpty, map, join, chain, construct} from 'ramda/dist/ramda.js';
import {ask, liftFn, AsyncReader} from './AsyncReader.js';

const bufferToBase64 = buffer => buffer.toString('base64');

const getRunkitURL = fileName => base64Code => UrlAssembler('https://runkit.com')
    .prefix('e')
    .query({
        name: fileName,
        gutterStyle: 'outside',
        base64source: base64Code
    })
    .toString();

const getIframeTag = fileName => url => `<iframe data-file-name="${fileName}" src="${url}"></iframe>`;

const convertFileToRunkitIframe = getFileContentAsBuffer => fileName => getFileContentAsBuffer(fileName)
    .chain(checkInput(`"${fileName}" is empty!`))
    .map(bufferToBase64)
    .map(getRunkitURL(fileName))
    .map(getIframeTag(fileName));

const getRejectedError = compose(Async.Rejected, construct(Error));

const checkInput = errorMessage => input => input && input.length ? Async.Resolved(input) : getRejectedError(errorMessage);

const getLines = compose(reject(isEmpty), split('\n'));

const getIframes = getFileContentAsBuffer => compose(Async.all, map(convertFileToRunkitIframe(getFileContentAsBuffer)));

const injectFsReadFileAndGetIframes = fileName =>
    AsyncReader(({getFileContentAsBuffer}) => getIframes(getFileContentAsBuffer)(fileName));

const getStdIn = () => AsyncReader(({getStdinAsync}) => getStdinAsync());

const getIframe = env => compose(
    map(join('\n')),
    chain(injectFsReadFileAndGetIframes),
    map(getLines),
    chain(liftFn(checkInput('No input was given!'))),
    chain(getStdIn),
    ask
)().runWith(env);

export default getIframe
