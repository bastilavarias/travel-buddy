<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Reviews</v-card-title>
    <v-card-text
      class="text-center py-15"
      v-if="!isGetReviewsStart && reviews.length === 0"
    >
      No reviews yet.
    </v-card-text>
    <v-card-text>
      <template v-for="(review, index) in reviews">
        <itinerary-post-details-review-media
          :key="index"
          class-name="mb-5"
          :author="review.author"
          :createdAt="review.createdAt"
          :rating="review.rating"
          :text="review.text"
        ></itinerary-post-details-review-media>
        <v-divider v-if="index !== reviews.length - 1"></v-divider>
      </template>
    </v-card-text>
    <div class="text-center py-15" v-if="isGetReviewsStart">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        color="secondary"
        class="text-capitalize"
        @click="getReviews"
        :disabled="isGetReviewsStart"
        v-if="showMoreButton"
        >See All</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import ItineraryPostDetailsReviewMedia from "@/components/generic/media/ItineraryPostDetailsReview";
import {
  GET_ITINERARY_INQUIRIES,
  GET_ITINERARY_REVIEWS,
} from "@/store/types/itinerary";
export default {
  name: "itinerary-post-details-page-reviews-card",

  components: { ItineraryPostDetailsReviewMedia },

  data() {
    return {
      skip: 0,
      reviews: [],
      showMoreButton: true,
      isGetReviewsStart: false,
    };
  },

  computed: {
    postID() {
      return this.$route.params.postID;
    },
  },

  methods: {
    async getReviews() {
      this.isGetReviewsStart = true;
      const payload = {
        postID: parseInt(this.postID),
        skip: this.skip,
      };
      const reviews = await this.$store.dispatch(
        GET_ITINERARY_REVIEWS,
        payload
      );
      if (reviews.length === 5) {
        this.reviews = [...this.reviews, ...reviews];
        this.skip += 5;
        this.isGetReviewsStart = false;
        return;
      }
      this.reviews = [...this.reviews, ...reviews];
      this.showMoreButton = false;
      this.isGetReviewsStart = false;
    },
  },

  async created() {
    await this.getReviews();
  },
};
</script>
