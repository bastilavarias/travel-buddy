<template>
  <v-card outlined color="transparent">
    <v-card-title class="font-weight-bold">Top Tour Guides</v-card-title>
    <v-card-text>
      <v-slide-group v-model="profilePreview" show-arrows center-active>
        <template v-for="n in 12">
          <v-slide-item :key="n" v-slot:default="{ active, toggle }">
            <span @click="toggle">
              <generic-tour-guide-profile-preview-card
                width="275.5"
                class-name="ma-2"
              >
              </generic-tour-guide-profile-preview-card>
            </span>
          </v-slide-item>
        </template>
        <template v-slot:prev>
          <v-btn fab small color="secondary">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template v-slot:next>
          <v-btn fab small color="secondary">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script>
import GenericTourGuideProfilePreviewCard from "@/components/generic/card/TourGuideProfilePreview";
export default {
  name: "home-page-top-tour-guides-card",
  components: { GenericTourGuideProfilePreviewCard },
  data() {
    return {
      profilePreview: null,
      multiple: false,
      showArrows: true,
    };
  },
};
</script>
