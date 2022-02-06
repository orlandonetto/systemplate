<template>
  <v-card class="surface">
    <v-card-title>
      Edit admin profile
      <v-spacer/>

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <section class="px-6 py-3">
      <v-form v-model="valid" ref="form" auto-complete="off">
        <div class="mb-1">First Name</div>
        <v-text-field
            v-model="form.firstName"
            background-color="accent"
            :rules="rules"
            solo
            flat
        />

        <div class="mb-1">Last Name</div>
        <v-text-field
            v-model="form.lastName"
            background-color="accent"
            :rules="rules"
            solo
            flat
        />

        <div class="mb-1">E-mail</div>
        <v-text-field
            v-model="form.email"
            background-color="accent"
            :rules="emailRules"
            solo
            flat
        />
      </v-form>
    </section>

    <v-card-actions class="accent">
      <v-spacer/>

      <v-btn class="mr-2" plain @click="close()"> Cancel</v-btn>

      <v-btn color="primary" depressed @click="submit()"> Confirm</v-btn>
    </v-card-actions>

    <loader-hover v-if="loading"/>
  </v-card>
</template>


<script>
import {mapState} from "vuex";
import {updateAdmin} from "@/services/admins";
import {capitalize, displayAlert, parseNumber} from "@/utils";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },

  beforeMount() {
    this.form.firstName = this.selected.firstName;
    this.form.lastName = this.selected.lastName;
    this.form.email = this.selected.email;
  },

  watch: {
    ["form.firstName"](value) {
      this.form.firstName = capitalize(value);
    },

    ["form.lastName"](value) {
      this.form.lastName = capitalize(value);
    },
  },

  computed: {
    ...mapState(["selected"]),

    rules() {
      return [(v) => !!v || "Required field"];
    },

    emailRules() {
      return [
        (v) => !!v || "Required field",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;

      const payload = {
        id: this.$route.params.id,
        update: {
          ...this.form
        },
      };

      await updateAdmin(payload)
          .then(res => {
            this.displayAlert(res.message);
            this.$emit("success");
            this.close();
          })
          .catch(err => this.displayAlert(err.body.message, 1))
          .finally(() => this.loading = false);
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