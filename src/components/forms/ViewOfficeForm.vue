<template>
  <div class="px-6 py-6">
    <v-row>
      <v-col cols="12">
        <h2>
          Просмотр/Редактирование офиса продаж
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <ChangeOfficeForm :office-data="concreteOffice" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>
          Добавление работников офиса
        </h2>
      </v-col>
      <v-col cols="12">
        <CreateWorkerForm @create="createWorkers" />
      </v-col>
      <v-col cols="12">
        <OfficeWorkersTable
            v-on:destroy="deleteWorker"
            :workers="concreteOfficeWorkers"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  addReasons,
  createWorker,
  destroyWorker,
  destroyReason,
  update
} from "@/services/office";
import { geocode } from "@/services/yandex-geocode";

import CreateWorkerForm from "@/components/forms/CreateWorkerForm";
import OfficeWorkersTable from "@/components/tables/OfficeWorkersTable";
import ChangeOfficeForm from "@/components/forms/ChangeOfficeForm";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "ViewOfficeForm",
  components: {
    CreateWorkerForm,
    OfficeWorkersTable,
    ChangeOfficeForm,
  },
  methods: {
    ...mapActions({
      loadConcreteOffice: "fetchCurrentOffice",
    }),
    async change() {
      const information = await geocode(this.form.full_address);
      await update(this.officeData.id, {
        geocode: information.response.GeoObjectCollection,
        form: this.form,
      });
    },
    async deleteWorker(id) {
      const trying = confirm("Вы действительно хотите удалить работника?");
      if (!trying) {
        return;
      }

      await destroyWorker(this.officeId, id);

      this.office.office_workers = this.office.office_workers.filter(worker => worker.id !== id);
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
    },
    async createWorkers(data) {
      const response = await createWorker(this.officeId, data);
      const worker = response.create;
      this.office.office_workers.push(worker);
    },
  },
  computed: {
    ...mapGetters({
      concreteOffice: "getCurrentOffice",
      concreteOfficeWorkers: "getOfficeWorkers"
    }),
  },
  props: {
    officeId: {
      type: Number,
    }
  },
  watch: {
    officeId: {
      deep: true,
      immediate: true,
      async handler(id) {
        if (!id) {
          return;
        }

        await this.loadConcreteOffice(id);
      }
    },
  }
}
</script>