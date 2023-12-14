<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';
  import type { FormError, FormSubmitEvent } from '#ui/types'

  definePageMeta({
    middleware: ['auth']
  });

  const addCellarModalOpen = ref(false)

  const accountStore = useAccountStore();
  const { activeMembership } = storeToRefs(accountStore);
  const myCellarsStore = useMyCellarsStore();
  const { mycellars } = storeToRefs(myCellarsStore); // ensure the notes list is reactive
  const newCellarName = ref('');

  async function addMyCellar() {
    await myCellarsStore.createMyCellar(newCellarName.value);
    newCellarName.value = '';
  }

  const state = reactive({
    newCellarName: undefined
  })

  const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.newCellarName) errors.push({ path: 'newCellarName', message: 'Required' })
    return errors
  }

  async function onSubmit (event: FormSubmitEvent<any>) {
    await myCellarsStore.createMyCellar(state.newCellarName);
    addCellarModalOpen.value = false
    console.log(event.data)
  }

  onMounted(async () => {
    await accountStore.init();
    await myCellarsStore.fetchMyCellarsForCurrentUser();
  });
</script>
<template>
  <Sidebar />
  <UContainer :ui="{ base: 'sm:ml-[220px] md:ml-[250px] 2xl:mx-auto'}">
    <div class=" my-5 mx-auto">
      <div class="flex flex-row justify-between content-center">
        <h2>My Cellars</h2>
        <UButton :ui="{ base: 'w-full md:w-auto' }" label="Create Your Cellar" @click="addCellarModalOpen = true" />
      </div>

      <div class="mt-10">
        <NuxtLink :to="`/mycellars/${myCellar.id}`"
          :key="myCellar.id"
          v-for="myCellar in mycellars"
          class="block relative w-full h-auto bg-white rounded-lg shadow-lg text-center px-6 py-8 md:my-4">
          <div class="flex flex-col gap-4">
            <div class="flex flex-row justify-between items-center">
              <h4><NuxtLink :to="`/mycellars/${myCellar.id}`" class="text-gray-600">{{ myCellar.cellar_name.toUpperCase() }}</NuxtLink></h4>
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
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </UContainer>

  <UModal v-model="addCellarModalOpen" width :ui="{ width: 'w-screen h-screen md:h-auto sm:max-w-lg lg:max-w-4xl', padding: 'p-0' }">
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        }
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Create Your Cellar
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="addCellarModalOpen = false" />
        </div>
      </template>

      <div class="h-full">
        <div
          v-if="
            activeMembership &&
            (activeMembership.access === ACCOUNT_ACCESS.READ_WRITE ||
              activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
              activeMembership.access === ACCOUNT_ACCESS.OWNER)
          "
          class="w-full max-w-md mx-auto mb-3">
          <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Your Cellar Name" name="newCellarName">
              <UInput v-model="state.newCellarName" />
            </UFormGroup>

            <UButton type="submit">
              Submit
            </UButton>
          </UForm>
        </div>
      </div>
    </UCard>
  </UModal>
</template>