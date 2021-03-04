<template>
  <v-card class="custom-border">
    <v-card-title class="font-weight-bold">Transaction Details</v-card-title>
    <v-card-subtitle>Additional Details</v-card-subtitle>
    <v-card-text>
      <div class="body-2">
        <span># of Days: </span>
        <span class="font-weight-bold">{{ daysCount }}</span>
      </div>
      <div class="body-2">
        <span># of Persons: </span>
        <span class="font-weight-bold">{{ pax }}</span>
      </div>
      <div class="body-2">
        <span># of Destinations: </span>
        <span class="font-weight-bold">{{ destinationsCount }}</span>
      </div>
      <div class="body-2">
        <span># of Activities: </span>
        <span class="font-weight-bold">{{ activitiesCount }}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        color="primary"
        class="text-capitalize"
        :to="{ name: 'itinerary-checkout-page', params: { postID } }"
        :disabled="!isAccountVerified"
        >{{
          isAccountVerified
            ? `Checkout (${formatMoney(price)})`
            : `Account Not Verified`
        }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";

export default {
  name: "itinerary-post-details-page-book-button-card",
  props: {
    price: {
      type: Number,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    postID: {
      type: Number,
      required: true,
    },
    pax: {
      type: Number,
      required: true,
    },
  },
  mixins: [commonUtilities],
  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
    daysCount() {
      const days = this.days.map((day) => day.day);
      return [...new Set(days)].length;
    },
    destinationsCount() {
      return [...new Set(this.days.map((day) => day.destination))].length;
    },
    activitiesCount() {
      return this.days
        .map((day) => day.activities.length)
        .reduce((flat, next) => flat + next, 0);
    },
    isAccountVerified() {
      return this.credentials.isVerified;
    },
  },
};
</script>

<style scoped>
.custom-border {
  border-top: 0.3rem solid #ff7557;
}
</style>
