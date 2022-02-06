<template>
  <v-card color="accent lighten-1" class="pa-4" width="300">
    <v-form v-model="valid" ref="form" autocomplete="off">
      <div @keypress.enter.prevent="submit">
        <v-text-field
          v-model="dateRange"
          append-icon="mdi-calendar"
          :placeholder="`Selecione um(a) ${info.title}`"
          :rules="rule"
          readonly
          outlined
        />

        <v-date-picker
          v-model="value"
          color="primary"
          transparent
          scrollable
          no-title
          range
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
const moment = require("moment");

export default {
  props: {
    info: {},
  },

  data() {
    return {
      valid: false,
      value: [],
      maxDate: null,
    };
  },

  beforeMount() {
    this.maxDate = moment().format("YYYY-MM-DD");
  },

  watch: {
    value() {
      if (this.value.length > 1) {
        if (this.value[0] > this.value[1]) {
          const temp = this.value[0];
          this.value.splice(0, 1);
          this.value.push(temp);
        }
      }
    },
  },

  computed: {
    dateRange() {
      return this.value.join(" ~ ");
    },

    rule() {
      return [(v) => v.length > 1 || "Campo Obrigatório"];
    },
  },

  methods: {
    close() {
      this.$emit("close-menu");

      // restart values
      setTimeout(() => {
        this.value = this.info.value.split(",");
      }, 500);
    },

    submit() {
      if (!this.$refs.form.validate()) return;

      this.$emit("success", this.value.toString());
      this.close();
    },
  },
};
</script>

<style>
</style>