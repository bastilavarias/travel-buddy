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
          <v-list-item-subtitle>Tour Guide</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list flat>
        <v-list-item
          :to="{ name: 'tour-guide-personal-bookings-page/table' }"
          active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-title> My Bookings </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import CustomRouterLink from "@/components/custom/RouterLink";
import MainLayoutToolbarAccountButtonMenu from "@/components/main-layout/ToolbarAccountButtonMenu";
import commonUtilities from "@/common/utilities";
export default {
  name: "tour-guide-layout",
  components: { MainLayoutToolbarAccountButtonMenu, CustomRouterLink },
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
