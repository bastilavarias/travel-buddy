<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <feed-page-bookings-history-card></feed-page-bookings-history-card>
            </v-col>
            <v-col cols="12">
              <feed-page-discover-more-itineraries-card></feed-page-discover-more-itineraries-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import FeedPageBookingsHistoryCard from "@/components/feed-page/ItineraryBookingsHistoryCard";
import FeedPageDiscoverMoreItinerariesCard from "@/components/feed-page/DiscoverMoreItinerariesCard";
export default {
  components: {
    FeedPageDiscoverMoreItinerariesCard,
    FeedPageBookingsHistoryCard,
  },
};
</script>
