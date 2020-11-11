<template>
  <v-card outlined>
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
    <v-card-title>
      <span class="caption font-weight-bold">{{ transactionNumber }}</span>
      <div class="flex-grow-1"></div>
      <generic-booking-status-chip
        :is-done="!isDone"
        :from-date="fromDate"
        :to-date="toDate"
        small
      ></generic-booking-status-chip>
    </v-card-title>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="subtitle-2">{{ name }}</v-list-item-title>
        <v-list-item-subtitle>
          <span class="font-weight-bold secondary--text">
            {{ formatMoney(price) }}
          </span>
          ·
          <span class="font-weight-regular">{{ formatPaxLabel(pax) }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span class="caption secondary--text"
            >{{ formatDate(fromDate) }} - {{ formatDate(toDate) }}</span
          >
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        color="primary"
        :to="{ name: 'itinerary-post-details-page', params: { postID } }"
        >View</v-btn
      >
      <div class="flex-grow-1"></div>
      <span class="caption font-italic text-decoration-underline" v-if="isDone"
        >Write a review
      </span>
      <generic-rating-chip v-if="isDone"></generic-rating-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";
import moment from "moment";
import GenericRatingChip from "@/components/generic/chip/Rating";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";

export default {
  name: "generic-booked-itinerary-details-preview-card",
  components: { GenericBookingStatusChip, GenericRatingChip },
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
    transactionNumber: {
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
    pax: {
      type: Number,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    isDone: {
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

  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do YYYY") || "";
    },
  },
};
</script>
