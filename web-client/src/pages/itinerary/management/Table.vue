<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold">Itinerary List</span>
          <div class="flex-grow-1"></div>
          <custom-tooltip-button
            icon="mdi-plus"
            text="Create new Itinerary"
            :to="{ name: 'itinerary-management-page/form' }"
          ></custom-tooltip-button>
          <custom-tooltip-button
            icon="mdi-refresh"
            text="Refresh Itineraries"
            :action="fetchItineraries"
          ></custom-tooltip-button>
        </v-card-title>
        <v-data-table
          :headers="tableHeaders"
          :items="itineraries"
          :loading="isFetchItinerariesStart"
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
          <template v-slot:item.name="{ item }">
            <span class="font-weight-bold text-capitalize">{{
              item.name
            }}</span>
          </template>
          <template v-slot:item.details="{ item }">
            {{ formatItineraryDetails(item.days) }}
          </template>
          <template v-slot:item.price="{ item }">
            <span>{{ formatMoney(item.price) }}</span>
          </template>
          <template v-slot:item.tourGuide="{ item }">
            <span>
              <v-avatar :size="25" color="secondary" class="mr-1">
                <v-img
                  :src="item.tourGuide.image"
                  :lazy-src="item.tourGuide.image"
                ></v-img>
              </v-avatar>
              <span class="text-capitalize">
                {{ item.tourGuide.name }}
              </span>
            </span>
          </template>
          <template v-slot:item.actions="{ item }">
            <custom-tooltip-button
              icon="mdi-file-find"
              text="View Itinerary"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-pencil-outline"
              text="Edit Itinerary"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-stop"
              text="Disable Itinerary"
              :action="() => openDisableItineraryAlertDialog(item)"
              v-if="item.isActive"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-play"
              text="Enable Itinerary"
              :action="() => openEnableItineraryAlertDialog(item)"
              v-if="!item.isActive"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-delete-outline"
              text="Delete Itinerary"
              :action="() => openDeleteItineraryAlertDialog(item)"
            ></custom-tooltip-button>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <custom-alert-dialog
      :is-open.sync="isDeleteItineraryAlertDialogOpen"
      type="error"
      title="Delete Itinerary"
      text="Are you sure you want to delete this itinerary?"
      :loading="isDeleteItineraryStart"
      :action="() => deleteItinerary()"
    ></custom-alert-dialog>
    <custom-alert-dialog
      :is-open.sync="isDisableItineraryAlertDialogOpen"
      type="error"
      title="Disable Itinerary"
      text="Are you sure you want to disable this itinerary?"
      :loading="isDisableItineraryStart"
      :action="() => disableItinerary()"
    ></custom-alert-dialog>
    <custom-alert-dialog
      :is-open.sync="isEnableItineraryAlertDialogOpen"
      type="success"
      title="Enable Itinerary"
      text="Are you sure you want to enable this itinerary?"
      :loading="isEnableItineraryStart"
      :action="() => enableItinerary()"
    ></custom-alert-dialog>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import {
  DELETE_ITINERARY,
  DISABLE_ITINERARY,
  ENABLE_ITINERARY,
  FETCH_ITINERARIES,
  SET_ITINERARIES,
} from "@/store/types/itinerary";
import commonUtilities from "@/common/utilities";
import CustomAlertDialog from "@/components/custom/AlertDialog";
import { ENABLE_ACCOUNT } from "@/store/types/account";
export default {
  components: { CustomAlertDialog, CustomTooltipButton },
  data() {
    return {
      tableHeaders: [
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Details",
          value: "details",
          sortable: false,
        },
        {
          text: "Price",
          value: "price",
          sortable: true,
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      isFetchItinerariesStart: false,
      search: "",
      selectedItinerary: {},
      isDeleteItineraryAlertDialogOpen: false,
      isDeleteItineraryStart: false,
      isDisableItineraryAlertDialogOpen: false,
      isDisableItineraryStart: false,
      isEnableItineraryAlertDialogOpen: false,
      isEnableItineraryStart: false,
    };
  },
  mixins: [commonUtilities],
  computed: {
    itineraries() {
      return this.$store.state.itinerary.list;
    },
  },
  methods: {
    async fetchItineraries() {
      this.isFetchItinerariesStart = true;
      await this.$store.dispatch(FETCH_ITINERARIES);
      this.isFetchItinerariesStart = false;
    },
    openDeleteItineraryAlertDialog(itinerary) {
      this.selectedItinerary = itinerary;
      this.isDeleteItineraryAlertDialogOpen = true;
    },
    openDisableItineraryAlertDialog(itinerary) {
      this.selectedItinerary = itinerary;
      this.isDisableItineraryAlertDialogOpen = true;
    },
    openEnableItineraryAlertDialog(itinerary) {
      this.selectedItinerary = itinerary;
      this.isEnableItineraryAlertDialogOpen = true;
    },
    async deleteItinerary() {
      this.isDeleteItineraryStart = true;
      const isDeleted = await this.$store.dispatch(
        DELETE_ITINERARY,
        this.selectedItinerary.id
      );
      this.isDeleteItineraryStart = false;
      if (isDeleted) {
        const newItineraries = this.itineraries.filter(
          (itinerary) => itinerary.id !== this.selectedItinerary.id
        );
        this.$store.commit(SET_ITINERARIES, newItineraries);
        this.selectedItinerary = {};
        this.isDeleteItineraryAlertDialogOpen = false;
      }
    },
    async disableItinerary() {
      this.isDisableItineraryStart = true;
      const isDisabled = await this.$store.dispatch(
        DISABLE_ITINERARY,
        this.selectedItinerary.id
      );
      this.isDisableItineraryStart = false;
      if (isDisabled) {
        const newItineraries = this.itineraries.map((itinerary) => {
          if (itinerary.id === this.selectedItinerary.id)
            itinerary.isActive = false;
          return itinerary;
        });
        this.$store.commit(SET_ITINERARIES, newItineraries);
        this.selectedItinerary = {};
        this.isDisableItineraryAlertDialogOpen = false;
      }
    },
    async enableItinerary() {
      this.isEnableItineraryStart = true;
      const isEnabled = await this.$store.dispatch(
        ENABLE_ITINERARY,
        this.selectedItinerary.id
      );
      this.isEnableItineraryStart = false;
      if (isEnabled) {
        const newItineraries = this.itineraries.map((itinerary) => {
          if (itinerary.id === this.selectedItinerary.id)
            itinerary.isActive = true;
          return itinerary;
        });
        this.$store.commit(SET_ITINERARIES, newItineraries);
        this.selectedItinerary = {};
        this.isEnableItineraryAlertDialogOpen = false;
      }
    },
  },
  async created() {
    await this.fetchItineraries();
  },
};
</script>
