<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Itinerary</v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="itineraryTimelineTimestamps"
      hide-default-footer
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
          text: "Places of Interests",
          value: "interests",
          sortable: false,
        },
      ],
      itineraryTimelineTimestamps: [
        {
          day: "Day 1",
          destination: "Destination 1",
          transportation: "Transportation",
          lodging: "Lodging",
          interests: ["Interest 1", "Interest 2"],
        },
        {
          day: "Day 2",
          destination: "Destination 2",
          transportation: "Transportation",
          lodging: "Lodging",
          interests: ["Interest 1", "Interest 2"],
        },
        {
          day: "Day 3",
          destination: "Destination 3",
          transportation: "Transportation",
          lodging: "Lodging",
          interests: ["Interest 1", "Interest 2"],
        },
      ],
    };
  },
};
</script>
