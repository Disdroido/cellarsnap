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
  const newCellarName = ref('');

  async function addMyCellar() {
    await myCellarsStore.createMyCellar(newCellarName.value);
    newCellarName.value = '';
  }

  onMounted(async () => {
    await accountStore.init();
    await myCellarsStore.fetchMyCellarsForCurrentUser();
  });
</script>
<template>
  <Sidebar />
  <UContainer :ui="{ base: 'sm:ml-[220px] md:ml-[250px] 2xl:mx-auto'}">
    <div class="prose lg:prose-xl my-5 mx-auto">
      <div
        :key="myCellar.id"
        v-for="myCellar in mycellars"
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4">
        <NuxtLink :to="`/mycellars/${myCellar.id}`" class="text-gray-600 mb-4">{{ myCellar.cellar_name }}</NuxtLink>
        <button
          @click.prevent="myCellarsStore.deleteMyCellar(myCellar.id)"
          v-if="
            activeMembership &&
            (activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
              activeMembership.access === ACCOUNT_ACCESS.OWNER)
          "
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Delete
        </button>
      </div>
    </div>

    <div
      v-if="
        activeMembership &&
        (activeMembership.access === ACCOUNT_ACCESS.READ_WRITE ||
          activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
          activeMembership.access === ACCOUNT_ACCESS.OWNER)
      "
      class="w-full max-w-md mx-auto mb-3">
      <textarea
        v-model="newCellarName"
        type="text"
        class="w-full rounded-l-md py-2 px-4 border-gray-400 border-2 focus:outline-none focus:border-blue-500"
        rows="5"
        placeholder="Add a note..." />
      <div class="flex justify-evenly">
        <button
          @click.prevent="addMyCellar()"
          type="button"
          class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Add
        </button>
        <button
          v-if="activeMembership.account.features.includes('SPECIAL_FEATURE')"
          @click.prevent="addMyCellar()"
          type="button"
          class="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
          Gen
          <Icon name="mdi:magic" class="h-6 w-6" />
        </button>
      </div>
    </div>
  </UContainer>
</template>