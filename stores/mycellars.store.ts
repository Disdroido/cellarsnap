import { MyCellars } from '.prisma/client';
import { defineStore, storeToRefs } from 'pinia';
import { Ref } from 'vue';

/*
Note) the Notes Store needs to be a 'Setup Store' (https://pinia.vuejs.org/core-concepts/#setup-stores)
because this enables the use of the watch on the Account Store
If the UI does not need to dynamically respond to a change in the active Account e.g. if state is always retrieved with an explicit fetch after onMounted.
then an Options store can be used.
*/
export const useMyCellarsStore = defineStore('mycellars', () => {
  const accountStore = useAccountStore();
  const { activeAccountId } = storeToRefs(accountStore);

  let _myCellars: Ref<MyCellars[]> = ref([]);

  async function fetchMyCellarsForCurrentUser() {
    const { $client } = useNuxtApp();
    const { myCellars } = await $client.myCellars.getForActiveAccount.query();
    if (myCellars) {
      _myCellars.value = myCellars;
    }
  }

  // async function createNote(note_text: string) {
  //   const { $client } = useNuxtApp();
  //   const { note } = await $client.notes.createNote.mutate({ note_text });
  //   if (note) {
  //     _notes.value.push(note);
  //   }
  // }

  // async function deleteNote(note_id: number) {
  //   const { $client } = useNuxtApp();
  //   const { note } = await $client.notes.deleteNote.mutate({ note_id });
  //   if (note) {
  //     _notes.value = _notes.value.filter(n => n.id !== note.id);
  //   }
  // }

  // async function generateAINoteFromPrompt(user_prompt: string) {
  //   const { $client } = useNuxtApp();
  //   const { noteText } = await $client.notes.generateAINoteFromPrompt.query({
  //     user_prompt
  //   });
  //   return noteText ? noteText : '';
  // }

  // if the active account changes, fetch notes again (i.e dynamic.. probabl overkill)
  watch(activeAccountId, async (val, oldVal) => {
    await fetchMyCellarsForCurrentUser();
  });

  return {
    mycellars: _myCellars,
    fetchMyCellarsForCurrentUser,
    // createNote,
    // deleteNote,
    // generateAINoteFromPrompt
  };
});