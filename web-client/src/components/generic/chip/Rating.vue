<template>
  <v-chip small class="mr-1">
    <v-icon color="primary" small left>mdi-star</v-icon>
    <span class="primary--text">{{ rating }}</span>
  </v-chip>
</template>

<script>
export default {
  name: "generic-rating-chip",

  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>
