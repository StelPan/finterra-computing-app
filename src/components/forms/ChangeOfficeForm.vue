<template>
  <v-row>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.name"
          label="Название"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.full_address"
          label="Полный адрес"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.work_time"
          label="Время работы"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.title"
          label="Памятка"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.email"
          label="Почта офиса"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="6">
      <v-text-field
          v-model="form.phone"
          label="Телефон офиса"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-textarea
          v-model="form.description"
          name="input-7-1"
          label="Пояснялка"
          hint="Hint text"
      ></v-textarea>
    </v-col>
    <v-col cols="12">
      <div class="d-flex">
        <v-btn @click="change" color="green" class="mx-1 white--text">Изменить</v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <h2>
        Временно не работает
      </h2>
    </v-col>
    <v-col cols="12">
      <div class="d-flex align-center" v-if="form.reason">
        <span>{{ this.form.reason }}</span>
        <v-btn
            @click="destroyReasons"
            color="red"
            class="ml-1"
        >
          Удалить
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="d-flex justify-space-between align-center">
        <v-text-field
            v-model="reason"
            label="Укажите причину"
            required
        ></v-text-field>
        <v-btn color="blue" @click="addReasons" class="white--text mx-2">
          Добавить
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  addReasons,
  destroyReason,
} from "@/services/office";
import { geocode } from "@/services/yandex-geocode";

import { mapActions } from "vuex";

export default {
  name: "ChangeOfficeForm",
  data () {
    return {
      form: {
        name: "",
        work_time: "",
        full_address: "",
        title: "",
        email: "",
        phone: "",
        reason: "",
        description: "",
        office_workers: [],
      },
      reason: ""
    }
  },
  methods: {
    ...mapActions({
      updateOffice: "fetchUpdateOffice",
    }),
    async change() {
      const information = await geocode(this.form.full_address);
      await this.updateOffice({
        id: this.officeData.id,
        data: { geocode: information.response.GeoObjectCollection, form: this.form }
      });

      // TODO: alert update form
    },
    async addReasons() {
      await addReasons(
          this.officeData.id,
          this.reason
      );

      this.form.reason = this.reason;
      this.reason = ""
    },
    async destroyReasons() {
      await destroyReason(this.officeData.id);
      this.form.reason = "";
    }
  },
  props: {
    officeData: {
      type: Object,
    }
  },
  watch: {
    officeData: {
      deep: true,
      immediate: true,
      async handler(data) {
        for (let key in data) {
          if (Object.prototype.hasOwnProperty.call(this.form, key)) {
            this.form[key] = data[key];
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>