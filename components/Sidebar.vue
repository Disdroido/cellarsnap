<script setup lang="ts">
  const user = useSupabaseUser();
  const isOpen = ref(true);
</script>

<template>
  <div>
    <div class="hidden sm:max-w-[220px] md:max-w-[250px] 2xl:max-w-[280px] fixed inset-0 md:flex bg-shark-900 z-20">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1', padding: 'sm:p-2' },
          background: 'bg-shark-900 dark:bg-shark-900',
          rounded: 'rounded-none',
          ring: '',
          divide: 'divide-y-0',
          shadow: ''
        }">
        <template #header>
          <NuxtLink to="/">
            <!-- <img src="~/assets/images/cellarsnap-logo-white-bg.png" class="w-32 h-auto mx-auto invert" /> -->
          </NuxtLink>
        </template>

        <div class="h-full flex flex-col gap-4">
          <NuxtLink
            to="/dashboard"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#B82133] hover:bg-[#B82133] duration-200"
            :class="{
              'bg-[#B82133]': $route.path === '/dashboard'
            }"
            >Dashboard</NuxtLink
          >
          <NuxtLink
            to="/mycellars"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#B82133] hover:bg-[#B82133] duration-200"
            :class="{
              'bg-[#B82133]': $route.path === '/mycellars'
            }"
            >My Cellars</NuxtLink
          >
        </div>
      </UCard>
    </div>
  </div>
</template>
