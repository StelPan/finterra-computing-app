<template>
  <v-container fluid>
    <!-- Additional Office Dialog -->
    <v-dialog
        v-model="$store.getters.getAddOfficeDialogState"
        @click:outside="closeDialog('addOfficeDialog')"
        @keydown.esc="closeDialog('addOfficeDialog')"
    >
      <CreateOfficeForm />
    </v-dialog>

    <!-- Changing Office Dialog -->
    <v-dialog
        v-model="$store.getters.getUpdateOfficeDialogState"
        @click:outside="closeDialog('updateOfficeDialog')"
        @keydown.esc="closeDialog('updateOfficeDialog')"
    >
      <ViewOfficeForm :office-id="selectOfficeForChanging" />
    </v-dialog>

    <!-- Create Region Dialog -->
    <v-dialog
        v-model="$store.getters.getCreateRegionDialogState"
        @click:outside="closeDialog('createRegionDialog')"
        @keydown.esc="closeDialog('createRegionDialog')"
    >
      <div class="px-4 py-4">
        <CreateRegionForm @create="createRegions"/>
      </div>
    </v-dialog>

    <!-- Main Content-->
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
          <h1 class="mb-2 font-weight-medium">Сервис поиска офисов продаж</h1>
          <v-menu
              left
              bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                  @click="showDialog('createRegionDialog')"
              >
                <v-list-item-title>
                  Добавить регион
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                  @click="showDialog('createRegionDialog')"
              >
                <v-list-item-title>
                  Добавить офис
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
import CreateRegionForm from "@/components/forms/CreateRegionForm";
import ViewOfficeForm from "@/components/forms/ViewOfficeForm";

import { loadYmap, yandexMap, ymapMarker } from 'vue-yandex-maps';

import { geocode } from "@/services/yandex-geocode";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  metaInfo: {
    title: "Сервис поиска офисов продаж | Финтерра"
  },
  data() {
    return {
      settings: {
        coords: [55.342900, 86.100876],
        apiKey: "8d1e088e-acf9-446d-95de-2f58575c4c88",
        class: "h-100",
        zoom: 13,
      },
      dialog: false,
      changeDialog: false,
      selectOfficeForChanging: null,
    }
  },
  methods: {
    ...mapActions({
      createRegion: "fetchCreateRegion",
      searchOffices: "fetchSearchOffices",
      showDialog: "showDialog",
      closeDialog: "closeDialog",
    }),
    async search({ address }) {
      const result = await geocode(address);

      const { featureMember } = result.response.GeoObjectCollection;
      if (!Array.isArray(featureMember)) {
        alert("Регион не найден");
        return;
      }

      const { Address, AddressDetails } = featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData;
      const { formatted } = Address;
      const { AdministrativeAreaName } = AddressDetails.Country.AdministrativeArea;

      await this.searchOffices({
        address: formatted,
        region: AdministrativeAreaName,
      });

      this.viewMapData(result);
    },
    async createRegions (data) {
      const { name, isOnlyRepeatClient, isOnlyOnline, isWork } = data;
      const result = await geocode(name);

      const { featureMember } = result.response.GeoObjectCollection;
      if (!Array.isArray(featureMember)) {
        alert("Регион не найден");
        return;
      }

      const { AdministrativeAreaName } = featureMember[0].GeoObject
          .metaDataProperty
          .GeocoderMetaData
          .AddressDetails
          .Country
          .AdministrativeArea;

      await this.createRegion({
        is_only_online: isOnlyOnline,
        is_repeat_client: isOnlyRepeatClient,
        is_work_region: isWork,
        name: AdministrativeAreaName
      });

      alert("Регион успешно добавлен");
    },
    viewMapData (geoObject) {
      const {
        is_only_online,
        is_repeat_client,
        is_work_region,
        name
      } = this.region;

      if (!is_work_region) {
        alert(`В регионе ${name} не работаем`);
        return;
      }

      if (is_repeat_client && is_only_online) {
        alert(`В регионе ${name} работаем только онлайн и только с повторными клиентами`);
        return;
      }

      if (is_only_online) {
        alert(`В регионе работаем только онлайн с новыми и повторными клиентами`);
        return;
      }

      const geoObjects = geoObject.response.GeoObjectCollection.featureMember;
      const coords = geoObjects[0].GeoObject.Point.pos;
      this.settings.coords = coords.split(" ").reverse();
    },
    selectOffice(item) {
      this.selectOfficeForChanging = item.id;
      this.showDialog("updateOfficeDialog");
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
  },
  computed: {
    ...mapGetters({
      offices: "getOfficeLists",
      region: "getCurrentRegion",
    })
  },
  components: {
    CreateOfficeForm,
    CreateRegionForm,
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