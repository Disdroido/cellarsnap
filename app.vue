<template>
  <div class="flex flex-col min-h-screen bg-bunker-950">
    <AppHeader v-if="$route.name !== 'signin'" />
    <div class="flex-grow">
      <main>
        <NuxtPage />
      </main>
    </div>
    <AppFooter v-if="$route.name !== 'signin'" />
  </div>
</template>
