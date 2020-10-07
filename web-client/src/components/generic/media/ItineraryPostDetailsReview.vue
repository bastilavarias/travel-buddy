<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2">
          <div class="caption mb-2">
            Sebastian Curtis T. Lavarias - 6 hrs ago
          </div>
          <div class="subtitle-2 text-justify mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            obcaecati qui temporibus. Distinctio, eveniet illum non obcaecati
            quisquam repellendus ut.
          </div>
          <v-chip small class="mr-1">
            <v-icon color="primary" small left>mdi-star</v-icon>
            <span class="primary--text">5.0</span>
          </v-chip>
        </div>
        <v-avatar :size="40">
          <v-img
            src="https://bastilavarias.github.io/assets/img/sebastian-lavarias.5c3a8fdd.png"
            lazy-src="https://bastilavarias.github.io/assets/img/sebastian-lavarias.5c3a8fdd.png"
          ></v-img>
        </v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-review-media",

  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
