<template>
  <loader-view v-if="loading"/>

  <v-container v-else>
    <!-- header -->
    <div class="d-flex align-center mb-2">
      <v-list-item class="px-0">
        <v-list-item-action class="mr-3">
          <v-btn class="rounded-lg" icon tile @click="close()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-title class="text-h5 font-weight-bold">
          {{ $route.name }}
        </v-list-item-title>
      </v-list-item>
    </div>

    <section>
      <v-row>
        <!-- personal informations -->
        <v-col cols="12" md="6">
          <div class="d-flex mb-2">
            <span class="text-h6">Personal Informations</span>

            <v-spacer/>

            <!-- edit menu -->
            <v-btn color="primary" text small @click="editInfo = true">
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
                <v-list-item-subtitle> ID</v-list-item-subtitle>
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
                <v-list-item-subtitle> Name and Lastname</v-list-item-subtitle>
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
                <v-list-item-subtitle> E-mail</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="accent">
              <v-list-item-icon class="ml-1 mr-3">
                <v-icon color="primary">mdi-account-group-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> Group</v-list-item-title>
                <v-list-item-subtitle> Group</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- manage -->
        <v-col cols="12" md="6">
          <h1 class="text-h6 mb-2">Account Manage</h1>

          <v-list class="transparent pa-0" nav>
            <v-list-item class="accent" @click="dialogSetPass = true">
              <v-list-item-icon class="ml-1 mr-3">
                <v-icon color="primary">mdi-lock-check-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title> Set New Password</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="selected.isActive" class="accent" @click="dialogBlockAdmin = true">
              <v-list-item-icon class="ml-1 mr-3">
                <v-icon color="red">mdi-cancel</v-icon>
              </v-list-item-icon>

              <v-list-item-title class="red--text">
                Block Admin
              </v-list-item-title>
            </v-list-item>

            <v-list-item v-else class="accent" @click="dialogUnblockAdmin = true">
              <v-list-item-icon class="ml-1 mr-3">
                <v-icon color="primary">mdi-cancel</v-icon>
              </v-list-item-icon>
              <v-list-item-title> Unblock Admin</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </section>

    <!-- dialogs -->
    <v-dialog v-model="editInfo" max-width="500" persistent>
      <EditProfile
          v-if="editInfo"
          @close="editInfo = false"
          @success="getData()"
      />
    </v-dialog>

    <!--todo create function updateSelected-->
    <v-dialog v-model="dialogSetPass" max-width="500" persistent>
      <SetNewPassword
          v-if="dialogSetPass"
          @close="dialogSetPass = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="dialogBlockAdmin" max-width="500" persistent>
      <BlockAdmin
          v-if="dialogBlockAdmin"
          @close="dialogBlockAdmin = false"
          @success="getData()"
      />
    </v-dialog>

    <v-dialog v-model="dialogUnblockAdmin" max-width="500" persistent>
      <UnblockAdmin
          v-if="dialogUnblockAdmin"
          @close="dialogUnblockAdmin = false"
          @success="getData()"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {getAdmin} from "@/services/admins";
import EditProfile from "@/components/admin/EditAdmin";
import SetNewPassword from "@/components/admin/SetNewPassword";
import BlockAdmin from "@/components/admin/BlockAdmin";
import UnblockAdmin from "@/components/admin/UnblockAdmin";

export default {
  data() {
    return {
      loading: true,
      editInfo: false,
      dialogSetPass: false,
      dialogBlockAdmin: false,
      dialogUnblockAdmin: false,
    };
  },

  components: {
    EditProfile,
    SetNewPassword,
    BlockAdmin,
    UnblockAdmin,
  },

  beforeMount() {
    this.getData();
  },

  computed: {
    ...mapState(["selected"]),
  },

  methods: {
    ...mapActions(["setSelected"]),

    async getData() {
      await getAdmin(this.$route.params.id)
          .then((res) => this.setSelected(res))
          .catch(err => console.log(err))
          .finally(() => setTimeout(() => this.loading = false, 500))
    },

    close() {
      const callback = this.$route.query.callback;

      if (callback) this.$router.push({path: `/${callback}`});
      else this.$router.push({path: "/admins"});
    },
  },
};
</script>

<style>
</style>