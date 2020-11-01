<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <feed-page-header
                :tabState.sync="headerTabState"
              ></feed-page-header>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-tabs-items v-model="headerTabState" class="transparent">
            <v-tab-item>
              <div
                style="height: 45rem"
                class="text-center"
                v-if="isFetchItinerariesStart"
              >
                <v-progress-circular
                  indeterminate
                  :size="50"
                  :width="6"
                  color="secondary"
                ></v-progress-circular>
              </div>
              <feed-page-itineraries
                :itineraries="itineraries"
              ></feed-page-itineraries>
            </v-tab-item>
            <v-tab-item>
              <feed-page-tour-guides></feed-page-tour-guides>
            </v-tab-item>
            <v-tab-item>
              <feed-page-bookings></feed-page-bookings>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import FeedPageHeader from "@/components/feed-page/Header";
import FeedPageItineraries from "@/components/feed-page/Itineraries";
import FeedPageTourGuides from "@/components/feed-page/TourGuides";
import FeedPageBookings from "@/components/feed-page/ItineraryBookingsHistoryCard";
import { FETCH_ITINERARIES } from "@/store/types/itinerary";
export default {
  components: {
    FeedPageBookings,
    FeedPageTourGuides,
    FeedPageItineraries,
    FeedPageHeader,
  },
  data() {
    return {
      headerTabState: null,
      isFetchItinerariesStart: false,
    };
  },
  computed: {
    itineraries() {
      return this.$store.state.itinerary.list;
    },
  },
  methods: {
    async fetchItineraries() {
      if (this.itineraries.length <= 0) {
        this.isFetchItinerariesStart = true;
        await this.$store.dispatch(FETCH_ITINERARIES);
        this.isFetchItinerariesStart = false;
      }
    },
  },
  async created() {
    await this.fetchItineraries();
  },
};
</script>
