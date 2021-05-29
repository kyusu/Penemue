import getStdin from "get-stdin";
import Async from "crocks/Async/index.js"

const getStdinAsync = Async.fromPromise(getStdin);

export default getStdinAsync;
