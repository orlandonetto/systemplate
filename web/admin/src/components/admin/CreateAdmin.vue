<template>
  <v-card class="surface">
    <v-card-title>
      Create Admin
      <v-spacer/>

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <section class="px-6 py-3">
      <section class="pa-4">
        <v-form v-model="valid" class="mb-6" ref="form" auto-complete="off">
          <div class="mb-4" @keypress.enter.prevent="submit()">
            <label>Email</label>
            <v-text-field
                name="email"
                v-model="form.email"
                background-color="accent"
                :rules="emailRules"
                flat
                solo
                @keydown.space.prevent
            />

            <v-row no-gutters>
              <v-col cols="12" md="6" class="pr-md-2">
                <label>First Name</label>
                <v-text-field
                    name="firstName"
                    v-model="form.firstName"
                    background-color="accent"
                    :rules="rule"
                    flat
                    solo
                    @keydown.space.prevent
                />
              </v-col>

              <v-col cols="12" md="6" class="pl-md-2">
                <label>Last Name</label>
                <v-text-field
                    name="lastName"
                    v-model="form.lastName"
                    background-color="accent"
                    :rules="rule"
                    flat
                    solo
                    @keydown.space.prevent
                />
              </v-col>
            </v-row>

            <label>Password</label>
            <v-text-field
                v-model="form.password"
                background-color="accent"
                :type="showPass ? 'text' : 'password'"
                :rules="rule"
                flat
                solo
            >
              <template v-slot:append>
                <v-icon color="secondary" @click="showPass = !showPass">
                  {{ showPass ? "mdi-eye-outline" : "mdi-eye-off-outline" }}
                </v-icon>
              </template>
            </v-text-field>

            <label>Group</label>
            <v-select
                :items="groups"
                v-model="form.group"
                item-text="name"
                item-value="_id"
                label="Select Group"
                background-color="accent"
                solo
                flat
            />
          </div>
        </v-form>
      </section>
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
import {createAdmin} from "@/services/admins";
import {displayAlert} from "@/utils";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      showPass: false,
      groups: [],
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        image: null,
      },
    };
  },

  beforeMount() {

  },

  watch: {
    ["form.name"](value) {
      this.form.name = value.toUpperCase();
    },
  },

  computed: {
    rule() {
      return [(v) => !!v || "Invalid field"];
    },

    emailRules() {
      return [
        (v) => !!v || "invalid email.",
        (v) => /.+@.+/.test(v) || "invalid email.",
      ];
    },
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      const payload = {...this.form};

      await this.createAdmin(payload)
          .then(res => {
            this.displayAlert(res.message || "Admin created successfully.");
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
    createAdmin,
  }
}
</script>

<style>
</style>