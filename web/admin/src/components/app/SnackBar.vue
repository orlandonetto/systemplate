<template>
  <v-snackbar
      v-model="snackbar"
      style="z-index: 99999"
      :color="colors[type]"
      :timeout="timeout"
      top
  >
    <span>{{ message }}</span>

    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" icon dark @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      colors: ["success", "error", "info"],
      snackbar: false,
      message: "",
      type: 0,
      timeout: 3000,
    };
  },

  mounted() {
    this.$root.$on("display-alert", (data) => {
      this.message = data.message;
      this.type = data.type;
      this.timeout = data.fixed ? -1 : 3000;
      this.snackbar = true;
    });
  },
};
</script>
