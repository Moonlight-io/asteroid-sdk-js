import elliptic from 'elliptic'

// MASTER SEEDS
export const bip32MasterSeeds: { [key: string]: Buffer } = {
  neo: Buffer.from('Nist256p1 seed'),
}

// PURPOSE
export const bip32Purposes: { [key: string]: number } = {
  BIP44: 0x8000002c,
}

// COINS
export const bip32Coins: { [key: string]: number } = {
  neo: 0x80000378,
}

// ACCOUNT
export const bip32Accounts: { [key: string]: number } = {
  firstHardenedChild: 0x80000000,
}

// ELLIPTICAL CURVES
export const curves: { [key: string]: any } = {
  neo: new elliptic.ec('p256'),
}
