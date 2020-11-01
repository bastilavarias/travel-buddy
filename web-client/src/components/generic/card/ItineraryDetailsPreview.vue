<template>
  <v-card outlined :disabled="!isActive">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="firstImageUrl"
      :lazy-src="firstImageUrl"
    >
      <v-card-title class="caption">
        <span class="text-truncate">
          <v-icon color="white" small class="mr-1">mdi-map-marker</v-icon>
          <span class="text-capitalize">{{ firstDestination }}</span>
        </span>
      </v-card-title>
    </v-img>
    <v-card-text>
      <h2 class="subtitle-2 secondary--text text-capitalize mb-2" v-if="name">
        {{ name }}
      </h2>
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
      <h2 class="subtitle-2 font-weight-bold secondary--text" v-if="price">
        &#8369; {{ price }}
      </h2>
      <span class="caption secondary--text text-truncate">{{
        formatItineraryDetails(days)
      }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :to="{ name: 'itinerary-post-details-page', params: { postID } }"
        v-if="isActive"
      >
        View
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-chip small v-if="!isActive" class="font-italic">Unavailable</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";

export default {
  name: "generic-itinerary-details-preview-card",
  mixins: [commonUtilities],
  props: {
    postID: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    firstDestination() {
      return this.days.map((day) => day.destination)[0];
    },
    firstImageUrl() {
      return this.images[0].url;
    },
  },
};
</script>
