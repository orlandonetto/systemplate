<template>
  <v-card color="accent lighten-1" class="pa-4" width="300">
    <v-form v-model="valid" ref="form" autocomplete="off">
      <div @keypress.enter.prevent="submit">
        <v-text-field
          v-model="value"
          v-money="currency"
          ref="currency"
          placeholder="0,00"
          append-icon="mdi-currency-brl"
          :hint="info.hint || ''"
          :rules="ruleValue"
          autofocus
          outlined
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
import { VMoney } from "v-money";
import { parseNumber } from "@/utils";

export default {
  props: {
    info: {},
    filter_name: "",
  },

  data() {
    return {
      currency: {
        decimal: ",",
        thousands: ".",
        precision: 2,
      },
      valid: false,
      value: "",
    };
  },

  directives: { money: VMoney },

  beforeMount() {
    this.value = this.info.value;
  },

  computed: {
    ruleValue() {
      return [(v) => parseNumber(v) > 0 || "Valor mínimo de R$ 0,00"];
    },
  },

  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      this.$emit("success", parseNumber(this.value));
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