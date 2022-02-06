<template>
  <v-container fill-height>
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="pa-6" color="surface">
          <v-form v-model="valid" ref="form" autocomplete="off">
            <div @keypress.enter.prevent="submit()">
              <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  background-color="accent"
                  :rules="emailRules"
                  solo
                  flat
                  @keydown.space.prevent
              />

              <v-text-field
                  v-model="form.password"
                  label="Senha"
                  background-color="accent"
                  type="password"
                  :rules="rules"
                  solo
                  flat
                  @keydown.space.prevent
              />

              <v-checkbox
                  v-model="remember"
                  label="Lembrar acesso"
                  class="pt-0 mt-0 mb-2"
              />

              <v-btn
                  color="primary-gradient"
                  block
                  large
                  dark
                  @click.prevent="submit()"
              >
                Efetuar acesso
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <loader-hover v-if="loading"/>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import {displayAlert} from "@/utils";
import {signIn} from "@/services/auth";

export default {
  name: "Auth",

  data() {
    return {
      loading: false,
      valid: false,
      remember: false,
      form: {
        email: "",
        password: "",
      },
    };
  },

  beforeMount() {
    const username = localStorage.getItem("email") || false;

    if (username) {
      this.form.email = username;
      this.remember = true;
    }
  },

  computed: {
    emailRules: () => ([
      (v) => !!v || "Required field",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ]),

    rules: () => ([
      (v) => !!v || "Required field"
    ]),
  },

  methods: {
    ...mapActions(["setTokens"]),

    async submit() {
      // Validate
      if (!this.$refs.form.validate()) return;

      // Remember email
      localStorage.setItem("email", this.remember ? this.form.email : '');

      this.loading = true;

      const payload = {
        ...this.form
      };

      await signIn(payload)
          .then(({accessToken, refreshToken}) => {
            this.setTokens({accessToken, refreshToken});

            this.$router.push({path: "/"});
          })
          .catch(err => this.displayAlert(err.data.message || err.message, 1))
          .finally(() => this.loading = false);
    },

    displayAlert
  },
};
</script>

<style>
</style>