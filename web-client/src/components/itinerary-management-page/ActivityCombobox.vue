<template>
  <v-combobox
    v-model="activitiesLocal"
    :search-input.sync="search"
    hide-selected
    :label="label"
    multiple
    persistent-hint
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
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attrs"
        :input-value="data.selected"
        :disabled="data.disabled"
        small
        color="primary"
        class="text-uppercase"
      >
        {{ data.item }}
      </v-chip>
    </template>
  </v-combobox>
</template>
<script>
export default {
  name: "itinerary-management-page-activity-combobox",
  props: {
    label: {
      type: String,
      required: false,
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activitiesLocal: this.activities,
      search: null,
    };
  },
  watch: {
    activities(val) {
      this.activitiesLocal = val;
    },
    activitiesLocal(val) {
      this.$emit("update:activities", val);
    },
  },
};
</script>
