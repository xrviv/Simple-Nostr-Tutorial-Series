<script>
  // Your existing script content...
</script>

<style>
  .button-container {
    display: flex;
    gap: 10px; /* Adjust the gap between buttons as needed */
  }

  /* Additional styling for buttons and form elements as needed */
</style>

<form on:submit|preventDefault={login}>
  <input type="text" bind:value={nsecPrivateKeyInput} placeholder="Enter your NSEC Private Key" />
  <div class="button-container">
    <button type="submit" disabled={isLoggedIn}>Login</button>
    {#if !isLoggedIn} <!-- Conditionally render the button based on login status -->
      <button on:click={generateKeys} disabled={isLoggedIn}>Generate New Key Pair</button>
    {/if}
  </div>
  {#if loginMessage}
    <p class:error={isError}>{loginMessage}</p>
  {/if}
</form>

{#if showRegistrationKeys && !isLoggedIn}
  <!-- Your key display logic here -->
{/if}
