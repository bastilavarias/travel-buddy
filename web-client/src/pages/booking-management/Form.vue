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
            Booking Details
          </span>
          <div class="flex-grow-1"></div>
          <generic-booking-status-chip
            :is-done="false"
          ></generic-booking-status-chip>
        </v-card-title>
        <v-list-item three-line>
          <v-list-item-avatar tile :size="75">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              lazy-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              <span>
                <span>Booking Number: </span>
                <span class="font-weight-bold"> BOOKING-1800-1-114-2126 </span>
              </span>
            </v-list-item-subtitle>
            <v-list-item-title class="font-weight-bold"
              >Itinerary Name</v-list-item-title
            >
            <v-list-item-subtitle>
              <v-chip small class="mr-1">
                <v-icon color="primary" small left>mdi-star</v-icon>
                <span class="primary--text">5.0</span>
              </v-chip>
              <span>(666)</span></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="8">
              <v-text-field
                label="Client Name"
                outlined
                readonly
                value="Client Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Client Email"
                outlined
                readonly
                value="Client Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="Tour Guide Name"
                outlined
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
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="secondary" class="text-capitalize">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>
<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import CommonUtilities from "@/common/utilities";
import GenericBookingStatusChip from "@/components/generic/chip/BookingStatus";
export default {
  components: { GenericBookingStatusChip, CustomTooltipButton },
  mixins: [CommonUtilities],
  data() {
    return {
      sampleTourGuides: [
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          rating: 4.5,
          location: "Manila, Philippines",
        },
      ],
    };
  },
};
</script>
