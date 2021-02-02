<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold"> My Transaction List </span>
        </v-card-title>
        <v-data-table
          :headers="tableHeaders"
          :items="schedule"
          :loading="isGetTourGuideScheduleStart"
          no-data-text="No schedule available."
        >
          <template v-slot:item.customNumber="{ item }">
            <span class="font-weight-bold">{{ item.customNumber }}</span>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize">{{ item.post.name }}</span>
          </template>
          <template v-slot:item.fromDate="{ item }">
            <span
              >{{ formatDate(item.fromDate) }} -
              {{ formatDate(item.toDate) }}</span
            >
          </template>
          <template v-slot:item.client="{ item }">
            <span>
              <v-avatar :size="25" color="secondary" class="mr-1">
                <v-img
                  :src="item.client.profile.image.url"
                  :lazy-src="item.client.profile.image.url"
                ></v-img>
              </v-avatar>
              <span class="text-capitalize">
                {{
                  formatName(
                    item.client.profile.firstName,
                    item.client.profile.lastName
                  )
                }}
              </span>
            </span>
          </template>
          <template v-slot:item.status="{ item }">
            <generic-booking-status-chip
              :from-date="item.fromDate"
              :to-date="item.toDate"
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
import { GET_TOUR_GUIDE_TRANSACTION_SCHEDULE } from "@/store/types/transaction";
import commonUtilities from "@/common/utilities";
export default {
  name: "tour-guide-personal-bookings",

  components: { GenericBookingStatusChip, CustomTooltipButton },

  mixins: [commonUtilities],

  data() {
    return {
      tableHeaders: [
        {
          text: "Booking #",
          value: "customNumber",
          sortable: true,
        },
        {
          text: "Itinerary Name",
          value: "name",
          sortable: false,
        },
        {
          text: "Date",
          value: "fromDate",
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
      isGetTourGuideScheduleStart: false,
      schedule: [],
    };
  },

  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
  },

  methods: {
    async getTourGuideSchedule() {
      this.isGetTourGuideScheduleStart = true;
      this.schedule = await this.$store.dispatch(
        GET_TOUR_GUIDE_TRANSACTION_SCHEDULE,
        this.credentials.id
      );
      this.isGetTourGuideScheduleStart = false;
    },
  },

  async created() {
    await this.getTourGuideSchedule();
  },
};
</script>
