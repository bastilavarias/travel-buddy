<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-system-bar height="30" color="warning" app v-if="shouldShowSystemBar">
      <v-spacer></v-spacer>
      <div>
        <span class="font-weight-bold">Warning: </span>Your account is pending
        to be verified. You can't make any transaction yet.
      </div>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-app-bar app color="secondary" fixed style="z-index: 5" dark>
      <v-toolbar-title class="mr-5">
        <custom-router-link :to="{ name: 'feed-page' }">
          <span class="font-weight-bold white--text">
            Travel <span class="primary--text">Buddy</span>
          </span>
        </custom-router-link>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <main-layout-toolbar-account-button-menu></main-layout-toolbar-account-button-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <generic-basic-footer></generic-basic-footer>
    <custom-global-snackbar></custom-global-snackbar>
  </v-app>
</template>

<script>
import CustomRouterLink from "@/components/custom/RouterLink";
import MainLayoutToolbarAccountButtonMenu from "@/components/main-layout/ToolbarAccountButtonMenu";
import GenericBasicFooter from "@/components/generic/footer/Basic";
import CustomGlobalSnackbar from "@/components/custom/GlobalSnackbar";
export default {
  name: "main-layout",
  components: {
    CustomGlobalSnackbar,
    GenericBasicFooter,
    MainLayoutToolbarAccountButtonMenu,
    CustomRouterLink,
  },
  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
    shouldShowSystemBar() {
      const { isVerified } = this.credentials;
      return !isVerified;
    },
  },
};
</script>
