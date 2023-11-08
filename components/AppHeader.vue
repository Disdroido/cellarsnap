<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const user = useSupabaseUser();
  const navigationOpen = ref(false)
</script>

<template>
  <div class="navbar bg-bunker-950 h-20 z-10">
    <Notifications />

    <div class="flex-1">
      <NuxtLink to="/" class="pl-5 normal-case text-xl">CellarSnap</NuxtLink>
    </div>
    <div class="flex-1 flex-row justify-end justify-items-end">
      <ul class="menu menu-horizontal px-3 md:flex gap-3 justify-end hidden">
        <li v-if="user"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signin">Sign In</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signup">Start for free</NuxtLink></li>
      </ul>
      <UserAccount v-if="user" :user="user" />
      <UButton label="Open" @click="navigationOpen = true" class="md:hidden" />
    </div>
  </div>

  <USlideover v-model="navigationOpen">
    <UCard class="flex flex-col flex-1" :ui="{ background: 'bg-shark-950 dark:bg-shark-950', body: { base: 'flex-1' }, header: { padding: 'pt-7 px-4 sm:px-6' }, ring: '', divide: '' }">
      <template #header>
        <div class="flex justify-end">
          <button @click="navigationOpen = false" class="">
            <span class=" w-full space-x-2">
              <i class="w-5 h-5 text-right text-[#ebfaf2]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </i>
            </span>
          </button>
        </div>

        <NuxtLink to="/">
          <img src="~/assets/images/cellarsnap-logo-white-bg.png" class="w-32 h-auto mx-auto invert" />
        </NuxtLink>
      </template>

      <div class="h-full flex flex-col gap-4">
        <NuxtLink
          to="/dashboard"
          class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#B82133] hover:bg-[#B82133] duration-200"
          :class="{
            'bg-[#B82133]': $route.path === '/dashboard'
          }"
          @click="navigationOpen = false"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/mycellars"
          class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#B82133] hover:bg-[#B82133] duration-200"
          :class="{
            'bg-[#B82133]': $route.path === '/mycellars'
          }"
          @click="navigationOpen = false"
          >My Cellars</NuxtLink
        >
      </div>
    </UCard>
  </USlideover>
  <!-- <div class="navbar bg-white shadow-lg">
    <Notifications />
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
          <li v-if="user"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
          <li v-if="!user"><NuxtLink to="/signin">Sign In</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
        SupaNuxt SAAS
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-if="user"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signin">Sign In</NuxtLink></li>
        <li v-if="!user"><NuxtLink to="/signup">Start for free</NuxtLink></li>
        <li v-if="!user">
          <a
            title="github"
            href="https://github.com/JavascriptMick/supanuxt-saas">
            <Icon name="mdi:github" />
          </a>
        </li>
      </ul>
    </div>
    <UserAccount v-if="user" :user="user" />
  </div> -->

</template>
