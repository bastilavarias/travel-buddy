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
        </v-card-title>
        <v-data-table :headers="tableHeaders" :items="sampleItems">
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    label="Search"
                    outlined
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
          <template v-slot:item.details="{ item }">
            <span
              >{{ item.details.dayCount }} Days |
              {{ item.details.destinationCount }} Destinations |
              {{ item.details.activityCount }} Activities</span
            >
          </template>
          <template v-slot:item.price="{ item }">
            <span>&#8369; {{ item.price }}</span>
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
              icon="mdi-delete-outline"
              text="Delete Itinerary"
            ></custom-tooltip-button>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
export default {
  components: { CustomTooltipButton },
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
          text: "Tour Guide",
          value: "tourGuide",
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
          name: "Itinerary Name",
          details: {
            dayCount: 3,
            activityCount: 10,
            destinationCount: 3,
          },
          price: 5000,
          tourGuide: {
            image:
              "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
            name: "Cardo D.",
          },
        },
        {
          name: "Itinerary Name",
          details: {
            dayCount: 3,
            activityCount: 10,
            destinationCount: 3,
          },
          price: 5000,
          tourGuide: {
            image:
              "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
            name: "Cardo D.",
          },
        },
        {
          name: "Itinerary Name",
          details: {
            dayCount: 3,
            activityCount: 10,
            destinationCount: 3,
          },
          price: 5000,
          tourGuide: {
            image:
              "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
            name: "Cardo D.",
          },
        },
      ],
    };
  },
};
</script>
