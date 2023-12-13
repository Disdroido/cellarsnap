<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';

  definePageMeta({
    middleware: ['auth']
  });

  const accountStore = useAccountStore();
  const { activeMembership } = storeToRefs(accountStore);
  // const notesStore = useNotesStore();
  // const { notes } = storeToRefs(notesStore); // ensure the notes list is reactive
  // const newNoteText = ref('');

  // async function addNote() {
  //   await notesStore.createNote(newNoteText.value);
  //   newNoteText.value = '';
  // }

  // async function genNote() {
  //   const genNoteText = await notesStore.generateAINoteFromPrompt(
  //     newNoteText.value
  //   );
  //   newNoteText.value = genNoteText;
  // }

  // onMounted(async () => {
  //   await accountStore.init();
  //   await notesStore.fetchNotesForCurrentUser();
  // });
</script>
<template>
  <Sidebar />
  <UContainer :ui="{ base: 'sm:ml-[220px] md:ml-[250px] 2xl:mx-auto'}">
    <div class="text-center mb-12">
      <h2
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        Notes Dashboard
      </h2>
    </div>

    <div
      v-if="
        activeMembership &&
        (activeMembership.access === ACCOUNT_ACCESS.READ_WRITE ||
          activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
          activeMembership.access === ACCOUNT_ACCESS.OWNER)
      "
      class="w-full max-w-md mx-auto mb-3">
    </div>

    <!-- <div class="w-full max-w-md">
      <div
        v-for="note in notes"
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4">
        <p class="text-gray-600 mb-4">{{ note.note_text }}</p>
        <button
          @click.prevent="notesStore.deleteNote(note.id)"
          v-if="
            activeMembership &&
            (activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
              activeMembership.access === ACCOUNT_ACCESS.OWNER)
          "
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Delete
        </button>
      </div>
    </div> -->
  </UContainer>
</template>
