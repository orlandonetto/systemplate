<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h5 font-weight-bold mb-4">Users</h1>

        <FilterInput :dataFilters="itemsFilter"/>

        <section class="py-4">
          <v-card class="mb-4" outlined>
            <v-data-table
                class="surface"
                :headers="headers"
                :items="users"
                item-key="_id"
                hide-default-footer
                disable-pagination
                disable-sort
            >
              <template v-slot:[`item.name`]="{ item }">
                <v-chip
                    color="primary"
                    class="pl-2"
                    @click="openUser(item._id)"
                >
                  <v-icon left>mdi-account</v-icon>

                  <span>{{ item.firstName }} {{ item.lastName }}</span>
                </v-chip>
              </template>

              <!-- contact -->
              <template v-slot:[`item.contact`]="{ item }">
                <div class="d-flex flex-column">
                  <span>{{ item.email }}</span>

                  <span class="subtext--text text-caption" v-if="item.ddi && item.phone">
                    +{{ item.ddi }} {{ item.phone }}</span>
                </div>
              </template>

              <!-- created At -->
              <template v-slot:[`item.createdAt`]="{ item }">
                {{ formatDate(item.createdAt) }}
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
  </v-container>
</template>

<script>
import FilterGroup from "@/components/filters/FilterGroup";
import FilterInput from "@/components/filters/FilterInput";
import {getUsers} from "@/services/users";
import {formatDate} from "@/utils";
import {NUMBER, PERIOD, TEXT} from "@/components/filters/FilterTypes.json";

export default {
  data: () => ({
    loading: true,
    itemsFilter: [
      {identifier: "_id", type: NUMBER, title: "ID do usuário", hint: "igual à"},
      {identifier: "email", type: TEXT, title: "Email", hint: "começa com"},
      {identifier: "firstName", type: TEXT, title: "Nome", hint: "contem"},
      {identifier: "lastName", type: TEXT, title: "Sobrenome", hint: "contem"},
      {identifier: "phone", type: TEXT, title: "Contato", hint: "começa com"},
      {identifier: "createdAt", type: PERIOD, title: "Data de cadastro", hint: "período entre"}
    ],
    headers: [
      {text: "Id", value: "_id"},
      {text: "Name", value: "name"},
      {text: "Contact", value: "contact"},
      {text: "Created At", value: "createdAt"},
    ],
    pagination: {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      sort: "",
    },
    users: [],
  }),

  components: {
    FilterGroup,
    FilterInput,
  },

  beforeMount() {
    this.getData();
  },

  watch: {
    ["$route.query"]() {
      this.loading = true;
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

      await getUsers(payload)
          .then((res) => {
            this.users = res.content;
            this.pagination.pageCount = res.pages;
          })
          .catch(err => console.log(err))
          .finally(() => this.loading = false);
    },

    openUser(_id) {
      this.$router.push({
        path: `/user/${_id}`,
        query: {callback: this.$route.fullPath.substr(1)}
      });
    },

    formatDate,
  },
};
</script>

<style>
</style>