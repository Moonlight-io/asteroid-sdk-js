import { AsteroidUser } from './asteroid-user'
import { Asteroid } from './asteroid'
import { ConnectionNetworkType, UserProfile } from './interfaces'

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
