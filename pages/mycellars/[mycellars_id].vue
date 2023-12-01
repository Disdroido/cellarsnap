<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  const route = useRoute();
  const { $client } = useNuxtApp();
  const myCellarsStore = useMyCellarsStore();
const { mycellars } = storeToRefs(myCellarsStore); // ensure the notes list is reactive
import { v4 as uuidv4 } from 'uuid';

  const { data: mycellar } = await $client.myCellars.getById.useQuery({
    mycellar_id: route.params.mycellars_id as string
  });

const racks = ref(mycellar.value.mycellar.racks);
  const rackId = ref(uuidv4());
  const rackName = ref('');
  const rackRows = ref(0);
  const rackColumns = ref(0);
  const rackLocation = ref('');
  const rackBottles = ref('');

  const addRack = () => {
    racks.value.push({ rackId: rackId.value, rackName: rackName.value, rackRows: rackRows.value, rackColumns: rackColumns.value, rackLocation: rackLocation.value, rackBottles: rackBottles.value }); // Remove extra array brackets
    rackId.value = '';
    rackName.value = '';
    rackRows.value = 0;
    rackColumns.value = 0;
    rackLocation.value = '';
    rackBottles.value = '';
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
      </li>
    </ul>

    <input type="text" v-model="rackName" placeholder="Enter custom rack name">
    <input type="number" v-model="rackRows" placeholder="Enter rack rows">
    <input type="number" v-model="rackColumns" placeholder="Enter rack columns">
    <input type="text" v-model="rackLocation" placeholder="Enter rack location">
    <input type="text" v-model="rackBottles" placeholder="Enter rack bottles">
    <button @click="addRack">Add Rack</button>

    <button @click="saveRacks">Save Racks</button>
  </div>
</template>