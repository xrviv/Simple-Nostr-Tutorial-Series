const readline = require('readline');
const { getPublicKey } = require('nostr-tools/pure');
const nip19 = require('nostr-tools/nip19'); // Corrected import for nip19
const { createInterface } = readline;

// Create readline interface for user input
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your NSEC private key: ', (inputKey) => {
  try {
    // Decode the NSEC private key to get the raw private key
    const { type, data: privateKeyBuffer } = nip19.decode(inputKey);
    
    // Ensure the decoded data is of type 'nsec'
    if (type !== 'nsec') {
      console.log('Error: The provided key is not a valid NSEC private key.');
      rl.close();
      return;
    }
    
    // Check if the private key is 32 bytes
    if (privateKeyBuffer.length !== 32) {
      console.log('Error: Decoded private key must be 32 bytes.');
      rl.close();
      return;
    }
    
    // Derive the raw public key from the private key
    let rawPublicKey = getPublicKey(privateKeyBuffer);
    console.log("Raw Public Key: ", rawPublicKey);
    
    // Note: The next steps would depend on what you want to do with the public key
  } catch (error) {
    console.log('Error processing the NSEC private key:', error.message);
  } finally {
    // Close the readline interface
    rl.close();
  }
});
