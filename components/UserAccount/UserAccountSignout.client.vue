<script setup lang="ts">
  const supabase = useSupabaseAuthClient();
  const accountStore = useAccountStore();

  onMounted(async () => {
    await accountStore.init();
  });

  async function signout() {
    await supabase.auth.signOut();
    if (accountStore) {
      accountStore.signout();
    }
    navigateTo('/', { replace: true });
    router.push('/dashboard');
  }
</script>
<template>
  <a href="#" @click.prevent="signout()">Signout</a>
</template>
