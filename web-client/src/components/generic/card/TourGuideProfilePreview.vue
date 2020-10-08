<template>
  <v-card outlined :class="`${className}`" :width="width ? width : '100%'">
    <v-list-item two-line>
      <v-list-item-avatar :size="75">
        <v-img
          src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
          lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="caption">
          <v-icon class="mr-1" small>mdi-map-marker-outline</v-icon>
          <span>España, Manila</span>
        </v-list-item-subtitle>
        <v-list-item-title class="primary--text font-weight-bold"
          >Cardo D.</v-list-item-title
        >
        <v-list-item-subtitle>
          <v-chip small class="mr-1">
            <v-icon color="primary" small left>mdi-star</v-icon>
            <span class="primary--text">5.0</span>
          </v-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <div class="mb-5">
        <template v-for="n in 5">
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
      rating: 5,
    };
  },
};
</script>
