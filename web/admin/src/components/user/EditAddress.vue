<template>
  <v-card class="surface">
    <v-card-title>
      Edit user address
      <v-spacer />

      <v-btn class="rounded-lg" icon tile @click="close()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <section class="px-6 py-3">
      <v-form v-model="valid" ref="form" auto-complete="off">
        <label class="subtext--text">Country</label>
        <v-text-field
          v-model="form.country"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">State</label>
        <v-text-field
          v-model="form.state"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">City</label>
        <v-text-field
          v-model="form.city"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">Zip Code</label>
        <v-text-field
          v-model="form.zipCode"
          v-mask="'############'"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">Neighboorhood</label>
        <v-text-field
          v-model="form.neighboorhood"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">Street</label>
        <v-text-field
          v-model="form.street"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">Number</label>
        <v-text-field
          v-model="form.number"
          v-mask="'######'"
          background-color="accent"
          :rules="rules"
          solo
          flat
        />

        <label class="subtext--text">Complement</label>
        <v-text-field
          v-model="form.additional"
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
import { mapState } from "vuex";
import { updateUser } from "@/services/users";
import { displayAlert, capitalize, parseNumber } from "@/utils";
import { mask } from "vue-the-mask";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        country: "",
        state: "",
        city: "",
        zipCode: "",
        neighboorhood: "",
        street: "",
        number: "",
        additional: "",
      },
    };
  },

  directives: { mask },

  beforeMount() {
    if (this.selected.address) {
      this.form.country = this.selected.address.country;
      this.form.state = this.selected.address.state;
      this.form.city = this.selected.address.city;
      this.form.zipCode = this.selected.address.zipCode;
      this.form.neighboorhood = this.selected.address.neighboorhood;
      this.form.street = this.selected.address.street;
      this.form.number = this.selected.address.number;
      this.form.additional = this.selected.address.additional;
    }
  },

  watch: {
    ["form.country"](value) {
      this.form.country = capitalize(value);
    },

    ["form.state"](value) {
      this.form.state = capitalize(value);
    },

    ["form.city"](value) {
      this.form.city = capitalize(value);
    },

    ["form.neighboorhood"](value) {
      this.form.neighboorhood = capitalize(value);
    },

    ["form.street"](value) {
      this.form.street = capitalize(value);
    },

    ["form.additional"](value) {
      this.form.additional = capitalize(value);
    },
  },

  computed: {
    ...mapState(["selected"]),

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
          id: this.$route.params.id,
          update: {
            street: this.form.street,
            neighboorhood: this.form.neighboorhood,
            number: this.form.number,
            city: this.form.city,
            state: this.form.state,
            country: this.form.country,
            zipCode: this.form.zipCode,
            additional: this.form.additional,
          },
        };

        await updateUser(payload).then((res) => {
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