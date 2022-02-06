<template>
  <div class="d-flex flex-column fill-height">
    <!-- appbar -->
    <v-app-bar
        color="altback"
        dense
        app
        elevate-on-scroll
        scroll-target
        clipped-right
    >
      <v-app-bar-nav-icon
          class="rounded-lg ml-1"
          small
          @click.stop="mini = !mini"
      />

      <v-spacer/>

      <v-btn class="rounded-lg mr-2" icon small @click="changeTheme()">
        <v-icon v-if="$vuetify.theme.dark">mdi-moon-waning-crescent</v-icon>
        <v-icon v-else>mdi-white-balance-sunny</v-icon>
      </v-btn>

      <!--notifications-->
      <v-menu
          transition="scale-transition"
          origin="top"
          offset-y
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              class="rounded-lg mr-2"
              @click="showNotifications = !showNotifications"
              text icon small
          >
            <v-badge dot overlap color="primary">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card class="mx-auto" min-width="350" max-width="350" min-height="200" tile>
          <v-list dense>
          </v-list>
        </v-card>
      </v-menu>

      <!--profile-->
      <v-menu
          transition="scale-transition"
          origin="top"
          offset-y
          bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              text
          >
            <v-avatar size="32">
              <v-img :src="require('@/assets/utils/profile.png')"/>
            </v-avatar>
            <span class="ms-2 caption" v-text="account.firstName"/>
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-card class="mx-auto" tile>
          <v-list dense>
            <!--profile-->
            <v-list-item @click="pushRoute(`/admin/${account._id}`)">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!--password-->
            <v-list-item @click="pushRoute(`/admin/${this.account._id}/password`)">
              <v-list-item-icon>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!--signOut-->
            <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon>mdi-location-exit</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- drawer -->
    <v-navigation-drawer
        :mini-variant="mini"
        :expand-on-hover="mini"
        color="altback"
        permanent
        app
    >
      <div class="d-flex justify-center align-center">
        <v-btn x-large block text @click="pushRoute('/dashboard')">
          <v-img :src="require($vuetify.theme.dark? '@/assets/logo/logo-light.png': '@/assets/logo/logo-dark.png')"
                 max-width="68"/>
        </v-btn>
      </div>

      <!-- routes -->
      <v-list width="100%" dense nav>
        <v-list-item
            v-for="(route, index) in routes"
            :key="index"
            :to="route.path"
            :disabled="route.disabled"
            class="my-4 text--accent-1"
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title v-text="route.label"/>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- slot view -->
    <v-main class="altback">
      <v-sheet class="radius background pl-1 py-1" height="100%">
        <slot/>
      </v-sheet>
    </v-main>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data: () => ({
    drawer: true,
    mini: false,
    showNotifications: false,
    drawerBackgroundIndex: 0,
    drawerImages: [
      'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg',
      'https://script.viserlab.com/mlmlab/assets/admin/images/sidebar/1.jpg',
      'https://script.viserlab.com/mlmlab/assets/admin/images/sidebar/2.jpg',
    ],
    routes: [
      {label: "Dashboard", path: "/dashboard", icon: "mdi-view-dashboard", disabled: false},
      {label: "Users", path: "/users", icon: "mdi-account-multiple", disabled: false},
      {label: "Admin", path: "/admins", icon: "mdi-account-tie", disabled: false},
    ],
  }),

  computed: {
    ...mapState(["account"]),
  },

  methods: {
    ...mapActions(["setSignOut", "setDarkMode"]),

    changeTheme() {
      const value = !this.$vuetify.theme.dark;

      this.$vuetify.theme.dark = value;
      this.setDarkMode(value);
    },

    pushRoute(path) {
      if (this.$route.path === path) return;

      this.$router.push({path});
    },

    logout() {
      this.setSignOut();
    },
  },
};
</script>

<style lang="scss" scoped>

.body-color {
  background-color: #0e0e0f;
}

.radius {
  border-radius: 24px 24px 0 0;
}

</style>