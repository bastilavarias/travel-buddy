<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2">
          <div class="caption mb-2">
            <span class="text-capitalize">{{
              formatName(author.profile.firstName, author.profile.lastName)
            }}</span>
            - {{ formatDateFromNow(createdAt) }}
          </div>
          <div class="subtitle-2 text-justify mb-2">
            {{ text }}
          </div>
          <generic-rating-chip :rating="rating"></generic-rating-chip>
        </div>
        <v-avatar :size="40">
          <v-img
            :src="author.profile.image.url"
            :lazy-src="author.profile.image.url"
          ></v-img>
        </v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";
import GenericRatingChip from "@/components/generic/chip/Rating";

export default {
  name: "itinerary-post-details-review-media",
  components: { GenericRatingChip },
  mixins: [commonUtilities],

  props: {
    className: {
      type: String,
      required: false,
    },

    author: {
      type: Object,
      required: true,
    },

    createdAt: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
};
</script>
