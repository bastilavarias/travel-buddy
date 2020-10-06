<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-app-bar app color="secondary" fixed style="z-index: 5" dark>
      <v-toolbar-title class="mr-5">
        <custom-router-link :to="{ name: 'feed-page' }">
          <span class="font-weight-bold white--text">
            Travel <span class="primary--text">Buddy</span>
          </span>
        </custom-router-link>
      </v-toolbar-title>
      <v-text-field
        hide-details
        single-line
        label="Search"
        rounded
        dense
        filled
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer> </v-spacer>
      <main-layout-toolbar-account-button-menu></main-layout-toolbar-account-button-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <generic-basic-footer></generic-basic-footer>
    </v-main>
  </v-app>
</template>

<script>
import CustomRouterLink from "@/components/custom/RouterLink";
import MainLayoutToolbarAccountButtonMenu from "@/components/main-layout/ToolbarAccountButtonMenu";
import GenericBasicFooter from "@/components/generic/footer/Basic";
export default {
  name: "main-layout",
  components: {
    GenericBasicFooter,
    MainLayoutToolbarAccountButtonMenu,
    CustomRouterLink,
  },
};
</script>
