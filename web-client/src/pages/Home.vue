<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-app-bar
      :color="isScrollingDown ? 'secondary' : 'transparent'"
      :flat="!isScrollingDown"
      fixed
      style="z-index: 5"
      dark
    >
      <v-toolbar-title>
        <custom-router-link :to="{ name: 'home-page' }">
          <span class="font-weight-bold white--text">
            Travel
            <span :class="`${isScrollingDown ? 'primary--text' : ''}`"
              >Buddy
            </span>
          </span>
        </custom-router-link>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn
        color="primary"
        depressed
        class="text-capitalize white--text"
        :to="{ name: 'sign-in-page' }"
        >Sign In</v-btn
      >
      <v-btn
        :color="isScrollingDown ? 'white' : 'primary'"
        text
        class="text-capitalize white--text"
        :to="{ name: 'signup-page' }"
        >Signup</v-btn
      >
    </v-app-bar>
    <v-main>
      <home-page-header :tab.sync="tab"></home-page-header>
      <div :style="{ marginBottom: '3rem' }"></div>
      <v-container>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card outlined>
              <v-card-title
                class="d-flex justify-center align-content-center align-center"
              >
                <span class="font-weight-bold"> Discover our Itineraries </span>
                <v-spacer></v-spacer>
                <v-text-field
                  dense
                  filled
                  rounded
                  single-line
                  hide-details
                  label="Search"
                  append-icon="mdi-magnify"
                  v-model="search"
                ></v-text-field>
              </v-card-title>
              <v-card-subtitle v-if="search">
                Search results for: {{ search }}
              </v-card-subtitle>
              <div class="text-center" v-if="itinerariesLocal.length === 0">
                <span class="font-italic caption">No data.</span>
              </div>
              <v-card-text>
                <v-row dense v-if="itineraries.length > 0">
                  <template v-for="(itinerary, index) in itinerariesLocal">
                    <v-col cols="12" sm="6" md="4" lg="3" :key="index">
                      <generic-itinerary-details-preview-card
                        :postID="itinerary.id"
                        :name="itinerary.name"
                        :price="itinerary.price"
                        :days="itinerary.days"
                        :images="itinerary.images"
                        :is-active="itinerary.isActive"
                        :pax="itinerary.pax"
                        :rating="itinerary.rating"
                        :reviews-count="itinerary.reviewsCount"
                        :transaction-count="itinerary.transactionCount"
                      ></generic-itinerary-details-preview-card>
                    </v-col>
                  </template>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>x</v-tab-item>
        </v-tabs-items>
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
import commonUtilities from "@/common/utilities";
import CustomRouterLink from "@/components/custom/RouterLink";
import { FETCH_ITINERARIES } from "@/store/types/itinerary";
import GenericItineraryDetailsPreviewCard from "@/components/generic/card/ItineraryDetailsPreview";
export default {
  components: {
    GenericItineraryDetailsPreviewCard,
    CustomRouterLink,
    GenericBasicFooter,
    HomePageTopTourGuidesCard,
    HomePageFeaturedItinerariesCard,
    HomePageHeader,
  },

  mixins: [commonUtilities],

  data() {
    return {
      tab: null,
      itineraries: [],
      isFetchItinerariesStart: false,
      search: null,
    };
  },

  computed: {
    itinerariesLocal() {
      const itineraries = this.itineraries;
      if (!this.search) return itineraries;
      return itineraries.filter((itinerary) => {
        const keyword = this.search.toLowerCase().trim();
        if (itinerary.name.toLowerCase().trim().includes(keyword))
          return itinerary;
      });
    },
  },

  methods: {
    async fetchItineraries() {
      this.isFetchItinerariesStart = true;
      this.itineraries = await this.$store.dispatch(FETCH_ITINERARIES);
      this.isFetchItinerariesStart = false;
    },
  },

  async created() {
    await this.fetchItineraries();
  },
};
</script>
