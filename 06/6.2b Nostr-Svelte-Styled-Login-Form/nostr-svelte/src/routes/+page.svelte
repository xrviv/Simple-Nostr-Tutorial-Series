<script>
    import LoginForm from '../components/LoginForm.svelte';
    import UnstyledLoginForm from '../components/UnstyledLoginForm.svelte';
    import button from "$lib/Button.svelte";
    let showStyledForm = true;
  </script>
  
  <article>
    
    <h1>Welcome to Our Nostr App</h1>
    <button on:click={() => showStyledForm = !showStyledForm} class="flowbite-button">
      Toggle Form Style
    </button>

    
    {#if showStyledForm}
      <LoginForm />
    {:else}
      <UnstyledLoginForm />
    {/if}
  </article>
  
  