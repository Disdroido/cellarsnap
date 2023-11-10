<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const user = useSupabaseUser();
  const navigationOpen = ref(false)
</script>

<template>
  <div class="navbar bg-bunker-950 h-20 z-10 sticky top-0 left-0 right-0">
    <Notifications />

    <div class="flex flex-1 flex-row content-center px-5">
      <div class="flex-1">
        <NuxtLink to="/" class="normal-case text-xl">CellarSnap</NuxtLink>
      </div>
      <div class="flex flex-1 flex-row justify-end justify-items-end items-center gap-4 md:gap-0">
        <ul class="menu menu-horizontal px-3 md:flex gap-3 justify-end hidden">
          <li v-if="user"><NuxtLink to="/dashboard" class="hover:text-tawny-port-600 hover:bg-transparent">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/pricing" class="hover:text-tawny-port-600 hover:bg-transparent">Pricing</NuxtLink></li>
          <li v-if="!user"><NuxtLink to="/signin" class="hover:text-tawny-port-600 hover:bg-transparent">Sign In</NuxtLink></li>
          <li v-if="!user"><NuxtLink to="/signup" class="hover:text-tawny-port-600 hover:bg-transparent">Start for free</NuxtLink></li>
        </ul>
        <UserAccount v-if="user" :user="user" />
        <button @click="navigationOpen = true" class="md:hidden flex flex-col gap-[6px] h-7 w-7 text-[#ebfaf2] justify-center">
          <span class="w-7 h-0.5 text-[#ebfaf2] bg-current transform duration-150"></span>
          <span class="w-5 h-0.5 text-[#ebfaf2] bg-current hover:w-7 hover:text-tawny-port-600 transform duration-150"></span>
          <span class="w-7 h-0.5 text-[#ebfaf2] bg-current transform duration-150"></span>
        </button>
      </div>
    </div>
  </div>

  <USlideover v-model="navigationOpen">
    <UCard class="flex flex-col flex-1" :ui="{ background: 'bg-shark-950 dark:bg-shark-950', rounded: '', body: { base: 'flex-1' }, header: { padding: 'pt-7 px-4 sm:px-6' }, ring: '', divide: '' }">
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
          <!-- <img src="~/assets/images/cellarsnap-logo-white-bg.png" class="w-32 h-auto mx-auto invert" /> -->
        </NuxtLink>
      </template>

      <div class="h-full flex flex-col gap-4">
        <NuxtLink
          to="/dashboard"
          class="w-full shadow-lg text-center rounded-md py-3 text-white border-2 border-tawny-port-900 hover:bg-tawny-port-900 duration-200"
          :class="{
            'bg-tawny-port-900': $route.path === '/dashboard'
          }"
          @click="navigationOpen = false"
          v-if="user"
          >Dashboard
        </NuxtLink>
        <NuxtLink
          to="/mycellars"
          class="w-full shadow-lg text-center rounded-md py-3 text-white border-2 border-tawny-port-900 hover:bg-tawny-port-900 duration-200"
          :class="{
            'bg-tawny-port-900': $route.path === '/mycellars'
          }"
          @click="navigationOpen = false"
          v-if="user"
          >My Cellars
          </NuxtLink>
        <NuxtLink to="/pricing" 
          class="w-full shadow-lg text-center rounded-md py-3 text-white border-2 border-tawny-port-900 hover:bg-tawny-port-900 duration-200" 
          :class="{
            'bg-tawny-port-900': $route.path === '/pricing'
          }"
          @click="navigationOpen = false"
          >Pricing
        </NuxtLink>
        <div class="flex flex-col gap-4 justify-end h-full">
          <NuxtLink to="/signin" 
            class="w-full shadow-lg text-center rounded-md py-3 text-white border-2 border-tawny-port-900 hover:bg-tawny-port-900 duration-200" 
            :class="{
              'bg-tawny-port-900': $route.path === '/signin'
            }"
            v-if="!user" @click="navigationOpen = false"
            >Sign In
          </NuxtLink>
          <NuxtLink to="/signup" 
            class="w-full shadow-lg text-center rounded-md py-3 text-white bg-tawny-port-900 hover:bg-tawny-port-900 duration-200"
            v-if="!user" @click="navigationOpen = false"
            >Start for free
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </USlideover>
</template>
