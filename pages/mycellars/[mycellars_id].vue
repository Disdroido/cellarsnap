<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  const route = useRoute();
  const { $client } = useNuxtApp();
  const myCellarsStore = useMyCellarsStore();
  const { mycellars } = storeToRefs(myCellarsStore); // ensure the notes list is reactive
  import { v4 as uuidv4 } from 'uuid';

  definePageMeta({
    middleware: ['auth']
  });

  const addBottlesIsOpen = ref(false);
  const rackModal = ref(false)

  const { data: mycellar } = await $client.myCellars.getById.useQuery({
    mycellar_id: route.params.mycellars_id as string
  });

  const racks = ref(mycellar.value.mycellar.racks);
  const selectedRack = ref(null);

  const rackId = ref(uuidv4());
  const rackName = ref('');
  const rackRows = ref(0);
  const rackColumns = ref(0);
  const rackLocation = ref('');
  const rackBottles = ref([]);

  const addRack = () => {
    racks.value.push({ rackId: rackId.value, rackName: rackName.value, rackRows: rackRows.value, rackColumns: rackColumns.value, rackLocation: rackLocation.value, rackBottles: [newBottle.value] }); // Remove extra array brackets
    rackId.value = '';
    rackName.value = '';
    rackRows.value = 0;
    rackColumns.value = 0;
    rackLocation.value = '';
    rackBottles.value = [];
  };

  const openAddBottles = (rackId: string | null) => {
    addBottlesIsOpen.value = true;
    selectedRack.value = racks.value.find(r => r.rackId === rackId) ?? null;
  };

  const newBottle = ref({ bottleId: uuidv4(), bottleName: '', bottleYear: 0, bottleType: '', bottleAmount: 0 });
  const addBottles = (rackId: string | null) => {
    const rack: { rackBottles: any[] } | null = racks.value.find(r => r.rackId === rackId);
    if (rack) {
      if (!rack.rackBottles) {
        rack.rackBottles = [];
      }
      rack.rackBottles.push(newBottle.value);
      newBottle.value = { bottleId: '', bottleName: '', bottleYear: 0, bottleType: '', bottleAmount: 0 };
      saveRacks();
    }
    console.log(rack)
  };

  const deleteRack = (rackId: string | null) => {
  const index = racks.value.findIndex(r => r.rackId === rackId);
  if (index !== -1) {
    racks.value.splice(index, 1);
    saveRacks();
  }
};

  async function saveRacks() {
    await myCellarsStore.manageRacks(
      route.params.mycellars_id as string,
      racks.value
    );
  }

  const rackBottlesColumns = [{
    key: 'bottleName',
    label: 'Vino Name'
  }, {
    key: 'bottleType',
    label: 'Vino Type'
  }, {
    key: 'bottleYear',
    label: 'Vino Year',
    sortable: true,
    direction: 'desc'
  }, {
    key: 'bottleAmount',
    label: 'Vino Amount',
    sortable: true
  }]

  const q = ref('')
  const modalRack = ref([] as any[]);
  const openRackModal = (rackId: string | null) => {
    rackModal.value = true;
  
    const rack = racks.value.find(r => r.rackId === rackId);
    modalRack.value = rack ? rack.rackBottles : [] as any[];
  };
  
  const filteredRows = computed(() => {
    if (!q.value) {
      return modalRack.value as any[];
    }

    return modalRack.value.filter((bottle) => {
      return Object.values(bottle).some((value) => {
        return String(value).toLowerCase().includes(q.value.toLowerCase())
      }) || 
      bottle.bottleType.toLowerCase().includes(q.value.toLowerCase()) || 
      String(bottle.bottleYear).includes(q.value.toLowerCase())
    })
  })
</script>

