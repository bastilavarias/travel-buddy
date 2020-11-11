<template>
  <v-card color="transparent" flat>
    <v-card-title class="font-weight-bold"> Bookings History </v-card-title>
    <v-card-subtitle>Here's your itinerary bookings history</v-card-subtitle>
    <v-card-text>
      <div class="text-center" v-if="bookings.length === 0">
        <span class="font-italic caption">No bookings yet</span>
      </div>
      <v-row dense v-if="bookings.length > 0">
        <template v-for="(booking, index) in bookings">
          <v-col cols="12" sm="6" md="4" lg="3" :key="index">
            <generic-booked-itinerary-details-preview-card
              :postID="booking.post.id"
              :name="booking.post.name"
              :transaction-number="booking.customNumber"
              :price="booking.post.price"
              :days="booking.post.days"
              :images="booking.post.images"
              :pax="booking.post.pax"
              :from-date="booking.fromDate"
              :to-date="booking.toDate"
              :is-done="booking.isDone"
            ></generic-booked-itinerary-details-preview-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericBookedItineraryDetailsPreviewCard from "@/components/generic/card/BookedItineraryDetailsPreview";
export default {
  name: "feed-page-bookings",
  components: { GenericBookedItineraryDetailsPreviewCard },
  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },
};
</script>
