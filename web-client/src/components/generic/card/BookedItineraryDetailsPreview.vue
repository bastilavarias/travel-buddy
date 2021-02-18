<template>
  <v-card class="elevation-1">
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
        :to="{ name: 'booking-summary-page', params: { transactionID } }"
        >Summary</v-btn
      >
      <div class="flex-grow-1"></div>
      <v-btn
        text
        small
        @click="isReviewDialogOpen = true"
        v-if="isDone && !postReview"
      >
        <span
          class="caption font-italic text-decoration-underline text-capitalize"
          >Write a review
        </span>
      </v-btn>
      <generic-rating-chip
        v-if="isDone && postReview"
        :rating="postReview.rating"
      ></generic-rating-chip>
    </v-card-actions>
    <v-dialog v-model="isReviewDialogOpen" width="500" persistent>
      <v-card>
        <v-card-title>
          <span>Write a Review</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="isReviewDialogOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-tabs fixed-tabs v-model="reviewTab">
          <template v-for="(tab, index) in reviewTabs">
            <v-tab :key="index" class="text-capitalize">
              {{ tab }}
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="reviewTab">
          <v-tab-item>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    label="Experience Review"
                    v-model="form.itinerary.text"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="text-center">
                    <v-rating
                      half-increments
                      hover
                      v-model="form.itinerary.rating"
                    ></v-rating>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    label="Tour Guide Review"
                    v-model="form.tourGuide.text"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="text-center">
                    <v-rating
                      half-increments
                      hover
                      v-model="form.tourGuide.rating"
                    ></v-rating>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="text-capitalize"
            @click="isReviewDialogOpen = false"
            >Close</v-btn
          >
          <v-btn
            color="primary"
            @click="submitReview"
            :disabled="!isFormValid"
            :loading="isSubmitReviewStart"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import commonUtilities from "@/common/utilities";
import GenericRatingChip from "@/components/generic/chip/Rating";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";
import { CREATE_TRANSACTION_REVIEW } from "@/store/types/transaction";

const defaultForm = {
  itinerary: {
    text: null,
    rating: 1,
  },

  tourGuide: {
    text: null,
    rating: 1,
  },
};

export default {
  name: "generic-booked-itinerary-details-preview-card",

  components: { GenericBookingStatusChip, GenericRatingChip },

  mixins: [commonUtilities],

  props: {
    transactionID: {
      type: Number,
      required: true,
    },
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
    postReview: {
      required: true,
    },
    tourGuide: {
      required: true,
    },
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isReviewDialogOpen: false,
      reviewTabs: ["Experience", "Tour Guide"],
      reviewTab: null,
      form: Object.assign({}, defaultForm),
      defaultForm,
      isSubmitReviewStart: false,
      bookingsLocal: this.bookings,
    };
  },

  computed: {
    firstDestination() {
      return this.days.map((day) => day.destination)[0];
    },
    firstImageUrl() {
      return this.images[0].url;
    },

    isFormValid() {
      const { itinerary, tourGuide } = this.form;
      return itinerary.text && tourGuide.text;
    },

    credentials() {
      return this.$store.state.authentication.credentials;
    },
  },

  watch: {
    bookings(value) {
      this.bookingsLocal = value;
    },

    bookingsLocal(value) {
      this.$emit("update:bookings", value);
    },
  },

  methods: {
    async submitReview() {
      this.isSubmitReviewStart = true;
      const payload = {
        transactionID: this.transactionID,
        accountID: this.credentials.id,
        review: {
          itinerary: {
            id: this.postID,
            text: this.form.itinerary.text,
            rating: this.form.itinerary.rating,
          },
          tourGuide: {
            id: this.tourGuide.id,
            text: this.form.tourGuide.text,
            rating: this.form.tourGuide.rating,
          },
        },
      };
      const { success, data } = await this.$store.dispatch(
        CREATE_TRANSACTION_REVIEW,
        payload
      );
      if (success) {
        this.bookingsLocal = this.bookingsLocal.map((booking) => {
          if (booking.id === this.transactionID) {
            booking = Object.assign(booking, data);
          }
          return booking;
        });
        this.isReviewDialogOpen = false;
        this.isSubmitReviewStart = false;
        return;
      }
      this.isSubmitReviewStart = false;
    },
  },
};
</script>
