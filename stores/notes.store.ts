import { MyCellars } from '.prisma/client';
import { defineStore, storeToRefs } from 'pinia';
import { JSONArray } from 'superjson/dist/types';
import { Ref } from 'vue';

/*
Note) the Notes Store needs to be a 'Setup Store' (https://pinia.vuejs.org/core-concepts/#setup-stores)
because this enables the use of the watch on the Account Store
If the UI does not need to dynamically respond to a change in the active Account e.g. if state is always retrieved with an explicit fetch after onMounted.
then an Options store can be used.
*/
export const useNotesStore = defineStore('notes', () => {
  const accountStore = useAccountStore();
  const { activeAccountId } = storeToRefs(accountStore);

  let _mycellars: Ref<MyCellars[]> = ref([]);

  async function fetchNotesForCurrentUser() {
    const { $client } = useNuxtApp();
    const { mycellars } = await $client.mycellars.getForActiveAccount.query();
    if (mycellars) {
      _mycellars.value = mycellars;
    }
  }

  async function createNote(name: string) {
    const { $client } = useNuxtApp();
    const { mycellar } = await $client.mycellars.createNote.mutate({ name });
    if (mycellar) {
      _mycellars.value.push(mycellar);
    }
  }

  async function deleteNote(mycellar_id: string) {
    const { $client } = useNuxtApp();
    const { mycellar } = await $client.mycellars.deleteNote.mutate({ mycellar_id });
    if (mycellar) {
      _mycellars.value = _mycellars.value.filter(n => n.id !== mycellar.id);
    }
  }

  // async function generateAINoteFromPrompt(user_prompt: string) {
  //   const { $client } = useNuxtApp();
  //   const { noteText } = await $client.notes.generateAINoteFromPrompt.query({
  //     user_prompt
  //   });
  //   return noteText ? noteText : '';
  // }

  // if the active account changes, fetch notes again (i.e dynamic.. probabl overkill)
  watch(activeAccountId, async (val, oldVal) => {
    await fetchNotesForCurrentUser();
  });

  return {
    mycellars: _mycellars,
    fetchNotesForCurrentUser,
    createNote,
    deleteNote,
    // generateAINoteFromPrompt
  };
});
