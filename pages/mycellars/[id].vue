<script setup lang="ts">
  const route = useRoute();
  const { $client } = useNuxtApp();
  const { data: mycellar } = await $client.mycellars.getById.useQuery({
    mycellar_id: route.params.id.toString()
  });
</script>
<template>
  <Sidebar />
  <UContainer :ui="{ base: 'md:ml-[250px] 2xl:mx-auto', padding: 'px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8' }">
    <div class="prose lg:prose-xl m-5">
      <h1 class="text-base-100 font-light uppercase">{{ mycellar?.mycellar.name }}</h1>
    </div>
  </UContainer>
</template>
