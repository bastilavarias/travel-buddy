<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title class="font-weight-bold"> Tour Guide List </v-card-title>
        <v-data-table
          :headers="tableHeaders"
          :items="tourGuides"
          :loading="isGetTourGuidesStart"
        >
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    label="Search"
                    outlined
                    v-model="query"
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

          <template v-slot:item.image="{ item }">
            <v-avatar :size="25" color="secondary" class="mr-1">
              <v-img
                :src="item.profile.image.url"
                :lazy-src="item.profile.image.url"
              ></v-img>
            </v-avatar>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize">
              {{
                formatName(item.profile.firstName, item.profile.lastName) ||
                "Invalid Name"
              }}
            </span>
          </template>
          <template v-slot:item.rating="{ item }">
            <generic-rating-chip :rating="item.rating"></generic-rating-chip>
          </template>
          <template v-slot:item.isActive="{ item }">
            <generic-account-status-chip
              :is-active="item.isActive"
            ></generic-account-status-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <custom-tooltip-button
              icon="mdi-file-find"
              text="View Record"
              :to="{
                name: 'tour-guide-management-page/record',
                params: { id: item.id },
              }"
            ></custom-tooltip-button>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import GenericRatingChip from "@/components/generic/chip/Rating";
import { FETCH_TOUR_GUIDE_ACCOUNTS } from "@/store/types/account";
import commonUtilities from "@/common/utilities";
import CustomAlertDialog from "@/components/custom/AlertDialog";
import GenericAccountStatusChip from "@/components/generic/chip/AccountStatus";

export default {
  components: {
    GenericAccountStatusChip,
    CustomAlertDialog,
    GenericRatingChip,
    CustomTooltipButton,
  },

  mixins: [commonUtilities],

  data() {
    return {
      tableHeaders: [
        {
          text: "",
          value: "image",
          sortable: false,
          align: "left",
        },
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Email",
          value: "email",
          sortable: true,
        },
        {
          text: "Rating",
          value: "rating",
          sortable: false,
        },
        {
          text: "Status",
          value: "isActive",
          sortable: false,
        },
        {
          text: "Action",
          value: "action",
          align: "right",
          sortable: false,
        },
      ],
      tourGuides: [],
      query: null,
      isGetTourGuidesStart: false,
    };
  },

  watch: {
    async query(q) {
      const timer = 0;
      clearTimeout(this.timer);
      this.timer = setTimeout(
        async function () {
          await this.getTourGuides();
        }.bind(this),
        1000
      );
    },
  },

  methods: {
    async getTourGuides() {
      this.isGetTourGuidesStart = true;
      this.tourGuides = await this.$store.dispatch(
        FETCH_TOUR_GUIDE_ACCOUNTS,
        this.query
      );
      this.isGetTourGuidesStart = false;
    },
  },

  async created() {
    await this.getTourGuides();
  },
};
</script>
