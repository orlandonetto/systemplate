<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9">
        <section>
          <div class="d-flex align-center mb-4">
            <h1 class="text-h5 font-weight-bold">Admins</h1>

            <v-spacer/>

            <v-btn
                class="ml-2"
                color="primary"
                small
                @click="createDialog = true"
            >
              <v-icon left>mdi-plus</v-icon>
              new
            </v-btn>
          </div>
        </section>

        <FilterInput :dataFilters="[]"/>

        <section class="py-4">
          <v-card class="mb-4" outlined>
            <v-data-table
                class="surface"
                :headers="headers"
                :items="admins"
                hide-default-footer
                disable-pagination
                disable-sort
            >
              <!-- admin -->
              <template v-slot:[`item.name`]="{ item }">
                <v-chip color="primary" class="pl-2" @click="openAdmin(item)">
                  <v-icon left>mdi-account</v-icon>

                  <span>{{ item.firstName }} {{ item.lastName }}</span>
                </v-chip>
              </template>
            </v-data-table>
          </v-card>

          <!-- pagination -->
          <v-pagination
              v-model="pagination.page"
              color="primary"
              :length="pagination.pageCount"
              :total-visible="10"
              @input="getData()"
          />
        </section>
      </v-col>
    </v-row>

    <!-- dialogs -->
    <v-dialog v-model="createDialog" max-width="500" persistent>
      <CreateAdmin @close="createDialog = false" @success="getData()"/>
    </v-dialog>
  </v-container>
</template>

<script>
import {getAdmins} from "@/services/admins";
import FilterGroup from "@/components/filters/FilterGroup";
import FilterInput from "@/components/filters/FilterInput";
import CreateAdmin from "@/components/admin/CreateAdmin";

export default {
  data() {
    return {
      loading: false,
      headers: [
        {text: "Name", value: "name"},
        {text: "E-mail", value: "email"},
      ],
      pagination: {
        page: 1,
        pageCount: 0,
        itemsPerPage: 15,
        sort: "",
      },
      admins: [],
      createDialog: false,
    };
  },

  components: {
    FilterGroup,
    FilterInput,
    CreateAdmin,
  },

  beforeMount() {
    this.getData();
  },

  watch: {
    ["$route.query"]() {
      this.pagination.page = 1;

      this.getData();
    },
  },

  methods: {
    async getData() {
      this.loading = true;

      const payload = {
        page: this.pagination.page - 1,
        size: this.pagination.itemsPerPage,
        ...this.$route.query,
      };

      await getAdmins(payload)
          .then((res) => {
            this.admins = res.admins;
            this.pagination.pageCount = res.pages;
          })
          .catch(err => console.log(err))
          .finally(() => this.loading = false);
    },

    openAdmin(data) {
      this.$router.push({path: `/admin/${data._id}`});
    },
  },
};
</script>

<style>
</style>