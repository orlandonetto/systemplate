import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import en from "vuetify/lib/locale/en";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#6666CC",
        secondary: "#4949A5",
        info: "#2196F3",
        warning: "#FF9F10",
        error: "#E54A35",
        success: "#13AC80",
        background: "#f8f7fa",
        altback: "#FFFFFF",
        surface: "#FFFFFF",
        accent: "#ebe9f0",
        overtext: "#000000",
        subtext: "#9b9ca2",
      },
      dark: {
        primary: "#6666CC",
        secondary: "#4949A5",
        info: "#2196F3",
        warning: "#FF9F10",
        error: "#E54A35",
        success: "#13AC80",
        background: "#0B0B15",
        altback: "#10101E",
        surface: "#10101A",
        accent: "#171721",
        overtext: "#FFFFFF",
        subtext: "#9b9ca2",
      },
    },
  },
  lang: {
    locales: {en},
    current: "en",
  },
});
