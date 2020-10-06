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
    </v-card-text>
    <v-card-text>
      <h2 class="subtitle-2 font-weight-bold secondary--text">
        &#8369; 999.999
      </h2>
      <span class="caption secondary--text">Sept 22, 2020 - Sept 25, 2020</span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :disabled="isRated"
        :to="{ name: 'itinerary-post-details-page' }"
        >View</v-btn
      >
      <div class="flex-grow-1"></div>
      <span
        v-if="!isRated"
        class="caption font-italic text-decoration-underline"
        >Write a review
      </span>
      <v-chip small v-if="isRated">
        <v-icon color="primary" small left>mdi-star</v-icon>
        <span class="primary--text">5.0</span>
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "generic-booked-itinerary-details-preview-card",
  props: {
    isRated: {
      type: Boolean,
      require: true,
    },
  },
};
</script>
