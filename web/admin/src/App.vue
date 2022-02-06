<template>
  <v-app id="app">
    <SplashScreen v-if="loading"/>

    <Application v-else-if="$store.getters.authenticated && handleTemplate()">
      <router-view/>
    </Application>

    <v-main v-else class="background">
      <router-view/>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import {mapActions} from "vuex";
import {getAuthenticated} from "./services/auth";
import {api} from "./services";
import Application from "./template/Application.vue";
import SplashScreen from "./template/SplashScreen";
import SnackBar from "./components/app/SnackBar";

export default {
  name: "App",

  data: () => ({
    loading: false
  }),

  components: {
    Application,
    SplashScreen,
    SnackBar,
  },

  beforeMount() {
    this.$vuetify.theme.dark = this.$store.getters.darkMode;
    this.startSession();
  },

  watch: {
    "$store.getters.accessToken": function (token) {
      if (!!token) this.authenticate();
    }
  },

  methods: {
    ...mapActions(["setAccount", "setSignOut"]),

    // checks if the token is still valid for a session
    startSession() {
      this.loading = true;

      const accessToken = this.$store.getters.accessToken;
      if (!accessToken)
        return this.loading = false;

      api.defaults.headers.common["Authorization"] = accessToken;

      this.authenticate();
    },

    authenticate() {
      this.loading = true;
      getAuthenticated()
          .then(({account, permissions}) => {
            this.setAccount({account, permissions});
          })
          .catch(() => {
            this.setSignOut();
          })
          .finally(() => {
            this.loading = false;
          });
    },

    handleTemplate() {
      const pages = ["Sign In"];

      return !pages.includes(this.$route.name);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-application {
  [class*='text-'] {
    font-family: "DM Sans", sans-serif !important;
  }

  font-family: "DM Sans", sans-serif !important;
}

h1 {
  font-family: "Inter", sans-serif;
  font-size: 32px;
}

span {
  font-family: "Inter", sans-serif !important;
}

.inter {
  font-family: "Inter", sans-serif;
}

.label {
  font-family: "DM Sans", sans-serif;
  margin-bottom: 8px;
}

.button {
  border-radius: 32px;
  height: 80px;
}

.scroll-area {
  word-break: break-all;
  position: relative;
  margin: auto;
  height: 100%;
}

.primary-gradient {
  background: #8625d6;
  background: linear-gradient(30deg, #8625d6 0%, #470aca 100%);
}

.secondary-gradient {
  background: #17d7a0;
  background: linear-gradient(30deg, #17d7a0 0%, #167cba 100%);
}

.zoom {
  transition: transform 0.2s;
}

.zoom:hover {
  transform: scale(1.05);
}

.pointer-hand {
  cursor: pointer;
}

.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.gradient {
  background: rgb(0, 96, 255);
  background: linear-gradient(
          30deg,
          rgba(0, 96, 255, 1) 0%,
          rgba(0, 80, 163, 1) 100%
  );
}
</style>
