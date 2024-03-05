const { nip19 } = require('nostr-tools');

// Simulate getting an NSEC private key as input
const nsecPrivateKey = 'nsec18fgt0lrae0rt76sn3ue6wh4mcndtawej8ur3rueya3hxns0w8rfsykzpmd';

// Decode the NSEC private key
const decoded = nip19.decode(nsecPrivateKey);

if (decoded.type === 'nsec' && decoded.data) {
  // Convert Uint8Array back to hex format
  const hexPrivateKey = Buffer.from(decoded.data).toString('hex');
  console.log('Hex Private Key:', hexPrivateKey);
} else {
  console.log('Invalid NSEC private key');
}
