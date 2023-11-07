<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';

  definePageMeta({
    middleware: ['auth']
  });

  const accountStore = useAccountStore();
  const { activeMembership } = storeToRefs(accountStore);
  const notesStore = useNotesStore();
  const { mycellars } = storeToRefs(notesStore); // ensure the notes list is reactive
  const name = ref('');

  async function addNote() {
    await notesStore.createNote(name.value);
    name.value = '';
  }

  // async function genNote() {
  //   const genNoteText = await notesStore.generateAINoteFromPrompt(
  //     newNoteText.value
  //   );
  //   newNoteText.value = genNoteText;
  // }

  onMounted(async () => {
    await accountStore.init();
    await notesStore.fetchNotesForCurrentUser();
  });
</script>
<template>
  <Sidebar />
  
  <UContainer :ui="{ base: 'md:ml-[250px] 2xl:mx-auto' }">
    <div class="prose lg:prose-xl m-5">
      <h1 class="uppercase font-light">
        Dashboard
      </h1>
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
        v-model="name"
        type="text"
        class="w-full rounded-l-md py-2 px-4 border-gray-400 border-2 focus:outline-none focus:border-blue-500"
        rows="5"
        placeholder="Add a note..." />
      <div class="flex justify-evenly">
        <button
          @click.prevent="addNote()"
          type="button"
          class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          Add
        </button>
      </div>
    </div>

    <div class="w-full max-w-md">
      <div
        v-for="mycellar in mycellars" :key="mycellar.id"
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4">
        <p class="text-gray-600 mb-4">{{ mycellar.name }}</p>
        <button
          @click.prevent="notesStore.deleteNote(mycellar.id)"
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
  </UContainer>
</template>
