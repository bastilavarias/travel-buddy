<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold"> My Transaction List </span>
        </v-card-title>
        <v-data-table :headers="tableHeaders">
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
    };
  },
};
</script>
