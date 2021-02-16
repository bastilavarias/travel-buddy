<template>
  <v-card>
    <v-tabs v-model="tabStateLocal">
      <template v-for="(tab, index) in tabSelections">
        <v-tab :key="index">
          <v-icon left>{{ tab.icon }}</v-icon>
          <span class="text-capitalize">{{ tab.text }}</span>
        </v-tab>
      </template>
      <v-spacer></v-spacer>
      <v-tab>
        <v-icon left>mdi-clipboard-list</v-icon>
        <span class="text-capitalize">My Bookings</span>
      </v-tab>
      <v-tab v-if="credentials.type.name === 'client'">
        <v-icon left>mdi-account-edit</v-icon>
        <span class="text-capitalize">Account</span>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "feed-page-header",
  props: {
    tabState: {
      type: Number | Boolean,
      required: true,
    },
  },
  data() {
    return {
      tabStateLocal: this.tabState,
      tabSelections: [
        {
          icon: "mdi-beach",
          text: "Itineraries",
        },
        {
          icon: "mdi-account-cowboy-hat",
          text: "Tour Guides",
        },
      ],
    };
  },
  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
  },
  watch: {
    tabState(val) {
      this.tabStateLocal = val;
    },
    tabStateLocal(val) {
      this.$emit("update:tabState", val);
    },
  },
};
</script>
