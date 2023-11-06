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
      <h1 class="font-light uppercase">{{ mycellar?.mycellar.name }}</h1>
    </div>

    <!-- <textarea
        v-model="bottles"
        type="text"
        class="w-full rounded-l-md py-2 px-4 border-gray-400 border-2 focus:outline-none focus:border-blue-500"
        rows="5"
        placeholder="Add a note..." />
      <button
        @click.prevent="addBottles()"
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Add
      </button> 
    -->
  </UContainer>
</template>
