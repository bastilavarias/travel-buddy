<template>
  <v-app>
    <v-app-bar app color="secondary" fixed style="z-index: 5" dark clipped-left>
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
    <v-navigation-drawer app clipped>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            :src="credentials.profile.image.url"
            :lazy-src="credentials.profile.image.url"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-capitalize">{{
            formatName(
              credentials.profile.firstName,
              credentials.profile.lastName
            )
          }}</v-list-item-title>
          <v-list-item-subtitle>Administrator</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list flat>
        <template v-for="(action, index) in actions">
          <v-list-item
            :key="index"
            :to="action.to"
            active-class="primary--text"
          >
            <v-list-item-icon>
              <v-icon>{{ action.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ action.text }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <custom-global-snackbar></custom-global-snackbar>
  </v-app>
</template>

<script>
import CustomRouterLink from "@/components/custom/RouterLink";
import MainLayoutToolbarAccountButtonMenu from "@/components/main-layout/ToolbarAccountButtonMenu";
import CustomGlobalSnackbar from "@/components/custom/GlobalSnackbar";
import commonUtilities from "@/common/utilities";
export default {
  name: "administrator-layout",
  components: {
    CustomGlobalSnackbar,
    MainLayoutToolbarAccountButtonMenu,
    CustomRouterLink,
  },
  data() {
    return {
      actions: [
        {
          text: "Transactions",
          icon: "mdi-file-table",
          to: { name: "transaction-management-page/table" },
        },
        {
          text: "Manage Itineraries",
          icon: "mdi-beach",
          to: { name: "itinerary-management-page/table" },
        },
        {
          text: "Manage Tour Guides",
          icon: "mdi-account-cowboy-hat",
          to: { name: "tour-guide-management-page/table" },
        },
        {
          text: "Manage Accounts",
          icon: "mdi-account",
          to: { name: "account-management-page/table" },
        },
      ],
    };
  },
  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
    profile() {
      return this.credentials.profile;
    },
  },
  mixins: [commonUtilities],
};
</script>
