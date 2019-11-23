import { AsteroidUserRest } from './user';
import { AsteroidWorkerRest } from './worker';
declare const rest: {
    user: typeof AsteroidUserRest;
    worker: typeof AsteroidWorkerRest;
};
export { rest };
