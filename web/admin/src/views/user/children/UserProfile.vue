<template>
  <section>
    <v-row>
      <v-col cols="12" md="6">
        <!-- personal informations -->
        <div class="d-flex mb-2">
          <span class="text-h6">Personal Information</span>

          <v-spacer/>

          <!-- edit menu -->
          <v-btn color="primary" txet small @click="editInfo = true">
            Edit
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <!-- list info -->
        <v-list class="transparent pa-0" nav>
          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-pound</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected._id }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold"> ID</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-account-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.firstName }} {{ selected.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold"> Name and Lastname</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-email-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.email }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold"> E-mail</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-phone-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.ddi }} {{ selected.phone }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold"> Phone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-calendar-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ formatDate(selected.createdAt) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-caption font-weight-bold"> Created At</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" md="6">
        <!-- address -->
        <div class="d-flex mb-2">
          <span class="text-h6">Address</span>

          <v-spacer/>

          <!-- edit menu -->
          <v-btn color="primary" text small @click="editAddress = true">
            Edit
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </div>

        <!-- list address -->
        <v-list v-if="selected.address" class="transparent pa-0" nav>
          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-pound</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.country }}
              </v-list-item-title>
              <v-list-item-subtitle> Country</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-map-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.state }}
              </v-list-item-title>
              <v-list-item-subtitle> State or Province</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-home-city-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.city }}
              </v-list-item-title>
              <v-list-item-subtitle> City</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-numeric</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.zipCode }}
              </v-list-item-title>
              <v-list-item-subtitle> Zip Code</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-home-group</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.neighboorhood }}
              </v-list-item-title>
              <v-list-item-subtitle> Neighboorhood</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-map-marker-radius-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.street }}
              </v-list-item-title>
              <v-list-item-subtitle> Street</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-counter</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.number }}
              </v-list-item-title>
              <v-list-item-subtitle> Number</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="accent">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-dots-horizontal</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ selected.address.complement ? selected.address.complement : "Empty" }}
              </v-list-item-title>
              <v-list-item-subtitle>Complement</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- call to register address -->
        <v-card v-else class="px-4 py-5" color="accent">
          <span class="subtext--text text-body-2"> Empty address </span>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialogs -->
    <v-dialog v-model="editInfo" max-width="500" persistent>
      <EditProfile
          v-if="editInfo"
          @close="editInfo = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="editAddress" max-width="500" persistent>
      <EditAddress
          v-if="editAddress"
          @close="editAddress = false"
          @success="updateSelected()"
      />
    </v-dialog>
  </section>
</template>

<script>
import {mapState} from "vuex";
import {displayAlert, formatDate} from "@/utils";
import EditProfile from "@/components/user/EditProfile";
import EditAddress from "@/components/user/EditAddress";

export default {
  data: () => ({
    editInfo: false,
    editAddress: false,
  }),

  components: {
    EditProfile,
    EditAddress,
  },

  computed: {
    ...mapState(["selected"]),
  },

  methods: {
    updateSelected() {
      this.$root.$emit("update-selected");
    },

    formatDate,

    displayAlert,
  },
};
</script>

<style>
</style>