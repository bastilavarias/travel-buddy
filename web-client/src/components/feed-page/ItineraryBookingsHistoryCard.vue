<template>
  <v-card color="transparent" flat>
    <v-card-title class="font-weight-bold"> Bookings History </v-card-title>
    <v-card-subtitle>Here's your itinerary bookings history</v-card-subtitle>
    <v-card-text>
      <v-row dense>
        <template v-for="n in 7">
          <v-col cols="12" sm="6" md="4" lg="3" :key="n">
            <generic-booked-itinerary-details-preview-card
              :is-rated="n % 2 === 0"
            ></generic-booked-itinerary-details-preview-card>
          </v-col>
        </template>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            color="secondary"
            flat
            class="d-flex align-center justify-center"
            min-height="384"
          >
            <v-icon color="white" x-large
              >mdi-dots-horizontal-circle-outline</v-icon
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericBookedItineraryDetailsPreviewCard from "@/components/generic/card/BookedItineraryDetailsPreview";
export default {
  name: "feed-page-bookings",
  components: { GenericBookedItineraryDetailsPreviewCard },
};
</script>
