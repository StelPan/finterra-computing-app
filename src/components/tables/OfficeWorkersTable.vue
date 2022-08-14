<template>
  <v-data-table
      :headers="headers"
      :items="workers"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn-toggle
          dense
          background-color="primary"
          multiple
      >
        <v-btn color="red" @click="destroy(item)">
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>

        <v-btn @click="switchEdit(item)">
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "OfficeWorkersTable",
  data() {
    return {
      headers: [
        { text: 'ФИО', align: 'start', sortable: false, value: 'full_name' },
        { text: 'Должность', value: 'job_title' },
        { text: 'Номер', value: 'phone' },
        { text: 'Почта', value: 'email' },
        { text: 'Действия', value: 'actions'}
      ],
      edits: []
    }
  },
  methods: {
    destroy({ id }) {
      this.$emit("destroy", id);
    },
    switchEdit(item) {
      item.edit = true;
    }
  },
  props: {
    workers: {
      required: true,
      type: Array,
    }
  }
}
</script>

<style scoped>

</style>