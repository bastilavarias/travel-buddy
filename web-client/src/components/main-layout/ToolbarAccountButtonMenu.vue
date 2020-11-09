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
                :src="profile.image.url"
                :lazy-src="profile.image.url"
              ></v-img>
            </v-avatar>
            <span class="text-capitalize mr-1">{{ displayName }}</span>
            <v-icon small>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <span>Profile</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-list flat>
        <v-list-item two-line>
          <v-list-item-avatar :size="50">
            <v-img
              :src="profile.image.url"
              :lazy-src="profile.image.url"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <span class="font-weight-bold secondary--text text-capitalize">{{
                displayName
              }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="secondary--text">See Profile</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <template v-for="(action, index) in actions">
        <v-list-item
          :key="index"
          :to="action.to"
          exact-active-class="secondary--text"
          exact
        >
          <v-list-item-title class="font-weight-bold">{{
            action.title
          }}</v-list-item-title>
          <v-list-item-action-text>
            <v-icon color="secondary">{{ action.icon }}</v-icon>
          </v-list-item-action-text>
        </v-list-item>
      </template>
      <v-list-item>
        <v-list-item-title
          class="font-weight-bold cursor-pointer"
          @click="signOut"
          >Sign Out</v-list-item-title
        >
        <v-list-item-action-text>
          <v-icon color="secondary">mdi-logout</v-icon>
        </v-list-item-action-text>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
import { PURGE_AUTHENTICATION } from "@/store/types/authentication";
import "@/style/global.css";

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
          title: "Administrator Panel",
          icon: "mdi-view-dashboard-outline",
          to: { name: "booking-management-page/table" },
        },
        {
          title: "Tour Guide Panel",
          icon: "mdi-view-dashboard-outline",
          to: { name: "tour-guide-personal-bookings-page/table" },
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
    displayName() {
      const { firstName, lastName } = this.profile;
      const newFirstName = firstName.split(" ")[0];
      const newLastname = lastName.split(" ")[0];
      return `${newFirstName} ${newLastname[0] || ""}.`;
    },
  },
  methods: {
    async signOut() {
      await this.$store.commit(PURGE_AUTHENTICATION);
      await this.$router.push({ name: "sign-in-page" });
    },
  },
};
</script>
