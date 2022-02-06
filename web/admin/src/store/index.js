import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import router from "@/router";
import {api} from "@/services";
import {signOut} from "@/services/auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  key: "localStorage",
  storage: window.localStorage, // persistent on localstorage
  modules: ["darkMode", "accessToken", "refreshToken"], // persistent variable on state
});

export default new Vuex.Store({
  state: {
    darkMode: true,
    accessToken: null,
    refreshToken: null,
    account: null,
    selected: null,
    permissions: null,
  },

  getters: {
    darkMode: ({darkMode}) => darkMode,
    authenticated: ({accessToken, account}) => !!accessToken && !!account,
    accessToken: ({accessToken}) => accessToken,
    refreshToken: ({refreshToken}) => refreshToken,
    account: ({account}) => account,
    selected: ({selected}) => selected,
    permissions: ({permissions}) => permissions,
  },

  mutations: {
    SET_DARK_MODE(state, payload) {
      state.darkMode = payload;
    },

    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    },

    SET_REFRESH_TOKEN(state, payload) {
      state.refreshToken = payload;
    },

    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },

    SET_SELECTED(state, payload) {
      state.selected = payload;
    },

    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
  },

  actions: {
    setDarkMode({commit}, payload) {
      commit("SET_DARK_MODE", payload);
    },

    setTokens({dispatch}, payload) {
      dispatch("setAccessToken", payload.accessToken);
      dispatch("setRefreshToken", payload.refreshToken);

      // set header authorization
      api.defaults.headers.common["Authorization"] = payload.accessToken;
    },

    setAccessToken({commit}, payload) {
      commit("SET_ACCESS_TOKEN", payload);
    },

    setRefreshToken({commit}, payload) {
      commit("SET_REFRESH_TOKEN", payload);
    },

    setSignOut({dispatch}) {
      // Sign-Out Local (Only)
      if (!this.getters.accessToken)
        return dispatch('setSignOutLocal');

      // Sign-Out in API and Local (External)
      signOut()
        .then(() => console.log('Successfully external sign-out'))
        .catch(() => console.log('Failed external sign-out'))
        .finally(() => dispatch("setSignOutLocal"));
    },

    setSignOutLocal({dispatch}) {
      dispatch("setTokens", {accessToken: null, refreshToken: null});
      dispatch("setAccount", {account: null, permissions: null});

      if (router.history.current.path !== '/auth')
        router.push({path: '/auth'});
    },

    setAccount({commit}, payload) {
      commit("SET_ACCOUNT", payload.account);
      commit("SET_PERMISSIONS", payload.permissions);
    },

    setSelected({commit}, payload) {
      commit("SET_SELECTED", payload);
    },
  },

  plugins: [vuexLocal.plugin],

  modules: {},
});
