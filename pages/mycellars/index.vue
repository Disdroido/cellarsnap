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

  import { Doughnut } from 'vue-chartjs'
  import { ref } from 'vue';

  function createChartData() {
    const chartData = ref({
      labels: ['Vino Available', 'Vino Used'],
      datasets: [
        {
          label: 'Vino Amount',
          data: [10, 50],
          backgroundColor: [
            '#b82133',
            '#21b8a6'
          ],
          hoverOffset: 4
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    return {
      chartData,
      chartOptions
    };
  }
  const { chartData, chartOptions } = createChartData();

  onMounted(async () => {
    await accountStore.init();
    await notesStore.fetchNotesForCurrentUser();
  });
</script>
<template>
  <Sidebar />
  <UContainer :ui="{ base: 'md:ml-[250px] 2xl:mx-auto', padding: 'px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8' }">
    <div class="prose lg:prose-xl m-5">
      <h1 class="text-base-100 uppercase font-light">
        My Cellars
      </h1>
    </div>

    <div v-for="mycellar in mycellars" :key="mycellar.id" class="flex flex-row">
      <NuxtLink key="{mycellar.id}" :to="`/mycellars/${mycellar.id}`" class="w-full">
        <UCard :ui="{ base: 'grow border-2 border-accent text-base-100', background: 'bg-keppel-500 dark:bg-keppel-500', shadow: 'shadow-lg', ring: '', divide: '' }">
          <template #header>
            <div class="flex flex-row justify-between">
              <p class="uppercase text-2xl tracking-wide text-white">{{ mycellar.name }}</p>
              <button
                @click.prevent="notesStore.deleteNote(mycellar.id)"
                v-if="
                  activeMembership &&
                  (activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
                    activeMembership.access === ACCOUNT_ACCESS.OWNER)
                "
                class="bg-base-100 hover:bg-cardinal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue duration-200">
                Delete
              </button>
            </div>
          </template>

          <div class="flex flex-col md:flex-row gap-6">
            <!-- CELLAR LOCATION -->
            <div class="prose lg:prose-xl 2xl:w-1/4 shadow-xl bg-keppel-400 px-5 py-3 rounded-lg text-white">
              <h6>CELLAR LOCATION</h6>
              <div class="h-32"></div>
            </div>

            <!-- AMOUNT OF CELLAR RACKS -->
            <div class="prose lg:prose-xl 2xl:w-1/4 shadow-xl bg-keppel-400 px-5 py-3 rounded-lg text-white">
              <h6>CELLAR RACKS</h6>
              <div class="h-32"></div>
            </div>

            <!-- MEMBERS -->
            <div class="prose lg:prose-xl 2xl:w-1/4 shadow-xl bg-keppel-400 px-5 py-3 rounded-lg text-white">
              <h6>MEMBERS</h6>
              <div class="h-32"></div>
            </div>

            <!-- VINO AMOUNT OUT OF MEMBERSHIP AMOUNT -->
            <div class="prose lg:prose-xl 2xl:w-1/4 shadow-xl bg-keppel-400 px-5 py-3 rounded-lg text-white">
              <h6>VINO AMOUNT</h6>
              <div class="h-32">
                <Doughnut
                  :data="chartData"
                  :options="chartOptions"
                />
              </div>
            </div>
          </div>
        </UCard>
      </NuxtLink>

      <!-- <p class="text-gray-600 mb-4">{{ mycellar.name }}</p>
      <button
        @click.prevent="notesStore.deleteNote(mycellar.id)"
        v-if="
          activeMembership &&
          (activeMembership.access === ACCOUNT_ACCESS.ADMIN ||
            activeMembership.access === ACCOUNT_ACCESS.OWNER)
        "
        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
        Delete
      </button> -->
    </div>
  </UContainer>
</template>
