<template>
  <v-card outlined :class="`${className}`" :width="width ? width : '100%'">
    <v-list-item three-line>
      <v-list-item-avatar :size="75">
        <v-img :src="image.url" :lazy-src="image.url"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="caption text-capitalize">
          {{ nationality }}
        </v-list-item-subtitle>
        <v-list-item-title
          class="primary--text font-weight-bold text-capitalize"
          >{{ firstName }} {{ lastName }}.</v-list-item-title
        >
        <v-list-item-subtitle>
          <generic-rating-chip :rating="rating"></generic-rating-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn small depressed color="primary" class="ma-1">
        <span class="text-capitalize mr-1">View Record</span>
        <v-icon small>mdi-account</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GenericRatingChip from "@/components/generic/chip/Rating";
export default {
  name: "generic-tour-guide-profile-preview-card",
  components: { GenericRatingChip },
  props: {
    className: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
    image: {
      type: Object,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>
