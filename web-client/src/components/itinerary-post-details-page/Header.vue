<template>
  <div :style="{ position: 'relative', height: '35rem' }">
    <carousel
      :items="1"
      :nav="false"
      :free-drag="false"
      autoplay
      :autoplay-timeout="5000"
    >
      <template v-for="(image, index) in images">
        <v-img
          :key="index"
          :src="image.url"
          :lazy-src="image.url"
          height="35rem"
        ></v-img>
      </template>
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
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
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
