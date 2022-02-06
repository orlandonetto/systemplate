<template>
  <v-card class="surface">
    <v-card-title>
      Notify user
      <v-spacer />

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <section class="px-6 py-3">
      <v-form v-model="valid" ref="form" auto-complete="off">
        <div class="mb-1">Title</div>
        <v-text-field
          v-model="form.title"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <div class="mb-1">Description</div>
        <v-text-field
          v-model="form.description"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />
      </v-form>
    </section>

    <v-card-actions class="accent">
      <v-spacer />

      <v-btn class="mr-2" plain @click="close()"> Cancel </v-btn>

      <v-btn color="primary" depressed @click="submit()"> Confirm </v-btn>
    </v-card-actions>

    <loader-hover v-if="loading" />
  </v-card>
</template>


<script>
import { notifyUser } from "@/services/users";
import { displayAlert, parseNumber } from "@/utils";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        title: "",
        description: "",
      },
    };
  },

  computed: {
    rules() {
      return [(v) => !!v || "Invalid field"];
    },
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      try {
        this.loading = true;

        const payload = {
          ...this.form,
          id: this.$route.params.id,
        };

        await notifyUser(payload).then((res) => {
          this.displayAlert(res.message);
          this.$emit("success");
          this.close();
        });
      } catch (err) {
        this.displayAlert(err.body.message, 1);
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.$emit("close");
    },

    displayAlert,

    parseNumber,
  },
};
</script>

<style>
</style>