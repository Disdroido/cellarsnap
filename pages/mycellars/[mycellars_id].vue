<script setup lang="ts">
  const route = useRoute();
  const { $client } = useNuxtApp();
  const { data: mycellar } = await $client.myCellars.getById.useQuery({
    mycellar_id: route.params.mycellar_id
  });
</script>
<template>
  <div class="prose lg:prose-xl m-5">
    <h3>Note Detail {{ route.params.mycellar_id }}</h3>
    <div class="prose lg:prose-xl m-5">{{ mycellar?.mycellar.name }}</div>
  </div>
</template>
