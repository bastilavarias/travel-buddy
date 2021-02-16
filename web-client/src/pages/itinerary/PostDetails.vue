<template>
  <section>
    <v-container>
      <v-row v-if="isGetPostDetailsStart">
        <v-col cols="12">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12">
              <v-skeleton-loader type="article"></v-skeleton-loader>
            </v-col>
            <v-col cols="12">
              <v-skeleton-loader type="table"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!isGetPostDetailsStart">
        <v-col cols="12">
          <itinerary-post-details-page-header
            :images="postDetails.images"
          ></itinerary-post-details-page-header>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12">
              <itinerary-post-details-page-content-card
                :name="postDetails.name"
                :description="postDetails.description"
                :rating="postDetails.rating"
                :reviews-count="postDetails.reviewsCount"
              ></itinerary-post-details-page-content-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-table-card
                :days="postDetails.days"
              ></itinerary-post-details-page-table-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-reviews-card></itinerary-post-details-page-reviews-card>
            </v-col>
            <v-col cols="12">
              <itinerary-post-details-page-inquiries-card></itinerary-post-details-page-inquiries-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" ref="postDetails">
          <v-row>
            <v-col cols="12">
              <div :style="{ position: 'relative', height: `${height}px` }">
                <div class="sticky-container">
                  <itinerary-post-details-page-book-button-card
                    :price="postDetails.price"
                    :days="postDetails.days"
                    :postID="postDetails.id"
                    :pax="postDetails.pax"
                  >
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
import commonUtilities from "@/common/utilities";
import { GET_ITINERARY_SOFT_DETAILS } from "@/store/types/itinerary";
import commonValidation from "@/common/validation";
export default {
  components: {
    ItineraryPostDetailsPageReviewsCard,
    ItineraryPostDetailsPageTableCard,
    ItineraryPostDetailsPageInquiriesCard,
    ItineraryPostDetailsPageBookButtonCard,
    ItineraryPostDetailsPageContentCard,
    ItineraryPostDetailsPageHeader,
  },
  mixins: [commonUtilities, commonValidation],
  data() {
    return {
      height: 0,
      isGetPostDetailsStart: false,
      postDetails: {},
    };
  },
  watch: {
    postDetails(val) {
      if (this.validateObject(val) && !this.isGetPostDetailsStart) {
        this.$nextTick(() => {
          this.matchHeight();
        });
      }
    },
  },
  methods: {
    matchHeight() {
      this.height = this.$refs.postDetails.clientHeight;
    },
    async getPostDetails() {
      this.isGetPostDetailsStart = true;
      const { postID } = this.$route.params;
      if (!postID) return this.goBack();
      const gotDetails = await this.$store.dispatch(
        GET_ITINERARY_SOFT_DETAILS,
        postID
      );
      if (!this.validateObject(gotDetails)) return this.goBack();
      this.isGetPostDetailsStart = false;
      this.postDetails = Object.assign({}, gotDetails);
    },
  },
  async created() {
    this.scrollToTop();
    await this.getPostDetails();
  },
};
</script>
