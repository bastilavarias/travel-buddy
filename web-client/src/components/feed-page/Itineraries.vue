<template>
  <v-card flat color="transparent">
    <v-card-title
      class="d-flex justify-center align-content-center align-center"
    >
      <span class="font-weight-bold"> Discover our Itineraries </span>
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

    <div class="text-center" v-if="itinerariesLocal.length === 0">
      <span class="font-italic caption">No data.</span>
    </div>
    <v-card-text>
      <v-row dense v-if="itineraries.length > 0">
        <template v-for="(itinerary, index) in itinerariesLocal">
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
    </v-card-text>
  </v-card>
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

  data() {
    return {
      search: null,
    };
  },

  computed: {
    itinerariesLocal() {
      const itineraries = this.itineraries;
      if (!this.search) return itineraries;
      return itineraries.filter((itinerary) => {
        const keyword = this.search.toLowerCase().trim();
        if (itinerary.name.toLowerCase().trim().includes(keyword))
          return itinerary;
      });
    },
  },
};
</script>
