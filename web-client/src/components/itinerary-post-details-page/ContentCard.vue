<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold text-capitalize" v-if="name">{{
      name
    }}</v-card-title>
    <v-card-text>
      <div class="mb-5" v-if="description">
        {{ description }}
      </div>
      <div class="d-flex align-center">
        <v-chip small class="mr-1">
          <v-icon color="primary" small left>mdi-star</v-icon>
          <span class="primary--text">5.0</span>
        </v-chip>
        <span>(666)</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-content-card",
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
