<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold">Travel Buddies</v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" v-if="isGetTourGuidesStart">
          <div class="d-flex justify-center align-content-center align-center">
            <v-progress-circular
              :width="3"
              indeterminate
              color="primary"
              :size="50"
            ></v-progress-circular>
          </div>
        </v-col>
        <template v-for="(tourGuide, index) in tourGuides">
          <v-col cols="12" md="6" lg="4" :key="index">
            <generic-tour-guide-profile-preview-card
              :id="tourGuide.id"
              :image="tourGuide.profile.image"
              :nationality="tourGuide.profile.nationality"
              :first-name="tourGuide.profile.firstName"
              :last-name="tourGuide.profile.lastName"
              :rating="tourGuide.rating"
            ></generic-tour-guide-profile-preview-card>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericTourGuideProfilePreviewCard from "@/components/generic/card/TourGuideProfilePreview";
import { FETCH_TOUR_GUIDE_ACCOUNTS } from "@/store/types/account";
export default {
  name: "feed-page-tour-guides",
  components: { GenericTourGuideProfilePreviewCard },

  data() {
    return {
      isGetTourGuidesStart: false,
      tourGuides: [],
    };
  },

  methods: {
    async getTourGuides() {
      this.isGetTourGuidesStart = true;
      this.tourGuides = await this.$store.dispatch(
        FETCH_TOUR_GUIDE_ACCOUNTS,
        this.query
      );
      this.isGetTourGuidesStart = false;
    },
  },

  async created() {
    await this.getTourGuides();
  },
};
</script>
