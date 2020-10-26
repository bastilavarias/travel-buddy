<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold"> My Booking List </span>
          <div class="flex-grow-1"></div>
          <v-chip>
            <v-icon left>mdi-tune</v-icon>
            <span>Filters</span>
          </v-chip>
        </v-card-title>
        <v-data-table :headers="tableHeaders" :items="sampleItems">
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    label="Search"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn color="secondary" block x-large>
                    <span class="text-capitalize mr-1">Search</span>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </template>
          <template v-slot:item.customNumber="{ item }">
            <span class="font-weight-bold">{{ item.customNumber }}</span>
          </template>
          <template v-slot:item.date.from="{ item }">
            <span>{{ item.date.from }} - {{ item.date.to }}</span>
          </template>
          <template v-slot:item.client="{ item }">
            <span>
              <v-avatar :size="25" color="secondary" class="mr-1">
                <v-img
                  :src="item.client.image"
                  :lazy-src="item.client.image"
                ></v-img>
              </v-avatar>
              <span class="text-capitalize">
                {{ item.client.name }}
              </span>
            </span>
          </template>
          <template v-slot:item.tourGuide="{ item }">
            <span v-if="item.tourGuide">
              <v-avatar :size="25" color="secondary" class="mr-1">
                <v-img
                  :src="item.client.image"
                  :lazy-src="item.client.image"
                ></v-img>
              </v-avatar>
              <span class="text-capitalize">
                {{ item.client.name }}
              </span>
            </span>
            <span v-else class="font-italic">No assigned yet.</span>
          </template>
          <template v-slot:item.status="{ item }">
            <generic-booking-status-chip
              :is-done="item.isDone"
            ></generic-booking-status-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";
export default {
  name: "tour-guide-personal-bookings",
  components: { GenericBookingStatusChip, CustomTooltipButton },
  data() {
    return {
      tableHeaders: [
        {
          text: "Booking #",
          value: "customNumber",
          sortable: false,
        },
        {
          text: "Itinerary Name",
          value: "itineraryName",
          sortable: false,
        },
        {
          text: "Date",
          value: "date.from",
          sortable: true,
        },
        {
          text: "Client",
          value: "client",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
        },
      ],
      sampleItems: [
        {
          createdAt: "12:35 PM - September 05, 2020",
          customNumber: "BOOKING-1800-1-114-2126",
          itineraryName: "Itinerary Name",
          date: {
            from: "March 25, 2020",
            to: "March 28, 2020",
          },
          client: {
            image:
              "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
            name: "Cardo D.",
          },
          isDone: false,
        },
        {
          createdAt: "12:35 PM - September 05, 2020",
          customNumber: "BOOKING-1800-1-114-2126",
          itineraryName: "Itinerary Name",
          date: {
            from: "March 25, 2020",
            to: "March 28, 2020",
          },
          client: {
            image:
              "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
            name: "Cardo D.",
          },
          isDone: true,
        },
      ],
    };
  },
};
</script>
