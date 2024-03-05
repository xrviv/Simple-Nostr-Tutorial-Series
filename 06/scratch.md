<script>
  import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools';

  let privateKeyHex = '';
  let publicKeyHex = '';
  let nsecPrivateKey = '';
  let npubPublicKey = '';
  let nsecPrivateKeyInput = '';
  let showRegistrationKeys = false;
  let isLoggedIn = false;
  let isError = false;
  let loginMessage = '';

  // Helper function to convert Uint8Array to hex string
  function uint8ArrayToHex(byteArray) {
    return Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  const generateKeys = () => {
    const sk = generateSecretKey();
    showRegistrationKeys = true; // Show the keypair box instead of using alert
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

  const login = async () => {
    if (!/^[a-zA-Z0-9]+$/.test(nsecPrivateKeyInput)) {
      loginMessage = 'Invalid key format. Please input your NIP19 encoded key.';
      isError = true;
      return;
    }
    try {
      const { data: hexPrivateKey } = nip19.decode(nsecPrivateKeyInput);
      //Process login with hexPrivateKey
      loginMessage = 'Login successful!';
      isError = false;
      isLoggedIn = true; // Update login status
    } catch (error) {
      loginMessage = 'Login failed. Please check your key.';
      isError = true;
    }
  };
</script>

<form on:submit|preventDefault={login}>
  <input type="text" bind:value={nsecPrivateKeyInput} placeholder="Enter your NSEC Private Key" />
  <button type="submit" disabled={isLoggedIn}>Login</button>
  {#if loginMessage}
    <p class:error={isError}>{loginMessage}</p>
  {/if}
</form>

{#if !isLoggedIn} <!-- Only display the button if the user is not logged in -->
  <button on:click={generateKeys}>Generate New Key Pair </button>
{/if}

{#if showRegistrationKeys}
  <div>
    <p>Raw Private Key: {privateKeyHex}</p>
    <p>NIP-19 Encoded Private Key (nsec): {nsecPrivateKey}</p>
    <p>Raw Public Key: {publicKeyHex}</p>
    <p>NIP-19 Encoded Public Key (npub): {npubPublicKey}</p>
  </div>
{/if}