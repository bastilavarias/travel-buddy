<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <itinerary-post-details-page-header></itinerary-post-details-page-header>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12">
              <v-btn @click="goBack" fab color="white" small>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-content-card></itinerary-post-details-page-content-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-tour-guide-information-card></itinerary-post-details-page-tour-guide-information-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-table-card></itinerary-post-details-page-table-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-inquiries-card></itinerary-post-details-page-inquiries-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-reviews-card></itinerary-post-details-page-reviews-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" ref="postDetails">
          <v-row>
            <v-col cols="12">
              <div :style="{ position: 'relative', height: `${height}px` }">
                <div class="sticky-container">
                  <itinerary-post-details-page-book-button-card>
                  </itinerary-post-details-page-book-button-card>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import ItineraryPostDetailsPageHeader from "@/components/itinerary-post-details-page/Header";
import ItineraryPostDetailsPageContentCard from "@/components/itinerary-post-details-page/ContentCard";
import ItineraryPostDetailsPageBookButtonCard from "@/components/itinerary-post-details-page/BookButtonCard";
import ItineraryPostDetailsPageInquiriesCard from "@/components/itinerary-post-details-page/InquiriesCard";
import ItineraryPostDetailsPageTableCard from "@/components/itinerary-post-details-page/ItineraryTableCard";
import ItineraryPostDetailsPageReviewsCard from "@/components/itinerary-post-details-page/ReviewsCard";
import ItineraryPostDetailsPageTourGuideInformationCard from "@/components/itinerary-post-details-page/TourGuideInformationCard";
import CommonUtilities from "@/common/utilities";
export default {
  components: {
    ItineraryPostDetailsPageTourGuideInformationCard,
    ItineraryPostDetailsPageReviewsCard,
    ItineraryPostDetailsPageTableCard,
    ItineraryPostDetailsPageInquiriesCard,
    ItineraryPostDetailsPageBookButtonCard,
    ItineraryPostDetailsPageContentCard,
    ItineraryPostDetailsPageHeader,
  },
  mixins: [CommonUtilities],
  data() {
    return {
      height: 0,
    };
  },
  methods: {
    matchHeight() {
      this.height = this.$refs.postDetails.clientHeight;
    },
  },
  mounted() {
    this.matchHeight();
  },
};
</script>
