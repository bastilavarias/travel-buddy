<template>
  <v-card outlined>
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="caption">
        <span>
          <v-icon color="white" small class="mr-1">mdi-map-marker</v-icon>
          <span>Lorem ipsum dolor sit amet.</span>
        </span>
      </v-card-title>
    </v-img>
    <v-card-text>
      <h2 class="subtitle-2 secondary--text">Itinerary Name</h2>
      <div class="d-flex align-center">
        <v-chip small class="mr-1">
          <v-icon color="primary" small left>mdi-star</v-icon>
          <span class="primary--text">5.0</span>
        </v-chip>
        <div>
          <span>1 Reviews</span>
          <span class="mx-1">|</span>
          <span>100 Booked</span>
        </div>
      </div>
    </v-card-text>
    <v-card-text>
      <h2 class="subtitle-2 font-weight-bold secondary--text">
        &#8369; 999.999
      </h2>
      <span class="caption secondary--text">3 Days</span>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :to="{ name: 'itinerary-post-details-page' }">
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "generic-itinerary-details-preview-card",
};
</script>
