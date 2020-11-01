<template>
  <div>
    <h1 class="title font-weight-bold mb-5">Discover our Itineraries</h1>
    <v-row dense>
      <template v-for="(itinerary, index) in itineraries">
        <v-col cols="12" sm="6" md="4" lg="3" :key="index">
          <generic-itinerary-details-preview-card
            :postID="itinerary.id"
            :name="itinerary.name"
            :price="itinerary.price"
            :days="itinerary.days"
            :images="itinerary.images"
            :isActive="itinerary.isActive"
          ></generic-itinerary-details-preview-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import GenericItineraryDetailsPreviewCard from "@/components/generic/card/ItineraryDetailsPreview";
export default {
  name: "feed-page-itineraries",
  components: { GenericItineraryDetailsPreviewCard },
  props: {
    itineraries: {
      type: Array,
      required: true,
    },
  },
};
</script>
