<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-main>
      <home-page-header></home-page-header>
      <div :style="{ marginBottom: '3rem' }"></div>
      <v-container>
        <home-page-featured-itineraries-card></home-page-featured-itineraries-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HomePageHeader from "@/components/home-page/Header";
import HomePageFeaturedItinerariesCard from "@/components/home-page/FeaturedItinerariesCard";
export default {
  components: { HomePageFeaturedItinerariesCard, HomePageHeader },
};
</script>
