<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    :label="label"
    persistent-hint
    outlined
    class="text-capitalize"
    clearable
    small-chips
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching "<strong>{{ search }}</strong
            >". Press <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>
<script>
export default {
  name: "itinerary-management-page-transportation-combobox",
  data: () => ({
    items: ["Transport 1", "Transport 2", "Transport 3", "Transport 4"],
    model: null,
    search: null,
  }),
  props: {
    label: {
      type: String,
      required: false,
    },
  },
};
</script>
