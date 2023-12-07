<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();

  const loading = ref(false);
  const email = ref('');
  const password = ref('');
  const config = useRuntimeConfig();

  const handleStandardSignin = async () => {
    console.log(
      `handleStandardSignin email.value:${email.value}, password.value:${password.value}`
    );
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      });
      if (error) throw error;
    } catch (error) {
      notifyStore.notify(error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleSignin = async () => {
    console.log('handleGoogleSignin');
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${config.public.siteRootUrl}/confirm`
        }
      });
      if (error) throw error;
    } catch (error) {
      notifyStore.notify(error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };

  watchEffect(async () => {
    if (user.value) {
      await accountStore.init();
      navigateTo('/dashboard', { replace: true });
    }
  });
</script>
<template>
  <div class="flex flex-row w-full h-screen relative">
    <div class="absolute left-1/2 md:left-1/3 top-1/2 -translate-x-1/2 md:-translate-x-1/3 -translate-y-1/2 w-11/12 md:w-full max-w-md p-6 space-y-6 rounded-lg shadow-2xl bg-shark-900">
      <h1 class="text-3xl font-bold text-center">Sign in</h1>
      <form @submit.prevent="handleStandardSignin" class="space-y-4">
        <div>
          <label for="email" class="block mb-2 font-bold">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="w-full p-2 border border-gray-400 rounded-md"
            placeholder="Enter your email"
            required />
        </div>
        <div>
          <label for="password" class="block mb-2 font-bold">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full p-2 border border-gray-400 rounded-md"
            placeholder="Enter your password"
            required />
        </div>
        <NuxtLink
          id="forgotPasswordLink"
          to="/forgotpassword"
          class="text-right block"
          >Forgot your password?</NuxtLink
        >
        <button
          :disabled="loading || password === ''"
          type="submit"
          class="flex flex-row gap-2 text-center justify-center w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Sign in <svg v-if="loading === true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="0" y="0" width="24" height="24" fill="none" stroke="none" /><path fill="none" stroke="currentColor" stroke-dasharray="15" stroke-dashoffset="15" stroke-linecap="round" stroke-width="2" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
        </button>
      </form>
    </div>
    <div class="flex ml-auto justify-end bg-tawny-port-900 h-full w-2/3 rounded-l-[150px] md:rounded-l-[300px]"></div>
  </div>
</template>
