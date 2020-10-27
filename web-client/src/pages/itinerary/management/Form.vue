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
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea outlined label="Description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="number"
                outlined
                label="Maximum Pax *"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <custom-image-input
                label="Images *"
                multiple
              ></custom-image-input>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-space-between align-center">
                <span class="subtitle-1">Itinerary</span>
                <div class="flex-grow-1"></div>
                <custom-tooltip-button
                  icon="mdi-plus"
                  text="Add new Day"
                  :action="() => (this.isDayFormDialogOpen = true)"
                ></custom-tooltip-button>
              </div>
              <v-data-table
                :headers="tableHeaders"
                :items="sampleItems"
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
                  ></custom-tooltip-button>
                  <custom-tooltip-button
                    icon="mdi-delete-outline"
                    text="Remove Day"
                  ></custom-tooltip-button>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" class="text-capitalize" block>Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="isDayFormDialogOpen" width="500">
      <v-card>
        <v-card-title>
          <span>Add new Day</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDayFormDialogOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle> Fill out day details. </v-card-subtitle>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field outlined label="Day *"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete outlined label="Destination *"></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <itinerary-management-page-transportation-combobox
                label="Transportation"
              ></itinerary-management-page-transportation-combobox>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined label="Lodging"></v-text-field>
            </v-col>
            <v-col cols="12">
              <itinerary-management-page-activity-combobox
                label="Activities"
              ></itinerary-management-page-activity-combobox>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="secondary" class="text-capitalize">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import commonUtilities from "@/common/utilities";
import ItineraryManagementPageTransportationCombobox from "@/components/itinerary-management-page/TransportationCombobox";
import ItineraryManagementPageActivityCombobox from "@/components/itinerary-management-page/ActivityCombobox";
import CustomImageInput from "@/components/custom/ImageInput";
export default {
  components: {
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
      sampleItems: [
        {
          day: "Day 1",
          destination: "Destination 1",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
        {
          day: "Day 2",
          destination: "Destination 2",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
        {
          day: "Day 3",
          destination: "Destination 3",
          transportation: "Transportation",
          lodging: "Lodging",
          activities: ["Activity 1", "Activity 2"],
        },
      ],
      isDayFormDialogOpen: false,
    };
  },
  mixins: [commonUtilities],
};
</script>
