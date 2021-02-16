<template>
  <div>
    <h1 class="title font-weight-bold mb-5">Tour Guides</h1>
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
      <template v-for="n in 9">
        <v-col cols="12" md="6" lg="4" :key="n">
          <generic-tour-guide-profile-preview-card></generic-tour-guide-profile-preview-card>
        </v-col>
      </template>
    </v-row>
  </div>
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
      console.log(this.tourGuides);
      this.isGetTourGuidesStart = false;
    },
  },

  async created() {
    await this.getTourGuides();
  },
};
</script>
