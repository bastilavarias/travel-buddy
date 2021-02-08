<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span>
            <custom-tooltip-button
              icon="mdi-chevron-left"
              text="Back to Itinerary List"
              :action="goBack"
            ></custom-tooltip-button>
            Tour Guide Record
          </span>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <div class="text-center">
                <v-avatar :size="120" color="secondary" class="mr-1">
                  <v-img
                    src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
                    lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
                  ></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Name"
                content="Cardo Dalisay"
                content-class-name="text-capitalize"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Email"
                content="cardodalisay@gmail.com"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Location"
                content="Manila, Philippines"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <custom-label-and-content
                label="Contact"
                content="Manila, Philippines"
              ></custom-label-and-content>
            </v-col>
            <v-col cols="12">
              <div class="subtitle-1 mb-2">Rating</div>
              <!--              <generic-rating-chip></generic-rating-chip>-->
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <span class="subtitle-1">Bookings History</span>
              <v-data-table
                :headers="tableHeaders"
                :items="schedule"
                :loading="isGetScheduleStart"
              >
                <template v-slot:item.itineraryName="{ item }">
                  <span class="text-capitalize">{{ item.post.name }}</span>
                </template>
                <template v-slot:item.clientName="{ item }">
                  <span class="text-capitalize">{{
                    item.client.profile.firstName
                  }}</span>
                </template>
                <template v-slot:item.fromDate="{ item }">
                  <span
                    >{{ formatDate(item.fromDate) }} -
                    {{ formatDate(item.toDate) }}</span
                  >
                </template>
                <template v-slot:item.rating="{ item }">
                  <generic-rating-chip
                    :rating="item.tourGuideReview.rating"
                    v-if="item.tourGuideReview"
                  ></generic-rating-chip>
                  <span v-if="!item.tourGuideReview" class="font-italic">
                    No review yet.
                  </span>
                </template>
                <template v-slot:item.status="{ item }">
                  <generic-booking-status-chip
                    :from-date="item.fromDate"
                    :to-date="item.toDate"
                  ></generic-booking-status-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="secondary" class="text-capitalize">Edit Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>
<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import commonUtilities from "@/common/utilities";
import CustomLabelAndContent from "@/components/custom/LabelAndContent";
import GenericRatingChip from "@/components/generic/chip/Rating";
import { GET_TOUR_GUIDE_TRANSACTION_SCHEDULE } from "@/store/types/transaction";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";
export default {
  components: {
    GenericBookingStatusChip,
    GenericRatingChip,
    CustomLabelAndContent,
    CustomTooltipButton,
  },

  mixins: [commonUtilities],

  data() {
    return {
      tableHeaders: [
        {
          text: "Itinerary Name",
          value: "itineraryName",
          sortable: false,
        },
        {
          text: "Client Name",
          value: "clientName",
          sortable: false,
        },
        {
          text: "Date",
          value: "fromDate",
          sortable: true,
        },
        {
          text: "Rating",
          value: "rating",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
        },
      ],
      isGetScheduleStart: false,
      schedule: [],
    };
  },

  methods: {
    async getSchedule() {
      this.isGetScheduleStart = true;
      const { id } = this.$route.params;
      this.schedule = await this.$store.dispatch(
        GET_TOUR_GUIDE_TRANSACTION_SCHEDULE,
        id
      );
      console.log(this.schedule);
      this.isGetScheduleStart = false;
    },
  },

  async created() {
    await this.getSchedule();
  },
};
</script>
