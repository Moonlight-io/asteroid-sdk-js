import { AsteroidUser } from './asteroid-user';
import { ClaimInfo, ConnectionNetworkType, PlatformType, UserProfile } from './interfaces';
/**
 * attempts to decrypt a claim payload using a seed for input.  This method will attempt to access the seed's keychain for reference data when
 * digesting claim attestations
 * @param claimId the claimId to decrypt
 * @param seed the bip39 seed requesting the data
 * @param platform the platform to operate on
 * @param network the network to operate on
 */
export declare function getDecryptedClaim(claimId: string, seed: string, platform?: PlatformType, network?: ConnectionNetworkType): Promise<ClaimInfo>;
/**
 * gets an identity profile using a token
 * @param token the identity token
 * @param asteroidEnvironment (optional) the asteroid environment to connect to
 */
export declare function getProfileByToken(token: string, asteroidEnvironment?: ConnectionNetworkType): Promise<UserProfile>;
/**
 * Redirects the user to the vivid login view for the requested app and service
 * @param appId the application (defined in the vivid developer app)
 * @param serviceId the service ID defined in the vivid
 * @param state (optional) an optional parameter for flow control
 * @param domain (optional) the vivid platform to target
 */
export declare function go(appId: string, serviceId: string, state?: string, domain?: string): undefined;
/**
 * authenticates and returns an asteroid user instance
 * @param email the user's email
 * @param password the user's password
 * @param asteroidEnvironment (optional) the asteroid environment to connect to.
 */
export declare function loginEmail(email: string, password: string, asteroidEnvironment?: ConnectionNetworkType): Promise<AsteroidUser>;
