<script>
  import { Page, Link, BlockTitle} from "framework7-svelte";
  import store from '../js/store'
  import { onMount } from 'svelte';
  
  onMount(() => {
    // load users when component mounted
    store.dispatch('changeisOpen');
  });
</script>

<!-- login.svelte -->
<Page name="register">
  <BlockTitle>HALAMAN REGISTER</BlockTitle>
  <Link href="/" text="Back To Login" color="blue"></Link>
</Page>
