<template>
  <v-card class="surface">
    <v-card-title>
      Recover password
      <v-spacer />

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text-body-1">
      A link to define the new password will be sent to the user's email!
    </v-card-text>

    <v-card-actions class="accent">
      <v-spacer />

      <v-btn class="mr-2" plain @click="close()"> Cancel </v-btn>

      <v-btn color="primary" depressed @click="submit()"> Confirm </v-btn>
    </v-card-actions>

    <loader-hover v-if="loading" />
  </v-card>
</template>


<script>
import { mapState } from "vuex";
import { recoverPassword } from "@/services/users";
import { displayAlert } from "@/utils";

export default {
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(["selected"]),
  },

  methods: {
    async submit() {
      try {
        this.loading = true;

        const payload = {
          email: this.selected.email,
        };

        await recoverPassword(payload).then((res) => {
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
  },
};
</script>

<style>
</style>