<template>
  <v-card outlined>
    <v-card-title class="font-weight-bold">Itinerary Name</v-card-title>
    <v-card-text>
      <div class="d-flex align-center">
        <v-chip small class="mr-1">
          <v-icon color="primary" small left>mdi-star</v-icon>
          <span class="primary--text">5.0</span>
        </v-chip>
        <span>(666)</span>
      </div>
      <span class="d-block my-4 subtitle-1">
        <v-icon color="primary" class="mr-1">mdi-map-marker-outline</v-icon
        >Location Name
      </span>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
        aliquid dicta dignissimos, error eveniet excepturi fugit iste libero
        mollitia pariatur quas reiciendis tempore ut voluptas! Architecto
        consectetur cum quis reprehenderit suscipit! Architecto culpa molestiae
        nihil nobis odio! Adipisci assumenda delectus doloribus esse inventore
        nam officiis quibusdam quos rem vero.
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-content-card",
};
</script>
