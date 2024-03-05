<script>
  import LoginForm from '../components/LoginForm.svelte';
  import UnstyledLoginForm from '../components/UnstyledLoginForm.svelte';
  let showStyledForm = true;
</script>

<article>
  <h1>Welcome to Our Nostr App</h1>
  <button on:click={() => showStyledForm = !showStyledForm}>
    Toggle Form Style
  </button>
  {#if showStyledForm}
    <LoginForm />
  {:else}
    <UnstyledLoginForm />
  {/if}
  <!-- Other content specific to this page -->
</article>
