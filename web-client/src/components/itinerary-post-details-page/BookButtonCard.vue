<template>
  <v-card class="custom-border">
    <v-card-title class="font-weight-bold">Booking Details</v-card-title>
    <v-card-subtitle>Additional Details</v-card-subtitle>
    <v-card-text>
      <div class="body-2">
        <span>Long: </span>
        <span class="font-weight-bold">3 Days</span>
      </div>
      <div class="body-2">
        <span>Total Destinations: </span>
        <span class="font-weight-bold">4</span>
      </div>
      <div class="body-2">
        <span># of Activities: </span>
        <span class="font-weight-bold">10</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="primary" class="text-capitalize"
        >Book Now (&#8369; 999.999)</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-book-button-card",
};
</script>

<style scoped>
.custom-border {
  border-top: 0.3rem solid #ff7557;
}
</style>
