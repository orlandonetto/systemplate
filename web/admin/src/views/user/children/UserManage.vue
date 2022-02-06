<template>
  <section>
    <v-row>
      <v-col cols="12" md="6">
        <h1 class="text-h6 mb-2">Account Settings</h1>

        <v-list class="transparent pa-0" nav>
          <v-list-item class="accent" @click="dialogNotify = true">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notify User</v-list-item-title>
          </v-list-item>

          <v-list-item class="accent" @click="dialogRecoverPass = true">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-email-send-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reset Password</v-list-item-title>
          </v-list-item>

          <v-list-item class="accent" @click="dialogSetPass = true">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-lock-check-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Set New Password</v-list-item-title>
          </v-list-item>

          <v-list-item
              v-if="selected.status === 'Active'"
              class="accent"
              @click="dialogBlockUser = true"
          >
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="red">mdi-cancel</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="red--text">
              Block User
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-else class="accent" @click="dialogUnblockUser = true">
            <v-list-item-icon class="ml-1 mr-3">
              <v-icon color="primary">mdi-cancel</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Unblock User</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

    </v-row>

    <!-- dialog -->
    <v-dialog v-model="dialogNotify" max-width="500" persistent>
      <NotifyUser
          v-if="dialogNotify"
          @close="dialogNotify = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="dialogRecoverPass" max-width="500" persistent>
      <RecoverPassword
          v-if="dialogRecoverPass"
          @close="dialogRecoverPass = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="dialogSetPass" max-width="500" persistent>
      <SetNewPassword
          v-if="dialogSetPass"
          @close="dialogSetPass = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="dialogBlockUser" max-width="500" persistent>
      <BlockUser
          v-if="dialogBlockUser"
          @close="dialogBlockUser = false"
          @success="updateSelected()"
      />
    </v-dialog>

    <v-dialog v-model="dialogUnblockUser" max-width="500" persistent>
      <UnblockUser
          v-if="dialogUnblockUser"
          @close="dialogUnblockUser = false"
          @success="updateSelected()"
      />
    </v-dialog>
  </section>
</template>

<script>
import {mapState} from "vuex";
import NotifyUser from "@/components/user/NotifyUser";
import RecoverPassword from "@/components/user/RecoverPassword";
import SetNewPassword from "@/components/user/SetNewPassword";
import BlockUser from "@/components/user/BlockUser";
import UnblockUser from "@/components/user/UnblockUser";

export default {
  data: () => ({
    dialogNotify: false,
    dialogAddBalance: false,
    dialogRemoveBalance: false,
    dialogRecoverPass: false,
    dialogSetPass: false,
    dialogBlockUser: false,
    dialogUnblockUser: false,
    dialogChangeAnalyst: false,
  }),

  components: {
    NotifyUser,
    RecoverPassword,
    SetNewPassword,
    BlockUser,
    UnblockUser,
  },

  computed: {
    ...mapState(["selected"]),
  },

  methods: {
    updateSelected() {
      this.$root.$emit("update-selected");
    },
  },
};
</script>

<style>
</style>