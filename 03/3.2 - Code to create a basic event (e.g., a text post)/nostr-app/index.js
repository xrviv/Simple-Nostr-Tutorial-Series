const { generateSecretKey, getPublicKey, nip19, finalizeEvent } = require('nostr-tools');

// Generate a private key
let sk = generateSecretKey();
console.log("Raw Private Key:", Buffer.from(sk).toString('hex'))

// Encode the private key using NIP-19 nsecEncode method
let nsec = nip19.nsecEncode(sk);
console.log("NIP-19 Encoded Private Key (nsec):", nsec);

// Derive the raw public key from the private key
let rawPublicKey = getPublicKey(sk);
console.log("Raw Public Key:", rawPublicKey);

// Encode the public key using NIP-19 npubEncode method
let npub = nip19.npubEncode(rawPublicKey);
console.log("NIP-19 Encoded Public Key (npub):", npub);

// Define an event template
let eventTemplate = {
  kind: 1, // The kind of event, e.g., 1 for a text note
  created_at: Math.floor(Date.now() / 1000), // Timestamp of event creation
  tags: [], // Tags for the event, if any
  content: 'This is a sample Nostr event.', // Content of the event
};

// Sign the event with the private key
let signedEvent = finalizeEvent(eventTemplate, sk);
console.log("Signed Event:", signedEvent);
