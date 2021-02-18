<template>
  <v-card color="transparent" flat>
    <v-card-title
      class="d-flex justify-center align-content-center align-center"
    >
      <span class="font-weight-bold"> Bookings History </span>
      <v-spacer></v-spacer>
      <v-text-field
        dense
        filled
        rounded
        single-line
        hide-details
        label="Search"
        append-icon="mdi-magnify"
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-card-subtitle v-if="search">
      Search results for: {{ search }}
    </v-card-subtitle>
    <v-card-text>
      <div class="text-center" v-if="searchedBookings.length === 0">
        <span class="font-italic caption">No data.</span>
      </div>
      <v-row dense v-if="bookings.length > 0">
        <template v-for="(booking, index) in searchedBookings">
          <v-col cols="12" sm="6" md="4" lg="3" :key="index">
            <generic-booked-itinerary-details-preview-card
              :transactionID="booking.id"
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
              :postReview="booking.postReview"
              :tourGuide="booking.tourGuide"
              :bookings.sync="bookingsLocal"
            ></generic-booked-itinerary-details-preview-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericBookedItineraryDetailsPreviewCard from "@/components/generic/card/BookedItineraryDetailsPreview";
import moment from "moment";
export default {
  name: "feed-page-bookings",

  components: { GenericBookedItineraryDetailsPreviewCard },

  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      bookingsLocal: this.bookings,
      search: null,
    };
  },

  computed: {
    formattedBookings() {
      return this.bookingsLocal.map((booking) => {
        const toDate = moment(booking.toDate).valueOf() || null;
        const currentDate = moment().valueOf() || null;
        booking.isDone = currentDate > toDate;
        return booking;
      });
    },

    searchedBookings() {
      const bookings = this.formattedBookings;
      if (!this.search) return bookings;
      return bookings.filter((booking) => {
        const keyword = this.search.toLowerCase().trim();
        if (booking.post.name.toLowerCase().trim().includes(keyword))
          return booking;
      });
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
};
</script>
