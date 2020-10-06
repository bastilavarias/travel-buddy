<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <feed-page-bookings-history-card></feed-page-bookings-history-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import FeedPageBookingsHistoryCard from "@/components/feed-page/ItineraryBookingsHistoryCard";
export default {
  components: { FeedPageBookingsHistoryCard },
};
</script>