<template>
  <div class="container mx-auto">
    <div class="w-full">
      <div class="p-5 w-full">
        <div class="flex flex-col md:flex-row justify-between">
          <h4 class="">{{ mycellar?.mycellar.cellar_name.toUpperCase() }}</h4>
          <UButton :ui="{ base: 'w-full md:w-auto' }" label="Add New Rack" @click="openAddBottles(rack.rackId)" />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-5 bg-slate-600" v-for="rack in racks" :key="rack.rackId">
            <div @click="openRackModal(rack.rackId)" class="cursor-pointer">
              <h3 class="!mt-0 prose lg:prose-xl">Rack Name: {{ rack.rackName }}</h3>
              <p class="prose lg:prose-xl">Rack Rows: {{ rack.rackRows }}</p>
              <p class="prose lg:prose-xl">Rack Columns: {{ rack.rackColumns }}</p>
              <p class="prose lg:prose-xl">Rack Location: {{ rack.rackLocation }}</p>
              <p class="prose lg:prose-xl">Rack Bottles: {{ rack.rackBottles.length }}</p>
              <UButton label="Add Bottles" @click="openAddBottles(rack.rackId)" />
              <UButton label="Delete Rack"  @click="deleteRack(rack.rackId)" />
            </div>

            <UModal v-model="rackModal" width :ui="{ width: 'w-screen h-screen md:h-auto sm:max-w-lg lg:max-w-4xl xl:max-w-7xl', padding: 'p-0' }">
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
                      {{ rack.rackName.toUpperCase() }} | RACK
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="rackModal = false" />
                  </div>
                </template>

                <div class="h-full">
                  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                    <UInput v-model="q" placeholder="Filter people..." />
                  </div>
                  <UTable :rows="filteredRows" :columns="rackBottlesColumns" class="w-full" />
                </div>
              </UCard>
            </UModal>
          </div>
        </div>

        <input type="text" v-model="rackName" placeholder="Enter custom rack name">
        <input type="number" v-model="rackRows" placeholder="Enter rack rows">
        <input type="number" v-model="rackColumns" placeholder="Enter rack columns">
        <input type="text" v-model="rackLocation" placeholder="Enter rack location">
        <button @click="addRack">Add Rack</button>

        <button @click="saveRacks">Save Racks</button>

        <USlideover v-model="addBottlesIsOpen" prevent-close :ui="{ overlay: { background: 'bg-gray-800/75 dark:bg-gray-800/75' } }">
          <UCard class="flex flex-col flex-1 rounded-none" :ui="{ body: { base: 'flex-1' }, background: 'bg-gray-900', ring: '', divide: 'divide-y divide-gray-100' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 uppercase">
                  Add Vino To {{ selectedRack.rackName }}
                </h3>
                <UButton color="black" variant="outline" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="addBottlesIsOpen = false" />
              </div>
            </template>

            <div class="h-full">
              <div v-if="selectedRack">
                <div v-for="bottles in selectedRack.rackBottles" :key="bottles.bottleId">
                  <p>{{ bottles.bottleName }}</p>
                  <p>{{ bottles.bottleType }}</p>
                  <p>{{ bottles.bottleYear }}</p>
                  <p v-if="bottles.bottleAmount != 0 || bottles.bottleAmount === ''">{{ bottles.bottleAmount }}</p>
                  <p v-else>0</p>
                </div>
              </div>

              <div v-if="selectedRack">
                <form @submit.prevent="addBottles(selectedRack.rackId, newBottle)">
                  <label>
                    Bottle Name:
                    <input type="text" v-model="newBottle.bottleName" class="bg-transparent border-primary border-2" required>
                  </label>
                  <label>
                    Bottle Type:
                    <input type="text" v-model="newBottle.bottleType" class="bg-transparent border-primary border-2" required>
                  </label>
                  <label>
                    Bottle Year:
                    <input type="number" v-model="newBottle.bottleYear" class="bg-transparent border-primary border-2" required>
                  </label>
                  <label>
                    Bottle Amount:
                    <input type="number" v-model="newBottle.bottleAmount" class="bg-transparent border-primary border-2" required>
                  </label>
                  <button type="submit">Add Bottle</button>
                </form>
              </div>
            </div>
          </UCard>
        </USlideover>
      </div>
    </div>
  </div>
</template>