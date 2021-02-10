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
            <v-col cols="12" v-if="operation === 'create'">
              <custom-image-input
                label="Images *"
                multiple
                :images.sync="form.images"
              ></custom-image-input>
            </v-col>
            <v-col cols="12" v-if="operation === 'update'">
              <v-expansion-panels class="elevation-0">
                <v-expansion-panel class="elevation-0">
                  <v-expansion-panel-header class="font-weight-medium">
                    Current Images
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row dense>
                      <template v-for="(image, index) in form.imagesUrl">
                        <v-col cols="12" md="4" :key="index">
                          <v-dialog width="800">
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                :src="image.url"
                                :lazy-src="image.url"
                                width="100%"
                                height="auto"
                                v-bind="attrs"
                                v-on="on"
                                :style="{ cursor: 'pointer' }"
                              ></v-img>
                            </template>
                            <v-img
                              :src="image.url"
                              :lazy-src="image.url"
                              width="100%"
                              height="auto"
                            ></v-img>
                          </v-dialog>
                        </v-col>
                      </template>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" v-if="operation === 'update'">
              <custom-image-input
                label="New Images *"
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
            :disabled="!isUpdateFormValid"
            @click="updateItinerary"
            :loading="isUpdateItineraryStart"
            v-if="operation === 'update'"
            >Update</v-btn
          >
          <v-btn
            color="primary"
            block
            :disabled="!isCreateFormValid"
            @click="createNewItinerary"
            :loading="isCreateNewItineraryStart"
            v-if="operation === 'create'"
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
import {
  FETCH_GENERIC_TRANSPORTATION,
  SEARCH_GENERIC_DESTINATIONS,
} from "@/store/types/generic";
import ItineraryManagementPageDayFormDialog from "@/components/itinerary-management-page/DayFormDialog";
import CustomAlertDialog from "@/components/custom/AlertDialog";
import {
  CREATE_NEW_ITINERARY,
  GET_ITINERARY_SOFT_DETAILS,
  UPDATE_ITINERARY,
} from "@/store/types/itinerary";
import commonValidation from "@/common/validation";

const defaultItineraryForm = {
  name: "",
  description: "",
  price: 0,
  pax: 0,
  days: [],
  images: [],
  imagesUrl: [],
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
      selectedDay: null,
      dayFormDialogOperation: "add",
      isCustomAlertDialogOpen: false,
      isCreateNewItineraryStart: false,
      isUpdateItineraryStart: false,
      operation: null,
    };
  },
  mixins: [commonUtilities, commonValidation],
  computed: {
    isCreateFormValid() {
      const { name, pax, images, days, price } = this.form;
      return (
        name &&
        price &&
        parseInt(price) > 0 &&
        pax &&
        parseInt(pax) > 0 &&
        days.length > 0 &&
        images.length > 0
      );
    },

    isUpdateFormValid() {
      const { name, pax, days, price } = this.form;
      return (
        name &&
        price &&
        parseInt(price) > 0 &&
        pax &&
        parseInt(pax) > 0 &&
        days.length > 0
      );
    },
  },
  methods: {
    openAddDayDialog() {
      this.dayFormDialogOperation = "add";
      this.selectedDay = this.selectedDay = Object.assign({}, {});
      this.isDayFormDialogOpen = true;
    },
    openUpdateFormDialog(day) {
      this.dayFormDialogOperation = "update";
      this.selectedDay = Object.assign({}, day);
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
    async updateItinerary() {
      const { id } = this.$route.params;
      const payload = Object.assign(this.form, {
        postID: id,
      });
      this.isUpdateItineraryStart = true;
      const updatedItinerary = await this.$store.dispatch(
        UPDATE_ITINERARY,
        payload
      );
      this.isUpdateItineraryStart = false;
      if (this.validateObject(updatedItinerary)) {
        await this.$router.push({ name: "itinerary-management-page/table" });
      }
    },
    clearForm() {
      this.form = Object.assign({}, this.defaultItineraryForm);
    },
    async getItineraryDetails() {
      const { id } = this.$route.params;
      const itinerary = await this.$store.dispatch(
        GET_ITINERARY_SOFT_DETAILS,
        id
      );
      const days = itinerary.days.map((day) => {
        day.activities = day.activities.map((activity) => activity.name);
        return day;
      });
      this.form = Object.assign(this.form, {
        name: itinerary.name,
        description: itinerary.description,
        price: itinerary.price,
        pax: itinerary.pax,
        days: days,
        imagesUrl: itinerary.images,
      });
      this.form.days.map(
        async (day) =>
          await this.$store.dispatch(
            SEARCH_GENERIC_DESTINATIONS,
            day.destination
          )
      );
    },
  },
  async created() {
    await this.$store.dispatch(FETCH_GENERIC_TRANSPORTATION);
    const { id, operation } = this.$route.params;
    this.operation = operation;
    if (this.operation === "update" && !id) return this.$router.go(-1);
    if (this.operation === "update" && id) await this.getItineraryDetails();
  },
};
</script>
