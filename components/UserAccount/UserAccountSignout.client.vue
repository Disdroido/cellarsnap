<script setup lang="ts">
  const supabase = useSupabaseClient();
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
  }
</script>
<template>
  <NuxtLink :to="'/'" @click.prevent="signout()">Signout</NuxtLink>
</template>
