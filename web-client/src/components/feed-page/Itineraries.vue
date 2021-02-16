<template>
  <div>
    <h1 class="title font-weight-bold mb-5">Discover our Itineraries</h1>
    <div class="text-center" v-if="itineraries.length === 0">
      <span class="font-italic caption">No itineraries yet</span>
    </div>
    <v-row dense v-if="itineraries.length > 0">
      <template v-for="(itinerary, index) in itineraries">
        <v-col cols="12" sm="6" md="4" lg="3" :key="index">
          <generic-itinerary-details-preview-card
            :postID="itinerary.id"
            :name="itinerary.name"
            :price="itinerary.price"
            :days="itinerary.days"
            :images="itinerary.images"
            :is-active="itinerary.isActive"
            :pax="itinerary.pax"
            :rating="itinerary.rating"
            :reviews-count="itinerary.reviewsCount"
            :transaction-count="itinerary.transactionCount"
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
