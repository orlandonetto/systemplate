<template>
  <v-card class="surface">
    <v-card-title>
      Define new password
      <v-spacer />

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <section class="px-6 py-3">
      <v-form v-model="valid" ref="form" auto-complete="off">
        <div class="mb-1">New password</div>
        <v-text-field
          v-model="form.password"
          background-color="accent"
          type="password"
          :rules="rules"
          solo
          flat
        />

        <div class="mb-1">Confirm password</div>
        <v-text-field
          v-model="form.confirm"
          background-color="accent"
          type="password"
          :rules="rulesConfirm"
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
import { changePassword } from "@/services/users";
import { displayAlert, parseNumber } from "@/utils";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        password: "",
        confirm: "",
      },
    };
  },

  computed: {
    rules() {
      return [(v) => v.length >= 6 || "Invalid password"];
    },

    rulesConfirm() {
      return [
        (v) => v.length >= 6 || "Invalid password",
        (v) => v === this.form.password || "Passwords must be the same",
      ];
    },
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      try {
        this.loading = true;

        const payload = {
          id: this.$route.params.id,
          password: this.form.password,
        };

        await changePassword(payload).then((res) => {
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