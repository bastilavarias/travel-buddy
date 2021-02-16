<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold text-capitalize" v-if="name">
      <v-btn icon @click="goBack">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>
        {{ name }}
      </span></v-card-title
    >
    <v-card-text>
      <div class="mb-5" v-if="description">
        {{ description }}
      </div>
      <div class="d-flex align-center">
        <generic-rating-chip :rating="rating"></generic-rating-chip>
        <span
          >({{ reviewsCount }})
          {{ reviewsCount > 1 ? "Reviews" : "Review" }}</span
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";
import GenericRatingChip from "@/components/generic/chip/Rating";

export default {
  name: "itinerary-post-details-page-content-card",
  components: { GenericRatingChip },
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewsCount: {
      type: Number,
      required: true,
    },
  },
  mixins: [commonUtilities],
};
</script>
