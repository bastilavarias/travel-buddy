<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
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
    </v-main>
    <generic-basic-footer></generic-basic-footer>
  </v-app>
</template>

<script>
import HomePageHeader from "@/components/home-page/Header";
import HomePageFeaturedItinerariesCard from "@/components/home-page/FeaturedItinerariesCard";
import HomePageTopTourGuidesCard from "@/components/home-page/TopTourGuidesCard";
import GenericBasicFooter from "@/components/generic/footer/Basic";
export default {
  components: {
    GenericBasicFooter,
    HomePageTopTourGuidesCard,
    HomePageFeaturedItinerariesCard,
    HomePageHeader,
  },
};
</script>
