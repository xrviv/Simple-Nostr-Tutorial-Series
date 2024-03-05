## Step 1.  Project Setup with Svelte and Nostr-Dev-Kit

Initialize Svelte Project:

If using SvelteKit (recommended for new projects with server-side rendering and routing), initialize a new project with:
kotlin
```
npm init svelte@next your-project-name
cd your-project-name
npm install
```

For a simple Svelte SPA, you can start with:
bash
```
npx degit sveltejs/template your-project-name
cd your-project-name
npm install
```
### Install Nostr Development Kit:

Install the Nostr Development Kit and its Svelte integration by running:

*bash*
```
npm install @nostr-dev-kit/ndk
npm install @nostr-dev-kit/ndk-svelte
```
___
## Step 2

 `nostr-tools` depends on typescript version of ^5.0.0, be sure to install the latest version of typescript by typing: 
 
 `npm install typescript@latest`
 
 then install nostr-tools:
 
 `npm install nostr-tools`
 
 The default page of this setup would create a file named `+page.svelte` in the directory `src/routes`
 
 First, let us create the file `LoginForm.svelte` under the directory `src/components`
 
 ```
 <script>
    import { generateSecretKey, getPublicKey } from 'nostr-tools';
    
    let privateKey = '';

    // Function to handle login

    const login = () => {
        console.log('Login with Private Key:', privateKey);
    };

    // Function to generate a new Nostr key pair
    const generateKey = () => {
        const newPrivateKey = generateSecretKey();
        privateKey = newPrivateKey;
        const publicKey = getPublicKey(newPrivateKey);
        alert('Your new keys are generated! Save your private key securely: ${privateKey}');
        // Display the public key or convert to NIP-19 as needed
    };
</script>

<form on:submit|preventDefault={login}> 
  <input type="text" bind:value={privateKey} placeholder="Enter your Nostr Private Key" />
  <button type="submit">Login</button>
  <button type="button" on:click={generateKey}>Generate New Key</button>
</form>
```
