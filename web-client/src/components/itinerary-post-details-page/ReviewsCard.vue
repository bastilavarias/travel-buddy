<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Reviews</v-card-title>
    <v-card-text>
      <template v-for="n in 5">
        <itinerary-post-details-review-media
          :key="n"
          class-name="mb-5"
        ></itinerary-post-details-review-media>
        <v-divider v-if="n !== 5"></v-divider>
      </template>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="secondary" class="text-capitalize">See All</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ItineraryPostDetailsReviewMedia from "@/components/generic/media/ItineraryPostDetailsReview";
export default {
  name: "itinerary-post-details-page-reviews-card",
  components: { ItineraryPostDetailsReviewMedia },
};
</script>
