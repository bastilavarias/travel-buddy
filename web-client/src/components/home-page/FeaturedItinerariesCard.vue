<template>
  <v-card outlined color="transparent">
    <v-card-title class="font-weight-bold">Featured Itineraries</v-card-title>
    <v-card-text>
      <v-row dense>
        <template v-for="n in 8">
          <v-col cols="12" sm="6" md="4" lg="3" :key="n">
            <generic-itinerary-details-preview-card></generic-itinerary-details-preview-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericItineraryDetailsPreviewCard from "@/components/generic/card/ItineraryDetailsPreview";
export default {
  name: "home-page-featured-itineraries-card",
  components: { GenericItineraryDetailsPreviewCard },
};
</script>
