<script setup lang="ts">
  const user = useSupabaseUser();
  const isOpen = ref(true);
</script>

<template>
  <div>
    <div class="hidden sm:max-w-[220px] md:max-w-[250px] 2xl:max-w-[280px] fixed inset-0 md:flex bg-bunker-950 z-20">
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
            <img src="~/assets/images/cellarsnap-logo-top.png" class="w-48 h-auto mx-auto invert" />
          </NuxtLink>
        </template>

        <div class="h-full flex flex-col gap-4">
          <NuxtLink
            to="/dashboard"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-tawny-port-900 hover:bg-tawny-port-900 duration-200"
            :class="{
              'bg-tawny-port-900': $route.path === '/dashboard'
            }"
            >Dashboard</NuxtLink
          >
          <NuxtLink
            to="/mycellars"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-tawny-port-900 hover:bg-tawny-port-900 duration-200"
            :class="{
              'bg-tawny-port-900': $route.path === '/mycellars'
            }"
            >My Cellars</NuxtLink
          >
        </div>
      </UCard>
    </div>
  </div>
</template>
