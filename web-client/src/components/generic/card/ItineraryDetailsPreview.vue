<template>
  <v-card :disabled="!isActive">
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
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle class="font-weight-bold secondary--text mb-2">
          {{ name }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <div class="d-flex align-center">
            <generic-rating-chip :rating="rating"></generic-rating-chip>
            <div>
              <span
                >{{ reviewsCount }}
                {{ reviewsCount > 1 ? "Reviews" : "Review" }}</span
              >
              <span class="mx-1">|</span>
              <span>{{ transactionCount }} Booked</span>
            </div>
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span class="font-weight-bold secondary--text">
            {{ formatMoney(price) }}
          </span>
          ·
          <span class="font-weight-regular">{{ formatPaxLabel(pax) }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span class="secondary--text text-truncate">{{
            formatItineraryDetails(days)
          }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        color="primary"
        :to="{ name: 'itinerary-post-details-page', params: { postID } }"
        :disabled="!isActive"
      >
        View
      </v-btn>
      <div class="flex-grow-1"></div>
      <span class="font-italic caption" v-if="!isActive">Unavailable</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";
import GenericRatingChip from "@/components/generic/chip/Rating";

export default {
  name: "generic-itinerary-details-preview-card",
  components: { GenericRatingChip },
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
    pax: {
      type: Number,
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
    transactionCount: {
      type: Number,
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
