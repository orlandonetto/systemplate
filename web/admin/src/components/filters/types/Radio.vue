<template>
  <v-card color="accent lighten-1" class="pa-4" width="300">
    <v-form v-model="valid" ref="form" autocomplete="off">
      <div @keypress.enter.prevent="submit">
        <v-radio-group v-model="value">
          <v-radio
            v-for="(item, index) in info.items"
            :key="index"
            :label="item.label"
            :value="item.value"
            :rules="rule"
          />
        </v-radio-group>
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
// !@ IMPORTANT !@
// receive array of objects {label, value} in the prop

const moment = require("moment");

export default {
  data() {
    return {
      valid: false,
      value: "",
      maxDate: null,
    };
  },

  props: {
    info: {},
  },

  beforeMount() {
    this.maxDate = moment().format("YYYY-MM-DD");
  },

  computed: {
    rule() {
      return [(v) => !!v || "Campo obrigatório"];
    },
  },

  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      this.$emit("success", this.value);
      this.close();
    },

    close() {
      this.$emit("close-menu");

      // restart values
      setTimeout(() => {
        this.value = this.info.value.split(",");
      }, 500);
    },
  },
};
</script>

<style>
</style>