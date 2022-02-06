<template>
  <v-card color="accent lighten-1" class="pa-4" width="300">
    <v-form v-model="valid" ref="form" autocomplete="off">
      <div @keypress.enter.prevent="submit">
        <v-text-field
          v-model="value"
          append-icon="mdi-magnify"
          :placeholder="`Digite um(a) ${info.title}`"
          :hint="info.hint ? info.hint : ''"
          :rules="rule"
          outlined
          autofocus
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
export default {
  props: {
    info: {},
    filter_name: "",
  },

  data() {
    return {
      valid: false,
      value: "",
    };
  },

  beforeMount() {
    this.value = this.info.value;
  },

  computed: {
    rule() {
      return [(v) => !!v || "Campo Obrigatório"];
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

      // restart values
      setTimeout(() => {
        this.value = this.info.value;
      }, 500);
    },
  },
};
</script>

<style>
</style>