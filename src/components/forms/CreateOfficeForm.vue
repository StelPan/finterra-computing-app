<template>
  <v-row class="px-4 py-2">
    <v-col cols="12">
      <h2>
        Добавление отделения продаж
      </h2>
    </v-col>
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
        <v-btn @click.prevent="createOffice" color="green" class="mx-1 white--text">Добавить</v-btn>
        <v-btn @click.prevent="clear" color="red" class="mx-1 white--text">Очистить</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { create } from "@/services/office";
import { geocode } from "@/services/yandex-geocode";
import { closeDialog } from "@/services/dialogs";

export default {
  name: "CreateOfficeForm",
  data () {
    return {
      form: {
        name: "",
        work_time: "",
        full_address: "",
        title: "",
        email: "",
        phone: "",
        description: "",
      }
    }
  },
  methods: {
    async createOffice() {
      try {
        const information = await geocode(this.form.full_address);
        await create({
          geocode: information.response.GeoObjectCollection,
          form: this.form,
        });
        this.clear();

        alert("Офис успешно добавлен");
        closeDialog("addOfficeDialog");
      } catch (e) {
        console.error(e);
      }
    },
    verify () {
      // TODO: is correct form
    },
    clear() {
      for (let prop in this.form) {
        this.form[prop] = ""
      }
    }
  },
}
</script>

<style scoped>

</style>