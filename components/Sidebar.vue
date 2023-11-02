<script setup lang="ts">
  const user = useSupabaseUser();
  const isOpen = ref(true);

  const items = [{
    label: 'MY CELLARS',
    slot: 'my-cellars'
  }]
</script>

<template>
  <div>
    <div class="max-w-[250px] fixed inset-0 flex border-r-2 border-[#f3f3f3] bg-[#2D2F2E]">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1', padding: 'sm:p-2' },
          background: 'bg-[#2D2F2E]',
          rounded: 'rounded-none',
          ring: '',
          divide: 'divide-y-0',
          shadow: ''
        }">
        <template #header>
          <NuxtLink to="/">
            <img src="~/assets/images/cellarsnap-logo-white-bg.png" class="w-32 h-auto mx-auto invert" />
          </NuxtLink>
        </template>

        <div class="h-full flex flex-col gap-4">
          <NuxtLink
            to="/dashboard"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#ADC698] hover:bg-[#ADC698] duration-200"
            :class="{
              'bg-[#ADC698]': $route.path === '/dashboard'
            }"
            >Dashboard</NuxtLink
          >
          <NuxtLink
            to="/mycellars"
            class="w-full shadow-lg text-center rounded-md py-3 text-white border border-[#ADC698] hover:bg-[#ADC698] duration-200"
            :class="{
              'bg-[#ADC698]': $route.path === '/mycellars'
            }"
            >My Cellars</NuxtLink
          >
        </div>
      </UCard>
    </div>
  </div>
</template>
