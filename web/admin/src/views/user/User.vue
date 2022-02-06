<template>
  <loader-view v-if="loading"/>

  <v-container v-else>
    <!-- header -->
    <div class="d-flex align-center mb-2">
      <v-list-item class="px-0">
        <v-list-item-action class="mr-3">
          <v-btn class="rounded-lg" icon tile @click="close()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-title class="text-h5 font-weight-bold">
          {{ $route.name }}
        </v-list-item-title>
      </v-list-item>

      <v-spacer/>

      <v-app-bar-nav-icon
          class="rounded-lg mr-2"
          small
          @click.stop="drawer = !drawer"
      />
    </div>

    <router-view/>

    <!-- right drawer -->
    <v-navigation-drawer
        v-model="drawer"
        color="altback"
        floating
        clipped
        right
        app
    >
      <v-list-item class="mt-2 mb-4">
        <v-list-item-avatar>
          <v-img :src="require('@/assets/utils/profile.png')"/>
        </v-list-item-avatar>

        <v-list-item-title class="font-weight-bold primary--text">
          {{ selected.firstName }}
          {{ selected.lastName }}
        </v-list-item-title>
      </v-list-item>

      <!-- email and phone -->
      <v-list-item class="mb-4" dense>
        <v-list-item-content class="py-0">
          <v-list-item-title class="mb-2 font-weight-regular">
            <v-icon left small>mdi-email</v-icon>

            <span> {{ selected.email }}</span>
          </v-list-item-title>

          <v-list-item-title class="font-weight-regular">
            <v-icon left small>mdi-phone</v-icon>
            <span>{{ selected.ddi }} {{ selected.phone }}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- routes -->
      <v-list class="transparent" dense nav>
        <router-link
            v-for="(item, i) in routes"
            v-slot="{ navigate, isExactActive }"
            class="mb-2"
            :key="i"
            :to="`/user/${selected._id}${item.path}`"
            custom
        >
          <v-list-item :class="isExactActive ? 'accent' : ''" @click="navigate">
            <v-list-item-icon class="ml-2 mr-4">
              <v-icon :color="isExactActive ? 'overtext' : 'subtext'">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                  :class="isExactActive ? 'overtext--text' : 'subtext--text'"
              >
                {{ item.label }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
      <v-divider/>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {getUser} from "@/services/users";

export default {
  data() {
    return {
      drawer: true,
      loading: true,
      routes: [
        {
          icon: "mdi-account",
          label: "Profile",
          path: "",
        },
        {
          icon: "mdi-cog",
          label: "Manage User",
          path: "/manage",
        },
      ],
    };
  },

  beforeMount() {
    this.getData();

    this.$root.$on("update-selected", () => this.getData());
  },

  computed: {
    ...mapState(["selected"]),
  },

  methods: {
    ...mapActions(["setSelected"]),

    async getData() {
      const payload = {
        _id: this.$route.params.id
      }

      await getUser(payload)
          .then((res) => this.setSelected(res))
          .catch(err => console.log(err))
          .finally(() => setTimeout(() => this.loading = false, 500));
    },

    close() {
      this.$router.push({path: `/${this.$route.query.callback || 'users'}`});
    },

  },
};
</script>

<style>
</style>