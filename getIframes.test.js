import test from 'tape';
import Async from 'crocks/Async/index.js';
import compose from 'crocks/helpers/compose.js';
import getIframes from './getIframe.js';

const getRejected = message => () => Async.Rejected(new Error(message));
const getResolved = content => () => Async.Resolved(content);
const getResolvedBuffer = compose(getResolved, Buffer.from);

test('it handles the failed attempt to read from standard-in gracefully', t => {
    const failureMessage = 'Nothing to see here';
    t.plan(1);
    getIframes({
        getStdinAsync: getRejected(failureMessage),
        getFileContentAsBuffer: getResolvedBuffer('console.log("Hello World");')
    }).fork(
        ({message}) => {
            t.equal(message, failureMessage, 'The error should state the error reason');
            t.end();
        },
        () => t.end('It should not invoke the success callback')
    );
});

test('it handles the failed attempt to read a file gracefully', t => {
    const failureMessage = "ENOENT: no such file or directory, open 'bambule.js'";
    t.plan(1);
    getIframes({
        getStdinAsync: getResolved('bambule.js'),
        getFileContentAsBuffer: getRejected(failureMessage)
    }).fork(
        ({message}) => {
            t.equal(message, failureMessage, 'The error should state the error reason');
            t.end();
        },
        () => t.end('it should not invoke the success callback')
    );
});

test('it handles empty file gracefully', t => {
    t.plan(1);
    getIframes({
        getStdinAsync: getResolved('Füchse.js'),
        getFileContentAsBuffer: getResolvedBuffer('')
    }).fork(
        ({message}) => {
            t.equal(message, '"Füchse.js" is empty!', 'The error should state the error reason');
            t.end();
        },
        () => t.end('it should not invoke the success callback')
    );
});

test('it successfully transform the content of a file to an iframe element', t => {
    const expected = '<iframe data-file-name="Hammerhart.js" src="https://runkit.com/e?name=Hammerhart.js&gutterStyle=outside&base64source=Y29uc29sZS5sb2coJ01pa3JvIGluIGRlciBIYW5kJyk7"></iframe>';
    t.plan(1);
    getIframes({
        getStdinAsync: getResolved('Hammerhart.js'),
        getFileContentAsBuffer: getResolvedBuffer("console.log('Mikro in der Hand');")
    }).fork(
        () => t.end('it should not invoke the failure callback'),
        result => {
            t.equal(result, expected, 'The result should be an iframe element');
            t.end();
        }
    );
});
