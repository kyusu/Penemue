import test from 'tape';
import path from 'path'
import {exec} from 'child_process';
import {reject, split, compose, isEmpty, startsWith, trim, map, includes}  from 'ramda/dist/ramda.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getMessagesFromError = compose(
    reject(startsWith('at')),
    reject(isEmpty),
    map(trim),
    split('\n')
);

const pathOfIndex = path.relative(process.cwd(), path.join(__dirname, '..', 'index.js'));
const pathOfTestFile = testFile => path.relative(process.cwd(), path.join(__dirname, testFile));

const expectedValueForFoojs = '<iframe data-file-name="end-to-end-test/foo.js" src="https://runkit.com/e?name=end-to-end-test%2Ffoo.js&gutterStyle=outside&base64source=Y29uc3QgZm9vID0gYmFyID0%2BIGJhci5zcGxpdCgnJyk7Cg%3D%3D"></iframe>';

const expectedNonExistingFileMessages = 'Error: No input was given!';

const expectedEmptyFileMessages = [
    'Command failed: ls end-to-end-test/empty.file.js | node index.js',
    'Error: "end-to-end-test/empty.file.js" is empty!'
];

test('it outputs an iframe code snippet given a non empty file', t => {
    t.plan(1);
    exec(`ls ${pathOfTestFile('foo.js')} | node ${pathOfIndex}`, (err, result) => {
        t.equal(result.trim(), expectedValueForFoojs, 'The src attribute should equal');
        t.end();
    })
});

test('it outputs an error given no input', t => {
    t.plan(2);
    exec(`ls baz.js | node ${pathOfIndex}`, ({message}, result) => {
        const messages = getMessagesFromError(message);
        t.equal(result, '', 'result should be empty');
        t.true(includes(expectedNonExistingFileMessages, messages), 'the error messages should state the reason');
        t.end();
    })
});

test('it outputs an error given an empty file', t => {
    t.plan(2);
    exec(`ls ${pathOfTestFile('empty.file.js')} | node ${pathOfIndex}`, ({message}, result) => {
        const messages = getMessagesFromError(message);
        t.equal(result, '', 'result should be empty');
        t.deepEqual(messages, expectedEmptyFileMessages, 'the error messages should state the reason');
        t.end();
    });
});
