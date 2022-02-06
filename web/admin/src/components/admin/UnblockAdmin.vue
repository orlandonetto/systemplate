<template>
  <v-card class="surface">
    <v-card-title>
      Unlock admin
      <v-spacer/>

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text-body-1">
      Do you want to unblock this admin?
    </v-card-text>

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
import {updateAdminStatus} from "@/services/admins";
import {displayAlert} from "@/utils";

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
          id: this.$route.params.id,
          status: false,
        };

        await updateAdminStatus(payload).then((res) => {
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