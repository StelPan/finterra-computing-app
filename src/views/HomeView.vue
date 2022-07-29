<template>
  <v-container fluid>
    <!-- Additional Office Dialog -->
    <v-dialog
        v-model="$store.getters.getAddOfficeDialogState"
        @click:outside="closeAddDialog"
        @keydown.esc="closeAddDialog"
    >
      <CreateOfficeForm />
    </v-dialog>

    <!-- Changing Office Dialog -->
    <v-dialog
        v-model="$store.getters.getUpdateOfficeDialogState"
        @click:outside="closeChangeDialog"
        @keydown.esc="closeChangeDialog"
    >
      <ViewOfficeForm :office-id="selectOfficeForChanging" />
    </v-dialog>

    <!-- Main Content-->
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <h1 class="mb-2 font-weight-medium">Сервис поиска офисов продаж</h1>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <h2 class="mb-2 font-weight-medium">Форма поиска</h2>
        <MapForm @search="search" />
      </v-col>
      <v-col cols="12" md="9">
        <h2 class="mb-2 font-weight-medium">Карта офисов</h2>
        <yandex-map
            :coords="settings.coords"
            :zoom="settings.zoom"
            :ymap-class="settings.class"
        >
          <ymap-marker
            v-for="(item, index) in offices"
            @click="selectOffice(item)"
            :icon="markerIconGenerate(item)"
            :coords="item.coords.split(' ').reverse()"
            :hint-content="item.name + (item.reason ? '\r\n' + item.reason : '')"
            :marker-id="index"
            :key="index"
          />
        </yandex-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MapForm from "../components/forms/MapForm";
import CreateOfficeForm from "@/components/forms/CreateOfficeForm";
import ViewOfficeForm from "@/components/forms/ViewOfficeForm";

import { loadYmap, yandexMap, ymapMarker } from 'vue-yandex-maps';

import { showDialog, closeDialog } from "@/services/dialogs";
import { geocode } from "@/services/yandex-geocode";
import { search } from "@/services/office";

export default {
  name: "HomeView",
  metaInfo: {
    title: "Сервис поиска офисов продаж | Финтерра"
  },
  data() {
    return {
      settings: {
        coords: [55.342900, 86.100876],
        zoom: 13,
        apiKey: "8d1e088e-acf9-446d-95de-2f58575c4c88",
        class: "h-100"
      },
      dialog: false,
      changeDialog: false,
      selectOfficeForChanging: null,
      offices: [],
    }
  },
  methods: {
    async search({ address }) {
      const result = await geocode(address);
      this.offices = await search(result);
      this.scrollMap(result);
    },
    scrollMap (geoObject) {
      const geoObjects = geoObject.response.GeoObjectCollection.featureMember;
      const coords = geoObjects[0].GeoObject.Point.pos;
      this.settings.coords = coords.split(" ").reverse();
    },
    selectOffice(item) {
      this.selectOfficeForChanging = item.id;
      this.openChangeDialog();
    },
    markerIconGenerate(item) {
      const icons = [
        require("../assets/work-marker.png"),
        require("../assets/not-working-marker.png")
      ];

      return {
        layout: 'default#imageWithContent',
            imageHref: item.reason ? icons[1] : icons[0],
            imageSize: [30, 30],
            imageOffset: [0, 0],
            contentOffset: [0, 15],
      }
    },
    openChangeDialog() {
      showDialog("updateOfficeDialog");
    },
    closeChangeDialog() {
      closeDialog("updateOfficeDialog");
    },
    openAddDialog() {
      showDialog("addOfficeDialog");
    },
    closeAddDialog() {
      closeDialog("addOfficeDialog");
    }
  },
  components: {
    CreateOfficeForm,
    ViewOfficeForm,
    MapForm,
    yandexMap,
    ymapMarker,
  },
  async mounted() {
    await loadYmap({ settings: this.settings, debug: true });
  }
}
</script>

<style>
.h-100 {
  height: 500px;
}

.ymap-class {
  height: 500px;
}

.v-dialog {
  background-color: white;
}
</style>