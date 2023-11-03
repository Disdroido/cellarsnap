<script setup lang="ts">
  const route = useRoute();
  const { $client } = useNuxtApp();
  const { data: mycellar } = await $client.myCellars.getNoteById.useQuery({
    id: +route.params.id,
  });
  console.log(mycellar)
</script>
<template>
  <div class="prose lg:prose-xl m-5">
    <h3>Note Detail {{ route.params.id }}</h3>
    <p>{{ mycellar?.mycellar.name }}</p>
  </div>
</template>
