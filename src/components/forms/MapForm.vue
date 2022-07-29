<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field
            v-model="form.address"
            label="Полный адрес"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <div class="d-flex justify-end mx-1">
            <v-btn class="" @click="getDataForm">Искать</v-btn>
          </div>
          <div class="d-flex justify-end mx-1">
            <v-btn color="green" class="white--text" @click="openDialog">Добавить</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { showDialog } from "@/services/dialogs";

export default {
  name: "MapForm",
  data() {
    return {
      form: {
        address: ""
      }
    }
  },
  methods: {
    getDataForm() {
      this.$emit("search", this.form);
    },
    openDialog() {
      showDialog("addOfficeDialog");
    }
  }
}
</script>