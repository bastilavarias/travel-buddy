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
                single-line
                label="Itinerary Name (E.g, 4 Nights in Amazing Paris) *"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea outlined single-line label="Description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                outlined
                single-line
                label="Tour Guide"
                :items="sampleTourGuides"
              >
                <template v-slot:item="{ item }">
                  <v-list-item three-line>
                    <v-list-item-avatar color="secondary" :size="65">
                      <v-img :src="item.image" :lazy-src="item.image"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        <v-icon small class="mr-1"
                          >mdi-map-marker-outline</v-icon
                        >
                        <span>
                          {{ item.location }}
                        </span>
                      </v-list-item-subtitle>
                      <v-list-item-title class="font-weight-bold">{{
                        item.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-chip small>
                          <v-icon color="primary" small left>mdi-star</v-icon>
                          <span class="primary--text">5.0</span>
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-autocomplete>
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
              <v-text-field outlined single-line label="Day *"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                outlined
                single-line
                label="Destination *"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <itinerary-management-page-transportation-combobox
                label="Transportation"
              ></itinerary-management-page-transportation-combobox>
            </v-col>
            <v-col cols="12">
              <v-text-field outlined single-line label="Lodging"></v-text-field>
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
import CommonUtilities from "@/common/utilities";
import ItineraryManagementPageTransportationCombobox from "@/components/itinerary-management-page/TransportationCombobox";
import ItineraryManagementPageActivityCombobox from "@/components/itinerary-management-page/ActivityCombobox";
export default {
  components: {
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
      sampleTourGuides: [
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          rating: 4.5,
          location: "Manila, Philippines",
        },
      ],
      isDayFormDialogOpen: false,
    };
  },
  mixins: [CommonUtilities],
};
</script>
