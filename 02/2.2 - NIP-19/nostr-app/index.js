const { generateSecretKey, getPublicKey, nip19 } = require('nostr-tools');

// Generate a private key
let sk = generateSecretKey();
console.log();
console.log("Raw Private Key:", Buffer.from(sk).toString('hex'))

// Encode the private key using NIP-19 nsecEncode method
let nsec = nip19.nsecEncode(sk);
console.log("NIP-19 Encoded Private Key (nsec):", nsec);
console.log();

// Derive the raw public key from the private key
let rawPublicKey = getPublicKey(sk);
console.log("Raw Public Key:", rawPublicKey);

// Encode the public key using NIP-19 npubEncode method
let npub = nip19.npubEncode(rawPublicKey);
console.log("NIP-19 Encoded Public Key (npub):", npub);


/* The old code from 2.1 

const { generateSecretKey, getPublicKey } = require('nostr-tools');

// Generate a private key
let sk = generateSecretKey();  // `sk` is a Uint8Array
console.log("Private Key:", Buffer.from(sk).toString('hex'));

// Derive the public key from the private key
let pk = getPublicKey(sk);  // `pk` is a hex string
console.log("Public Key:", pk);
 */
