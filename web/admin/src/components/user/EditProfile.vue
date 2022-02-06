<template>
  <v-card class="surface">
    <v-card-title>
      Edit user profile
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

        <div class="mb-1">Country Code</div>
        <v-autocomplete
            v-model="form.ddi"
            :items="countryCodes"
            item-text="label"
            background-color="accent"
            :rules="rules"
            return-object
            flat
            solo
        />

        <div class="mb-1">Phone Number</div>
        <v-text-field
            v-model="form.phone"
            v-mask="getMask"
            background-color="accent"
            :rules="phoneRules"
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
import {updateUser} from "@/services/users";
import {capitalize, displayAlert, parseNumber} from "@/utils";
import {mask} from "vue-the-mask";
import phoneMasks from "@/assets/utils/phoneMasks.json";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      countryCodes: [],
      form: {
        firstName: "",
        lastName: "",
        ddi: "",
        phone: "",
      },
    };
  },

  directives: {mask},

  beforeMount() {
    this.countryCodes = phoneMasks;
    this.form.firstName = this.selected.firstName;
    this.form.lastName = this.selected.lastName;
    this.form.phone = this.selected.phone;

    this.countryCodes.map((e) => {
      if (e.value === `+${this.selected.ddi}`) {
        this.form.ddi = e;
      }
    });
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
      return [(v) => !!v || "Invalid field"];
    },

    phoneRules() {
      return [
        (v) => !!v || "Invalid field",
        (v) => v.length >= 3 || "Invalid phone",
      ];
    },

    getMask() {
      let mask = "";

      phoneMasks.map((e) => {
        if (e === this.form.ddi) {
          mask = e.mask;
        }
      });

      return mask;
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
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            ddi: this.form.ddi.value.replace("+", ""),
            phone: this.form.phone,
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