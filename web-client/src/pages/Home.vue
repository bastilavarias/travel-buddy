<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-app-bar
      :color="isScrollingDown ? 'secondary' : 'transparent'"
      :flat="!isScrollingDown"
      fixed
      style="z-index: 5"
      dark
    >
      <v-toolbar-title class="font-weight-bold white--text">
        Travel
        <span :class="`${isScrollingDown ? 'primary--text' : ''}`">Buddy </span>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn color="primary" depressed class="text-capitalize white--text"
        >Sign In</v-btn
      >
      <v-btn
        :color="isScrollingDown ? 'white' : 'primary'"
        text
        class="text-capitalize white--text"
        >Signup</v-btn
      >
    </v-app-bar>
    <v-main>
      <home-page-header></home-page-header>
      <div :style="{ marginBottom: '3rem' }"></div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <home-page-featured-itineraries-card></home-page-featured-itineraries-card>
          </v-col>
          <v-col cols="12">
            <home-page-top-tour-guides-card></home-page-top-tour-guides-card>
          </v-col>
        </v-row>
      </v-container>
      <generic-basic-footer></generic-basic-footer>
    </v-main>
  </v-app>
</template>

<script>
import HomePageHeader from "@/components/home-page/Header";
import HomePageFeaturedItinerariesCard from "@/components/home-page/FeaturedItinerariesCard";
import HomePageTopTourGuidesCard from "@/components/home-page/TopTourGuidesCard";
import GenericBasicFooter from "@/components/generic/footer/Basic";
import CommonUtilities from "@/common/utilities";
export default {
  components: {
    GenericBasicFooter,
    HomePageTopTourGuidesCard,
    HomePageFeaturedItinerariesCard,
    HomePageHeader,
  },
  mixins: [CommonUtilities],
};
</script>
