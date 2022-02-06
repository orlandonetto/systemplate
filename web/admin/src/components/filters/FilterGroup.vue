<template>
  <v-slide-group v-model="model" mandatory show-arrows>
    <v-slide-item v-for="(item, i) in filters" v-slot="{ active }" :key="i">
      <v-btn
        :class="`mr-3 surface ${
          $vuetify.theme.dark ? 'white--text' : 'black--text'
        }`"
        active-class="white--text gradient"
        :input-value="active"
        depressed
        rounded
        @click="submit(item.value, i)"
      >
        {{ item.label }}
      </v-btn>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
    };
  },

  props: {
    filters: Array,

    queryKey: String,
  },

  beforeMount() {
    this.handleCurrent();
  },

  methods: {
    submit(value, index) {
      if (value === this.$route.query[this.queryKey]) return;

      this.model = index;
      let query = {
        ...this.$route.query,
      };

      if (!!value) query[this.queryKey] = value;
      else delete query[this.queryKey];

      this.$router.replace({ query: query }).catch({
        /* ignore */
      });

      this.$emit("apply-filter");
    },

    handleCurrent() {
      const query = this.$route.query[this.queryKey];

      if (query) this.model = this.filters.map((e) => e.value).indexOf(query);
    },
  },
};
</script>

<style>
</style>