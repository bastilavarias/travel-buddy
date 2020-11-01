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
            Create Itinerary
          </span>
        </v-card-title>
        <v-card-subtitle>Fill out itinerary details.</v-card-subtitle>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Itinerary Name (E.g, 4 Nights in Amazing Paris) *"
                v-model="form.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Description"
                v-model="form.description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                outlined
                label="Price *"
                v-model="form.price"
                min="0.01"
                step="0.01"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                outlined
                label="Maximum Pax *"
                v-model="form.pax"
                min="0.01"
                step="0.01"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <custom-image-input
                label="Images *"
                multiple
                :images.sync="form.images"
              ></custom-image-input>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <span class="subtitle-1">Itinerary</span>
                <div class="flex-grow-1"></div>
                <custom-tooltip-button
                  icon="mdi-plus"
                  text="Add new Day"
                  :action="() => openAddDayDialog()"
                ></custom-tooltip-button>
              </div>
              <v-data-table
                :headers="tableHeaders"
                :items="form.days"
                hide-default-footer
                :items-per-page="-1"
              >
                <template v-slot:item.day="{ item }">
                  <span class="font-weight-bold">{{ item.day }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                  <custom-tooltip-button
                    icon="mdi-pencil-outline"
                    text="Edit Day"
                    :action="() => openUpdateFormDialog(item)"
                  ></custom-tooltip-button>
                  <custom-tooltip-button
                    icon="mdi-delete-outline"
                    text="Remove Day"
                    :action="() => openRemoveDayDialog(item)"
                  ></custom-tooltip-button>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            block
            :disabled="!isFormValid"
            @click="createNewItinerary"
            :loading="isCreateNewItineraryStart"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
    <itinerary-management-page-day-form-dialog
      :is-open.sync="isDayFormDialogOpen"
      :days.sync="form.days"
      :selected-day="selectedDay"
      :operation="dayFormDialogOperation"
    ></itinerary-management-page-day-form-dialog>
    <custom-alert-dialog
      :is-open.sync="isCustomAlertDialogOpen"
      type="warning"
      title="Remove Day"
      text="Removing this day is irreversible. Confirm anyway?"
      :action="() => closeRemoveDayDialog()"
    ></custom-alert-dialog>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import commonUtilities from "@/common/utilities";
import ItineraryManagementPageTransportationCombobox from "@/components/itinerary-management-page/TransportationCombobox";
import ItineraryManagementPageActivityCombobox from "@/components/itinerary-management-page/ActivityCombobox";
import CustomImageInput from "@/components/custom/ImageInput";
import CustomDestinationSearchAutocomplete from "@/components/custom/DestinationSearchAutocomplete";
import { FETCH_GENERIC_TRANSPORTATION } from "@/store/types/generic";
import ItineraryManagementPageDayFormDialog from "@/components/itinerary-management-page/DayFormDialog";
import CustomAlertDialog from "@/components/custom/AlertDialog";
import { CREATE_NEW_ITINERARY } from "@/store/types/itinerary";
import commonValidation from "@/common/validation";

const defaultItineraryForm = {
  name: "",
  description: "",
  price: 0,
  pax: 0,
  days: [],
  images: [],
};

export default {
  components: {
    CustomAlertDialog,
    ItineraryManagementPageDayFormDialog,
    CustomDestinationSearchAutocomplete,
    CustomImageInput,
    ItineraryManagementPageActivityCombobox,
    ItineraryManagementPageTransportationCombobox,
    CustomTooltipButton,
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
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      isDayFormDialogOpen: false,
      form: Object.assign({}, defaultItineraryForm),
      defaultItineraryForm,
      selectedDay: {},
      dayFormDialogOperation: "add",
      isCustomAlertDialogOpen: false,
      isCreateNewItineraryStart: false,
    };
  },
  mixins: [commonUtilities, commonValidation],
  computed: {
    isFormValid() {
      const { name, pax, images, days, price } = this.form;
      return (
        name &&
        price &&
        parseInt(price) > 0 &&
        pax &&
        parseInt(pax) > 0 &&
        images.length > 0 &&
        days.length > 0
      );
    },
  },
  methods: {
    openAddDayDialog() {
      this.dayFormDialogOperation = "add";
      this.selectedDay = {};
      this.isDayFormDialogOpen = true;
    },
    openUpdateFormDialog(day) {
      this.dayFormDialogOperation = "update";
      this.selectedDay = day;
      this.isDayFormDialogOpen = true;
    },
    openRemoveDayDialog(day) {
      this.selectedDay = day;
      this.isCustomAlertDialogOpen = true;
    },
    closeRemoveDayDialog() {
      this.form.days = this.form.days.filter(
        (item) => item.day !== this.selectedDay.day
      );
      this.form.days = this.form.days.map((item, index) => {
        item.day = index + 1;
        return item;
      });
      this.selectedDay = {};
      this.isCustomAlertDialogOpen = false;
    },
    async createNewItinerary() {
      this.isCreateNewItineraryStart = true;
      const createdItinerary = await this.$store.dispatch(
        CREATE_NEW_ITINERARY,
        this.form
      );
      this.isCreateNewItineraryStart = false;
      if (this.validateObject(createdItinerary)) {
        this.clearForm();
      }
    },
    clearForm() {
      this.form = Object.assign({}, this.defaultItineraryForm);
    },
  },
  async created() {
    await this.$store.dispatch(FETCH_GENERIC_TRANSPORTATION);
  },
};
</script>
