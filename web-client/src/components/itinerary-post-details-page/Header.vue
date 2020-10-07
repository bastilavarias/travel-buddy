<template>
  <div :style="{ position: 'relative', height: '35rem' }">
    <carousel
      :items="1"
      :nav="false"
      :free-drag="false"
      autoplay
      :autoplay-timeout="5000"
    >
      <v-img
        :src="require(`@/assets/home-page/backpackers.jpg`)"
        :lazy-src="require(`@/assets/home-page/backpackers.jpg`)"
        height="35rem"
      ></v-img>
      <v-img
        :src="require(`@/assets/home-page/barkada-adventure.jpg`)"
        :lazy-src="require(`@/assets/home-page/barkada-adventure.jpg`)"
        width="100%"
        height="35rem"
      ></v-img>
      <v-img
        :src="require(`@/assets/home-page/province.jpeg`)"
        :lazy-src="require(`@/assets/home-page/province.jpeg`)"
        height="35rem"
      ></v-img>
      <template slot="prev">
        <v-btn fab small color="white" class="carousel-previous-button">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template slot="next">
        <v-btn fab small color="white" class="carousel-next-button">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
    </carousel>
  </div>
</template>

<script>
import Carousel from "vue-owl-carousel";

export default {
  name: "itinerary-post-details-page-header",
  components: { Carousel },
};
</script>

<style scoped>
.carousel-previous-button,
.carousel-next-button {
  position: absolute;
  z-index: 3;
}

.carousel-previous-button {
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
}

.carousel-next-button {
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
}
</style>
