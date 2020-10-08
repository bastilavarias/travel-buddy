<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    :label="label"
    multiple
    persistent-hint
    small-chips
    single-line
    outlined
    class="text-capitalize"
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
  name: "itinerary-management-page-activity-combobox",
  data: () => ({
    items: ["Activity 1", "Activity 2", "Activity 3"],
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
