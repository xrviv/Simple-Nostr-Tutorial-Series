<script>
    import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools';
    import Button from "$lib/Button.svelte"
  
    let privateKeyHex = '';
    let publicKeyHex = '';
    let nsecPrivateKey = '';
    let npubPublicKey = '';
  
    // Helper function to convert Uint8Array to hex string
    function uint8ArrayToHex(byteArray) {
      return Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
    }
  
    const generateKeys = () => {
      const sk = generateSecretKey();
  
      // Convert the private key to Hex format using the helper function
      privateKeyHex = uint8ArrayToHex(sk);
  
      // Encode the private key using NIP-19
      nsecPrivateKey = nip19.nsecEncode(sk);
  
      // Derive the raw public key from the private key
      const rawPublicKey = getPublicKey(sk);
  
      // Convert the raw public key to Hex format using the helper function
      publicKeyHex = uint8ArrayToHex(rawPublicKey);
  
      // Encode the public key using NIP-19
      npubPublicKey = nip19.npubEncode(rawPublicKey);
    };
  </script>
  
  
  <button on:click={generateKeys}>Generate New Key Pair</button>
  
  {#if privateKeyHex}
  <p>Raw Private Key: {privateKeyHex}</p>
  <p>NIP-19 Encoded Private Key (nsec): {nsecPrivateKey}</p>
  <p>Raw Public Key: {publicKeyHex}</p>
  <p>NIP-19 Encoded Public Key (npub): {npubPublicKey}</p>
  {/if}
  