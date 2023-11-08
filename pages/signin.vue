<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseAuthClient();

  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();

  const loading = ref(false);
  const email = ref('');
  const password = ref('');

  const handleStandardSignin = async () => {
    console.log(
      `handleStandardSignin email.value:${email.value}, password.value:${password.value}`
    );
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
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
        provider: 'google'
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
      router.push('/dashboard');
    }
  });
</script>
<template>
  <div class="flex flex-row h-screen">
    <div class="w-1/3 h-full">
      <div class="absolute top-1/2 left-1/2 xl:left-1/3 -translate-x-1/2 -translate-y-1/2 xl:-translate-x-1/3 z-10 w-full max-w-md p-6 space-y-6 bg-bunker-900 rounded-[40px] drop-shadow-xl shadow-lg">
        <NuxtLink to="/">
          <img src="~/assets/images/cellarsnap-logo-white-bg.png" class="w-32 h-auto mx-auto invert" />
        </NuxtLink>
        <div class="prose lg:prose-xl m-5">
          <h3 class="uppercase font-light text-center">
            SIGN IN
          </h3>
        </div>

        <div class="flex flex-row gap-4 w-4/6 mx-auto">
          <button
            @click="handleGoogleSignin()"
            class="w-full py-4 text-white border-2 border-cardinal-700 rounded-md hover:bg-cardinal-700 duration-150">
            <span class="flex items-center justify-center space-x-2">
              <Icon name="fa-brands:google" class="w-6 h-6" />
            </span>
          </button>

          <button
            @click="handleGoogleSignin()"
            class="w-full py-4 text-white border-2 border-cardinal-700 rounded-md hover:bg-cardinal-700 duration-150">
            <span class="flex items-center justify-center space-x-2">
              <Icon name="fa-brands:facebook-f" class="w-6 h-6" />
            </span>
          </button>

          <button
            @click="handleGoogleSignin()"
            class="w-full py-4 text-white border-2 border-cardinal-700 rounded-md hover:bg-cardinal-700 duration-150">
            <span class="flex items-center justify-center space-x-2">
              <Icon name="fa-brands:github" class="w-6 h-6" />
            </span>
          </button>


        </div>
        
        <form @submit.prevent="handleStandardSignin" class="space-y-4">
          <div>
            <label for="email" class="block mb-2 font-bold">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              class="w-full p-4 border border-gray-400 focus:outline-none ring-0 rounded-md bg-bunker-900"
              placeholder="Enter your email"
              required />
          </div>
          <div>
            <label for="password" class="block mb-2 font-bold">Password</label>
            <input
              v-model="password"
              id="password"
              type="password"
              class="w-full p-4 border border-gray-400 focus:outline-none ring-0 rounded-md bg-bunker-900"
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
            class="w-full py-4 uppercase text-white bg-tawny-port-900 rounded-lg cursor-pointer hover:bg-tawny-port-950 duration-150">
            SIGN IN
          </button>
        </form>
        
      </div>
    </div>
    
    <div class="w-2/3 h-full bg-gradient-to-r from-tawny-port-900 to-tawny-port-950 rounded-l-[200px] drop-shadow-xl flex flex-col justify-center content-center">
      <div class="w-full lg:w-2/3 2xl:w-1/3 text-center md:ml-auto 2xl:mx-auto">
        <div class="prose lg:prose-xl">
          <p class="text-5xl uppercase font-light text-center">
            CIAO<br />
            <span class="text-2xl">
              VINO LOVER!
            </span>
          </p>
          <p>
            Click the button bellow to start managing your wine cellar at the click of a button... Literally!
          </p>
          <NuxtLink to="/signup" class="block w-full py-3 mt-10 no-underline uppercase text-[#ebfaf2] border-2 border-[#ebfaf2] rounded-lg cursor-pointer hover:bg-[#ebfaf2] hover:text-bunker-950 duration-150">SIGN UP</NuxtLink>
        </div>
      </div>
    </div>
    <!-- <div class="w-full max-w-md p-6 space-y-6 bg-bunker-900 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center">Sign in</h1>
      <form @submit.prevent="handleStandardSignin" class="space-y-4">
        <div>
          <label for="email" class="block mb-2 font-bold">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="w-full p-2 border border-gray-400 rounded-md bg-bunker-900"
            placeholder="Enter your email"
            required />
        </div>
        <div>
          <label for="password" class="block mb-2 font-bold">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full p-2 border border-gray-400 rounded-md bg-bunker-900"
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
      <p class="text-center">or</p>
      <button
        @click="handleGoogleSignin()"
        class="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
        <span class="flex items-center justify-center space-x-2">
          <Icon name="fa-brands:google" class="w-5 h-5" />
          <span>Sign in with Google</span>
        </span>
      </button>
    </div> -->
  </div>
</template>
