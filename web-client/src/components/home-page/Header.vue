<template>
  <div class="home-page-header">
    <carousel
      :items="1"
      :dots="false"
      :nav="false"
      :mouse-drag="false"
      :touch-drag="false"
      :pull-drag="false"
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
        height="35rem"
      ></v-img>
      <v-img
        :src="require(`@/assets/home-page/province.jpeg`)"
        :lazy-src="require(`@/assets/home-page/province.jpeg`)"
        height="35rem"
      ></v-img>
    </carousel>
    <div class="dark-overlay"></div>
    <div class="header-content">
      <v-container class="fill-height">
        <v-row align-content="center" justify="center">
          <v-col cols="12" md="10" lg="8">
            <div class="white--text text-center">
              <h1 class="display-2 font-weight-bold mb-1">Yours To Explore</h1>
              <h2 class="title">
                Discover and book amazing things-to-do at exclusive prices
              </h2>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="search-toolbar-card-holder">
      <v-container>
        <v-card>
          <v-tabs v-model="tabState">
            <template v-for="(tab, index) in tabSelections">
              <v-tab :key="index">
                <v-icon left>{{ tab.icon }}</v-icon>
                <span class="text-capitalize">{{ tab.text }}</span>
              </v-tab>
            </template>
          </v-tabs>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import Carousel from "vue-owl-carousel";
import "@/style/global.css";

export default {
  name: "home-page-header",

  components: { Carousel },

  props: {
    tab: {
      required: false,
    },
  },

  watch: {
    tab(val) {
      this.tabState = val;
    },

    tabState(val) {
      this.$emit("update:tab", val);
    },
  },

  data() {
    return {
      tabState: this.tab,
      tabSelections: [
        {
          icon: "mdi-beach",
          text: "Itineraries",
        },
        {
          icon: "mdi-account-cowboy-hat",
          text: "Tour Guides",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home-page-header {
  background-color: black;
  position: relative;
  height: 35rem;
  width: 100%;
}
.header-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.search-toolbar-card-holder {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: -5%;
  z-index: 3;
}
</style>
