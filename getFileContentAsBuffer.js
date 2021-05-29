import fs from 'fs';
import Async from "crocks/Async/index.js"

const getFileContentAsBuffer = Async.fromNode(fs.readFile);

export default getFileContentAsBuffer;
