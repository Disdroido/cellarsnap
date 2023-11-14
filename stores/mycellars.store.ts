import { MyCellars } from '.prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';
import { defineStore, storeToRefs } from 'pinia';

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

  async function createMyCellar(cellar_name: string, racks: JsonArray, bottles: JsonArray) {
    const { $client } = useNuxtApp();
    const { myCellar } = await $client.myCellars.createMyCellar.mutate({ cellar_name, racks, bottles });
    if (myCellar) {
      _myCellars.value.push(myCellar);
    }
  }

  async function deleteMyCellar(mycellar_id: string) {
    const { $client } = useNuxtApp();
    const { myCellar } = await $client.myCellars.deleteMyCellar.mutate({ mycellar_id });
    if (myCellar) {
      _myCellars.value = _myCellars.value.filter(n => n.id !== myCellar.id);
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
  watch(activeAccountId, async () => {
    await fetchMyCellarsForCurrentUser();
  });

  return {
    mycellars: _myCellars,
    fetchMyCellarsForCurrentUser,
    createMyCellar,
    deleteMyCellar,
    // generateAINoteFromPrompt
  };
});
