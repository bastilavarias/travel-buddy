<template>
  <v-card
    outlined
    :class="`${className} custom-shadow`"
    :width="width ? width : '100%'"
  >
    <v-list-item two-line>
      <v-list-item-avatar :size="75">
        <v-img
          src="https://bastilavarias.github.io/assets/img/sebastian-lavarias.5c3a8fdd.png"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="caption">
          <v-icon class="mr-1" small>mdi-map-marker-outline</v-icon>
          <span>Tondo, Manila</span>
        </v-list-item-subtitle>
        <v-list-item-title class="primary--text font-weight-bold"
          >Sebastian L.</v-list-item-title
        >
        <v-list-item-subtitle>
          <span class="d-flex align-start">
            <span class="primary--text caption mr-1"> ({{ rating }}) </span>
            <v-rating
              v-model="rating"
              color="primary"
              background-color="grey"
              dense
              hover
              size="15"
              readonly
              class="mr-1"
            ></v-rating>
            <span class="grey--text caption mr-2"> (63) </span>
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <div class="mb-5">
        <template v-for="n in 6">
          <v-chip label small class="ma-1 text-uppercase">{{
            `Skill #${n}`
          }}</v-chip>
        </template>
      </div>
      <v-btn small depressed color="primary" class="ma-1">
        <span class="text-capitalize mr-1">View Profile</span>
        <v-icon small>mdi-account</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "generic-tour-guide-profile-preview-card",
  props: {
    className: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      rating: 4,
    };
  },
};
</script>
