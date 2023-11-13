<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';

  definePageMeta({
    middleware: ['auth']
  });

  const accountStore = useAccountStore();
  const { activeMembership } = storeToRefs(accountStore);
  const myCellarsStore = useMyCellarsStore();
  const { mycellars } = storeToRefs(myCellarsStore); // ensure the notes list is reactive

  onMounted(async () => {
    await accountStore.init();
    await myCellarsStore.fetchMyCellarsForCurrentUser();
  });
</script>
<template>
  <div class="prose lg:prose-xl m-5">
    <div
        :key="myCellar.id"
        v-for="myCellar in mycellars"
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4">
        <p class="text-gray-600 mb-4">{{ myCellar.cellar_name }}</p>

      </div>
  </div>
</template>