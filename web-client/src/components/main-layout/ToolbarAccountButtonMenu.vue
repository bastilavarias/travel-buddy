<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            color="transparent"
            depressed
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
            :class="buttonClassName"
          >
            <v-avatar class="mr-2" :size="30">
              <v-img
                src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
                lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
              ></v-img>
            </v-avatar>
            <span class="text-capitalize mr-1">Sebastian L.</span>
            <v-icon small>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <span>Profile</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-list-item two-line>
        <v-list-item-avatar :size="50">
          <v-img
            src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
            lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <span class="font-weight-bold secondary--text">Sebastian L.</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="secondary--text">See Profile</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <template v-for="(action, index) in actions">
        <v-list-item :key="index" :to="action.to" exact>
          <v-list-item-title class="font-weight-bold">{{
            action.title
          }}</v-list-item-title>
          <v-list-item-action-text>
            <v-icon color="secondary">{{ action.icon }}</v-icon>
          </v-list-item-action-text>
        </v-list-item>
      </template>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "main-layout-toolbar-account-button-menu",
  props: {
    buttonClassName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      actions: [
        {
          title: "Settings",
          icon: "mdi-cog",
        },
        {
          title: "Sign Out",
          icon: "mdi-logout",
          to: { name: "home-page" },
        },
      ],
    };
  },
};
</script>
