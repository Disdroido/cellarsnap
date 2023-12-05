<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  const route = useRoute();
  const { $client } = useNuxtApp();
  const myCellarsStore = useMyCellarsStore();
  const { mycellars } = storeToRefs(myCellarsStore); // ensure the notes list is reactive
  import { v4 as uuidv4 } from 'uuid';

  const addBottlesIsOpen = ref(false)

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
    racks.value.push({ rackId: rackId.value, rackName: rackName.value, rackRows: rackRows.value, rackColumns: rackColumns.value, rackLocation: rackLocation.value, rackBottles: [] }); // Remove extra array brackets
    rackId.value = '';
    rackName.value = '';
    rackRows.value = 0;
    rackColumns.value = 0;
    rackLocation.value = '';
    rackBottles.value = [];
  };

  const openAddBottles = (rackId) => {
    addBottlesIsOpen.value = true;

    // Assign the rackId to selectedRack
    selectedRack.value = racks.value.find(r => r.rackId === rackId);
  };

  const newBottle = ref({ bottleId: uuidv4(), bottleName: '', bottleYear: 0, bottleType: '', bottleAmount: 0 });
  const addBottles = (rackId) => {
    const rack = racks.value.find(r => r.rackId === rackId);
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

  async function saveRacks() {
  await myCellarsStore.manageRacks(
    route.params.mycellars_id as string,
    racks.value
  );
}
</script>

<template>
  <div class="prose lg:prose-xl m-5">
    <h3>Note Detail {{ route.params.mycellars_id }}</h3>
    <div class="prose lg:prose-xl m-5">{{ mycellar?.mycellar.cellar_name }}</div>
    <p>{{ racks }}</p>
    <ul>
      <li v-for="rack in racks" :key="rack.rackId">
        <p>Rack ID: {{ rack.rackId }}</p>
        <p>Rack Name: {{ rack.rackName }}</p>
        <p>Rack Rows: {{ rack.rackRows }}</p>
        <p>Rack Columns: {{ rack.rackColumns }}</p>
        <p>Rack Location: {{ rack.rackLocation }}</p>
        <p>Rack Bottles: {{ rack.rackBottles }}</p>
        <UButton label="Add Bottles" @click="openAddBottles(rack.rackId)" />
      </li>
    </ul>

    <input type="text" v-model="rackName" placeholder="Enter custom rack name">
    <input type="number" v-model="rackRows" placeholder="Enter rack rows">
    <input type="number" v-model="rackColumns" placeholder="Enter rack columns">
    <input type="text" v-model="rackLocation" placeholder="Enter rack location">
    <input type="text" v-model="rackBottles" placeholder="Enter rack bottles">
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
            <div v-for="bottles in selectedRack.rackBottles" :key="bottleId">
              <p>{{ bottles.bottleName }}</p>
              <p>{{ bottles.bottleType }}</p>
              <p>{{ bottles.bottleYear }}</p>
              <p v-if="bottles.bottleAmount != 0 || bottles.bottleAmount === ''">{{ bottles.bottleAmount }}</p>
              <p v-else="">0</p>
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
</template>