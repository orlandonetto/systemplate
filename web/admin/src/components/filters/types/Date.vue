<template>
  <v-card color="accent lighten-1" class="pa-4" width="300">
    <v-form v-model="valid" ref="form" autocomplete="off">
      <div @keypress.enter.prevent="submit">
        <v-text-field
          v-model="value"
          v-mask="'####-##-##'"
          append-icon="mdi-calendar"
          :placeholder="`Selecione um(a) ${info.title}`"
          :rules="rule"
          outlined
        />

        <v-date-picker
          v-model="value"
          color="primary"
          transparent
          scrollable
          no-title
          flat
          :max="maxDate"
        />
      </div>
    </v-form>

    <v-row no-gutters>
      <v-spacer />
      <v-btn class="mr-2" plain @click="close()">Cancelar</v-btn>
      <v-btn color="primary" @click="submit()">Pesquisar</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { mask } from "vue-the-mask";
const moment = require("moment");

export default {
  props: {
    info: {},
  },

  data() {
    return {
      valid: false,
      value: "",
      maxDate: null,
    };
  },

  directives: { mask },

  beforeMount() {
    this.maxDate = moment().format("YYYY-MM-DD");
  },

  computed: {
    rule() {
      return [(v) => v.length > 1 || "Campo Obrigatório"];
    },
  },

  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      this.$emit("success", this.value.toString());
      this.close();
    },

    close() {
      this.$emit("close-menu");
    },
  },
};
</script>

<style>
</style>