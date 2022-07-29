<template>
  <v-row>
    <v-col cols="12" md="3" xs="3">
      <v-text-field
          v-model="form.full_name"
          label="ФИО"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3" xs="3">
      <v-text-field
          v-model="form.job_title"
          label="Должность"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3" xs="3">
      <v-text-field
          v-model="form.phone"
          label="Номер телефона"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3" xs="3">
      <v-text-field
          v-model="form.email"
          label="E-mail"
          required
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn
          @click="create"
          color="green"
          class="white--text"
      >Добавить</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CreateWorkerForm",
  data() {
    return {
      form: {
        full_name: "",
        job_title: "",
        phone: "",
        email: "",
      }
    }
  },
  methods: {
    create() {
      this.$emit("create", this.form);
    }
  }
}
</script>