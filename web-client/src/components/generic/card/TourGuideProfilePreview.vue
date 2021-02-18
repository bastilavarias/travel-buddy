<template>
  <v-card :class="`${className} elevation-1`" :width="width ? width : '100%'">
    <v-list-item three-line>
      <v-list-item-avatar :size="75">
        <v-img :src="image.url" :lazy-src="image.url"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="caption text-capitalize">
          {{ nationality }}
        </v-list-item-subtitle>
        <v-list-item-title
          class="primary--text font-weight-bold text-capitalize"
          >{{ firstName }} {{ lastName }}</v-list-item-title
        >
        <v-list-item-subtitle>
          <generic-rating-chip :rating="rating"></generic-rating-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        small
        depressed
        color="primary"
        class="ma-1"
        @click="openDialog"
        v-if="!private"
      >
        <span class="text-capitalize mr-1">View Record</span>
        <v-icon small>mdi-account</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog width="1000 " v-model="isDialogOpen">
      <v-card>
        <v-card-title>
          <span class="text-capitalize"> {{ firstName }}'s Record </span>
          <div class="flex-grow-1"></div>
          <generic-rating-chip :rating="rating"></generic-rating-chip>
        </v-card-title>
        <div
          class="d-flex justify-center align-center align-content-center fill-height"
          :style="{ minHeight: '200px' }"
          v-if="isGetScheduleStart && isGetRecordStart"
        >
          <v-progress-circular
            indeterminate
            :width="5"
            :size="50"
            color="primary"
          ></v-progress-circular>
        </div>
        <v-card-text v-if="!isGetRecordStart">
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
                label="Email"
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
        <v-card-text v-if="!isGetScheduleStart">
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="text-capitalize" @click="isDialogOpen = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import GenericRatingChip from "@/components/generic/chip/Rating";
import commonUtilities from "@/common/utilities";
import { GET_TOUR_GUIDE_TRANSACTION_SCHEDULE } from "@/store/types/transaction";
import { GET_ACCOUNT_TOUR_GUIDE_RECORD } from "@/store/types/account";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";

const defaultRecordForm = {
  name: null,
  email: null,
  nationality: null,
  sex: null,
  rating: null,
  imageUrl: null,
};

export default {
  name: "generic-tour-guide-profile-preview-card",

  mixins: [commonUtilities],

  components: { GenericBookingStatusChip, GenericRatingChip },

  props: {
    id: {
      type: Number,
      required: true,
    },
    className: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
    image: {
      type: Object,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    private: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      isDialogOpen: false,
      isGetRecordStart: false,
      tableHeaders: [
        {
          text: "Itinerary Name",
          value: "itineraryName",
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
      schedule: [],
      isGetScheduleStart: false,
      recordForm: Object.assign({}, defaultRecordForm),
      defaultRecordForm,
      expanded: [],
      singleExpand: true,
    };
  },

  methods: {
    async openDialog() {
      this.isDialogOpen = true;
      await this.getRecord();
      await this.getSchedule();
    },

    async getSchedule() {
      this.isGetScheduleStart = true;
      this.schedule = await this.$store.dispatch(
        GET_TOUR_GUIDE_TRANSACTION_SCHEDULE,
        this.id
      );
      this.isGetScheduleStart = false;
    },
    async getRecord() {
      const data = await this.$store.dispatch(
        GET_ACCOUNT_TOUR_GUIDE_RECORD,
        this.id
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
};
</script>
