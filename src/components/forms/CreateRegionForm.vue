<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <span class="text-h4">Форма добавления региона</span>
      </v-col>
      <v-col cols="12">
        <v-text-field
            v-model="form.name"
            label="Название региона"
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <div class="d-flex flex-column">
          <v-checkbox
              v-model="form.isOnlyOnline"
              :label="`Только онлайн: ${form.isOnlyOnline ? 'Да' : 'Нет'}`"
              class="mt-2"
          ></v-checkbox>
          <v-checkbox
              v-model="form.isOnlyRepeatClient"
              :label="`Только повторные клиенты: ${form.isOnlyRepeatClient ? 'Да' : 'Нет'}`"
              class="mt-2"
          ></v-checkbox>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-btn @click="create" color="green" class="text--white">
            Добавить
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "CreateRegionForm",
  data() {
    return {
      form: {
        name: "",
        isOnlyRepeatClient: false,
        isOnlyOnline: false,
        isWork: true,
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

<style scoped>

</style>