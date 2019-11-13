import { AsteroidUserRpc } from './user'
import { invoke } from './base'

const rpc = {
  invoke,
  user: AsteroidUserRpc,
}

export { rpc }
