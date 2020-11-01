<template>
  <div>
    <h1 class="title font-weight-bold mb-5">Tour Guides</h1>
    <v-row dense>
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
export default {
  name: "feed-page-tour-guides",
  components: { GenericTourGuideProfilePreviewCard },
};
</script>
