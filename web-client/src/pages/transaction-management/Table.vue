<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold"> Transaction List </span>
          <div class="flex-grow-1"></div>
        </v-card-title>
        <v-data-table
          :headers="tableHeaders"
          :items="transactions"
          :loading="isFetchTransactionsStart"
          :search="search"
        >
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    label="Search"
                    outlined
                    v-model="search"
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
          <template v-slot:item.post.name="{ item }">
            <span class="text-capitalize">{{ item.post.name }}</span>
          </template>
          <template v-slot:item.bookingDate="{ item }">
            {{ formatDate(item.fromDate) }} - {{ formatDate(item.toDate) }}
          </template>
          <template v-slot:item.client.profile.lastName="{ item }">
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
          <template v-slot:item.tourGuide.profile.lastName="{ item }">
            <span>
              <v-avatar :size="25" color="secondary" class="mr-1">
                <v-img
                  :src="item.tourGuide.profile.image.url"
                  :lazy-src="item.tourGuide.profile.image.url"
                ></v-img>
              </v-avatar>
              <span class="text-capitalize">
                {{
                  formatName(
                    item.tourGuide.profile.firstName,
                    item.tourGuide.profile.lastName
                  )
                }}
              </span>
            </span>
          </template>
          <template v-slot:item.status="{ item }">
            <generic-booking-status-chip
              :is-done="item.isDone"
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
import { FETCH_TRANSACTIONS } from "@/store/types/transaction";
import commonUtilities from "@/common/utilities";
import moment from "moment";
export default {
  components: { GenericBookingStatusChip, CustomTooltipButton },
  data() {
    return {
      tableHeaders: [
        {
          text: "Transaction #",
          value: "customNumber",
          sortable: false,
        },
        {
          text: "Itinerary",
          value: "post.name",
          sortable: false,
        },
        {
          text: "Booking Date",
          value: "bookingDate",
          sortable: false,
        },
        {
          text: "Client",
          value: "client.profile.lastName",
          sortable: false,
        },
        {
          text: "Tour Guide",
          value: "tourGuide.profile.lastName",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
        },
      ],
      transactions: [],
      isFetchTransactionsStart: false,
      search: "",
    };
  },
  mixins: [commonUtilities],
  methods: {
    async fetchTransactions() {
      this.isFetchTransactionsStart = true;
      this.transactions = await this.$store.dispatch(FETCH_TRANSACTIONS);
      this.isFetchTransactionsStart = false;
    },
    formatDate(date) {
      return moment(date).format("MMM Do YY") || "";
    },
  },
  async created() {
    await this.fetchTransactions();
  },
};
</script>
