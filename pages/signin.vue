<script setup lang="ts">
import { router } from "~/server/trpc/trpc";

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

  // const handleGoogleSignin = async () => {
  //   console.log('handleGoogleSignin');
  //   try {
  //     loading.value = true;
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //       options: {
  //         redirectTo: `${config.public.siteRootUrl}/confirm`
  //       }
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     notifyStore.notify(error, NotificationType.Error);
  //   } finally {
  //     loading.value = false;
  //   }
  // };

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
            class="w-full p-2 border border-gray-400 rounded-md text-shark-950"
            placeholder="Enter your email"
            required />
        </div>
        <div>
          <label for="password" class="block mb-2 font-bold">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full p-2 border border-gray-400 rounded-md text-shark-950"
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
          class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Sign in
        </button>
      </form>
    </div>
    <div class="flex ml-auto justify-end bg-tawny-port-900 h-full w-2/3 rounded-l-[150px] md:rounded-l-[300px]"></div>
  </div>
</template>
