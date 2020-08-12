import { AsteroidUser } from './asteroid-user'
import { Asteroid } from './asteroid'
import { ClaimInfo, ConnectionNetworkType, PlatformType, UserProfile } from './interfaces'
import { Keychain, NeoVivid } from './blockchain'
import { bip32Coins } from './constants/bips'
import { urls } from './constants/urls'
import { NetworkHelper } from './helpers'
import { constants } from './constants'

/**
 * attempts to decrypt a claim payload using a seed for input.  This method will attempt to access the seed's keychain for reference data when
 * digesting claim attestations
 * @param claimId the claimId to decrypt
 * @param seed the bip39 seed requesting the data
 * @param platform the platform to operate on
 * @param network the network to operate on
 */
export async function getDecryptedClaim(claimId: string, seed: string, platform: PlatformType = 'neo', network: ConnectionNetworkType = 'production'): Promise<ClaimInfo> {
  const keychain = new Keychain()
  keychain.importSeed(seed)

  const coin = bip32Coins[platform] - 0x80000000
  const childKey = keychain.generateChildKey(platform, `m/44'/${coin}'/0'/0/0`)
  const neo2Network = NetworkHelper.getNeo2Network(network)
  const cnsHash = constants.neo2CNSHash[network]
  return NeoVivid.getDecryptedClaimByClaimID(neo2Network, cnsHash, claimId, childKey.getWIF())
}

/**
 * gets an identity profile using a token
 * @param token the identity token
 * @param asteroidEnvironment (optional) the asteroid environment to connect to
 */
export async function getProfileByToken(token: string, asteroidEnvironment: ConnectionNetworkType = 'production'): Promise<UserProfile> {
  const asteroid = new Asteroid({ networkType: asteroidEnvironment })
  return asteroid.getProfileByToken(token)
}

/**
 * Redirects the user to the vivid login view for the requested app and service
 * @param appId the application (defined in the vivid developer app)
 * @param serviceId the service ID defined in the vivid
 * @param state (optional) an optional parameter for flow control
 * @param domain (optional) the vivid platform to target
 */
export function go(appId: string, serviceId: string, state: string = '', domain: string = 'https://vivid.moonlight.io'): undefined {
  window.location.replace(`${domain}/sign-in/?login=oauth&app_id=${appId}&service_id=${serviceId}&state=${state}`)
  return
}

/**
 * authenticates and returns an asteroid user instance
 * @param email the user's email
 * @param password the user's password
 * @param asteroidEnvironment (optional) the asteroid environment to connect to.
 */
export async function loginEmail(email: string, password: string, asteroidEnvironment: ConnectionNetworkType = 'production'): Promise<AsteroidUser> {
  const asteroid = new Asteroid({ networkType: asteroidEnvironment })
  return asteroid.loginEmail(email, password)
}
