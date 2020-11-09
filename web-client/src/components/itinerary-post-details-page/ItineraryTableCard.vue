<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Itinerary</v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="days"
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:item.day="{ item }">
        <span class="font-weight-bold">{{ item.day }}</span>
      </template>
      <template v-slot:item.transportation="{ item }">
        <span class="text-capitalize">{{ item.transportation }}</span>
      </template>
      <template v-slot:item.lodging="{ item }">
        <span class="text-capitalize">{{ item.lodging }}</span>
      </template>
      <template v-slot:item.activities="{ item }">
        <div class="pa-1">
          <v-chip
            v-for="(activity, index) in item.activities"
            :key="index"
            class="ma-1 text-uppercase"
            small
            color="primary"
          >
            {{ activity.name }}
          </v-chip>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "itinerary-post-details-page-table-card",
  props: {
    days: {
      type: Array,
      required: true,
    },
  },
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
    };
  },
};
</script>
