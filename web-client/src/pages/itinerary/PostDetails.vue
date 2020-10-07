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
              <itinerary-post-details-page-content-card></itinerary-post-details-page-content-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-table-card></itinerary-post-details-page-table-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-inquiries-card></itinerary-post-details-page-inquiries-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="12">
              <itinerary-post-details-page-book-button-card>
              </itinerary-post-details-page-book-button-card>
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
export default {
  components: {
    ItineraryPostDetailsPageTableCard,
    ItineraryPostDetailsPageInquiriesCard,
    ItineraryPostDetailsPageBookButtonCard,
    ItineraryPostDetailsPageContentCard,
    ItineraryPostDetailsPageHeader,
  },
};
</script>
