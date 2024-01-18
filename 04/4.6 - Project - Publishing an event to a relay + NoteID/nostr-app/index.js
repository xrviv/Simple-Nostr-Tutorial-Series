const { generateSecretKey, getPublicKey, nip19, finalizeEvent, Relay } = require('nostr-tools');
const WebSocket = require('websocket-polyfill');

// Generate a private key 
let sk = generateSecretKey();
console.log("Raw Private Key:", Buffer.from(sk).toString('hex'))

// Encode the private key using NIP-19 nsecEncode method
let nsec = nip19.nsecEncode(sk);
console.log("NIP-19 Encoded Private Key (nsec):", nsec);

// Derive the public key 
let pk = getPublicKey(sk);
console.log("Raw Public Key:", pk);

// Encode the public key using NIP-19 npubEncode method
let npub = nip19.npubEncode(pk);
console.log("NIP-19 Encoded Public Key (npub):", npub);

// Define an event template
let eventTemplate = {
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'Hello World! This is a kind 1 note from the Simple Nostr Tutorial Series',
};

// Sign the event with the private key
let signedEvent = finalizeEvent(eventTemplate, sk);
console.log("Signed Event:", signedEvent);

// Connect to the relay and publish the event
(async () => {
  try {
    const relay = await Relay.connect('wss://nos.lol', { WebSocket });
    await relay.publish(signedEvent);
    console.log('Event published successfully.');
    relay.close();
  } catch (error) {
    console.error('Error publishing event:', error);
  }
})();
