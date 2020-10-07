<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="pl-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2">
          <div class="px-4 py-3">
            <div class="caption mb-2">
              Sebastian Curtis T. Lavarias - 6 hrs ago
            </div>
            <div class="subtitle-2 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              obcaecati qui temporibus. Distinctio, eveniet illum non obcaecati
              quisquam repellendus ut.
            </div>
          </div>
        </div>
        <v-avatar :size="40">
          <v-img
            src="https://bastilavarias.github.io/assets/img/sebastian-lavarias.5c3a8fdd.png"
          ></v-img>
        </v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
export default {
  name: "itinerary-post-details-inquiry-reply-media",

  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
