<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Tour Guide</v-card-title>
    <v-list-item two-line>
      <v-list-item-avatar :size="75">
        <v-img
          src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
          lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="primary--text font-weight-bold"
          >Sebastian L.</v-list-item-title
        >
        <v-list-item-subtitle>
          <v-chip small class="mr-1">
            <v-icon color="primary" small left>mdi-star</v-icon>
            <span class="primary--text">5.0</span>
          </v-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
      consequuntur dolores eligendi ipsa maiores necessitatibus officiis quia
      sed sint sunt.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-tour-guide-information-card",
};
</script>
