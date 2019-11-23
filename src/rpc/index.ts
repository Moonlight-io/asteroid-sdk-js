import { invoke } from './base'
import { AsteroidUserRpc } from './user'
import { AsteroidWorkerRpc } from './worker'

const rpc = {
  invoke,
  user: AsteroidUserRpc,
  worker: AsteroidWorkerRpc,
}

export { rpc }
