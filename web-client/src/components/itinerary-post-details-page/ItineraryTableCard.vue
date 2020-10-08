<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Itinerary</v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="sampleItems"
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:item.day="{ item }">
        <span class="font-weight-bold">{{ item.day }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-table-card",
  data() {
    return {
      tableHeaders: [
        {
          text: "Day",
          value: "day",
          align: "left",
          sortable: true,
        },
        {
          text: "Destination",
          value: "destination",
          sortable: false,
        },
        {
          text: "Transportation",
          value: "transportation",
          sortable: false,
        },
        {
          text: "Lodging",
          value: "lodging",
          sortable: false,
        },
        {
          text: "Activities",
          value: "activities",
          sortable: false,
        },
      ],
      sampleItems: [
        {
          day: "Day 1",
          destination: "Destination 1",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
        {
          day: "Day 2",
          destination: "Destination 2",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
        {
          day: "Day 3",
          destination: "Destination 3",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
      ],
    };
  },
};
</script>
