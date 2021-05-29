import ReaderT from 'crocks/Reader/ReaderT.js';
import Async from 'crocks/Async/index.js';

export const AsyncReader = ReaderT(Async);
export const {ask, liftFn} = AsyncReader;
