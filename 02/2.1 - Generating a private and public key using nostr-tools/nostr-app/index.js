const { generateSecretKey, getPublicKey } = require('nostr-tools');

// Generate a private key
let sk = generateSecretKey();  // `sk` is a Uint8Array
console.log("Private Key:", Buffer.from(sk).toString('hex'));

// Derive the public key from the private key
let pk = getPublicKey(sk);  // `pk` is a hex string
console.log("Public Key:", pk);
