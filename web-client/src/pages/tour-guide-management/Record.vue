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
            <v-col cols="12" v-if="recordForm.imageUrl">
              <div class="text-center">
                <v-avatar :size="120" color="secondary" class="mr-1">
                  <v-img
                    :src="recordForm.imageUrl"
                    :lazy-src="recordForm.imageUrl"
                  ></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="12"></v-col>
            <v-col cols="12" md="8">
              <v-text-field
                label="Name"
                outlined
                readonly
                v-model="recordForm.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Email  "
                outlined
                readonly
                v-model="recordForm.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nationality"
                outlined
                readonly
                v-model="recordForm.nationality"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Sex"
                outlined
                readonly
                v-model="recordForm.sex"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Overall Rating"
                outlined
                readonly
                v-model="recordForm.rating"
              >
              </v-text-field>
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
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="id"
                show-expand
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
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    Review:
                    <span v-if="item.tourGuideReview" class="text-capitalize">
                      {{ item.tourGuideReview.text }}
                    </span>
                    <span v-if="!item.tourGuideReview" class="font-italic">
                      No review yet.
                    </span>
                  </td>
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
import { GET_ACCOUNT_TOUR_GUIDE_RECORD } from "@/store/types/account";

const defaultRecordForm = {
  name: null,
  email: null,
  nationality: null,
  sex: null,
  rating: null,
  imageUrl: null,
};

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
        { text: "", value: "data-table-expand" },
      ],
      isGetScheduleStart: false,
      schedule: [],
      recordForm: Object.assign({}, defaultRecordForm),
      defaultRecordForm,
      expanded: [],
      singleExpand: true,
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
      this.isGetScheduleStart = false;
    },

    async getRecord() {
      const { id } = this.$route.params;
      const data = await this.$store.dispatch(
        GET_ACCOUNT_TOUR_GUIDE_RECORD,
        id
      );
      this.recordForm = Object.assign(this.recordForm, {
        name: this.formatName(data.profile.firstName, data.profile.lastName),
        email: data.email,
        nationality: data.profile.nationality,
        sex: data.profile.sex,
        rating: data.rating,
        imageUrl: data.profile.image.url,
      });
    },
  },

  async created() {
    await this.getRecord();
    await this.getSchedule();
  },
};
</script>
