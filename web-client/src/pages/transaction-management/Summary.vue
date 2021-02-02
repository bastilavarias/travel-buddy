<template>
  <section>
    <v-container>
      <v-skeleton-loader
        type="article, actions"
        v-if="isGetClientBookingStart && !booking"
      ></v-skeleton-loader>
      <v-card outlined v-if="!isGetClientBookingStart && booking">
        <v-card-title>
          <v-btn icon @click="goBack">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span> Booking Summary </span>
          <div class="flex-grow-1"></div>
          <generic-booking-status-chip
            :is-done="!booking.isDone"
            :from-date="booking.fromDate"
            :to-date="booking.toDate"
          ></generic-booking-status-chip>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <custom-label-and-content
                label="Transaction Number"
                :content="booking.customNumber"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Itinerary Name"
                :content="booking.post.name"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Price"
                :content="formatMoney(booking.post.price)"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Pax"
                :content="`${booking.post.pax} Members`"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Details"
                :content="formatItineraryDetails(booking.post.days)"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Date"
                :content="`${formatDate(booking.fromDate)} - ${formatDate(
                  booking.toDate
                )}`"
              ></custom-label-and-content>
            </v-col>
          </v-row>
        </v-card-text>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              :src="booking.tourGuide.profile.image.url"
              :lazy-src="booking.tourGuide.profile.image.url"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>Tour Guide</v-list-item-subtitle>
            <v-list-item-title class="font-weight-bold text-capitalize">{{
              formatName(
                booking.tourGuide.profile.firstName,
                booking.tourGuide.profile.lastName
              )
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <itinerary-post-details-page-table-card
          :days="booking.post.days"
          flat
        ></itinerary-post-details-page-table-card>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import commonUtilities from "@/common/utilities";
import { GET_CLIENT_BOOKING } from "@/store/types/transaction";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";
import ItineraryPostDetailsPageTableCard from "@/components/itinerary-post-details-page/ItineraryTableCard";
import CustomLabelAndContent from "@/components/custom/LabelAndContent";

export default {
  components: {
    CustomLabelAndContent,
    ItineraryPostDetailsPageTableCard,
    GenericBookingStatusChip,
  },

  mixins: [commonUtilities],

  data() {
    return {
      booking: false,
      isGetClientBookingStart: false,
    };
  },

  computed: {
    transactionID() {
      return this.$route.params.transactionID;
    },
  },

  methods: {
    async getClientBooking() {
      this.isGetClientBookingStart = true;
      this.booking = await this.$store.dispatch(
        GET_CLIENT_BOOKING,
        this.transactionID
      );
      this.isGetClientBookingStart = false;
    },
  },

  async created() {
    if (!this.transactionID) return this.goBack();
    await this.getClientBooking();
  },
};
</script>
