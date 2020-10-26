<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title class="font-weight-bold"> Tour Guide List </v-card-title>
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

          <template v-slot:item.image="{ item }">
            <v-avatar :size="25" color="secondary" class="mr-1">
              <v-img :src="item.image" :lazy-src="item.image"></v-img>
            </v-avatar>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize">
              {{ item.name }}
            </span>
          </template>
          <template v-slot:item.rating="{ item }">
            <generic-rating-chip></generic-rating-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <custom-tooltip-button
              icon="mdi-file-find"
              text="View Record"
              :to="{ name: 'tour-guide-management-page/record' }"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-delete-outline"
              text="Delete Record"
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
export default {
  components: { GenericRatingChip, CustomTooltipButton },
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
          text: "Location",
          value: "location",
          sortable: false,
        },
        {
          text: "Contact No.",
          value: "contactNumber",
          sortable: false,
        },
        {
          text: "Rating",
          value: "rating",
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
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          email: "cardodalisay@gmail.com",
          location: "Manila, Philippines",
          contactNumber: "09999999999",
        },
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          email: "cardodalisay@gmail.com",
          location: "Manila, Philippines",
          contactNumber: "09999999999",
        },
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          email: "cardodalisay@gmail.com",
          location: "Manila, Philippines",
          contactNumber: "09999999999",
        },
      ],
    };
  },
};
</script>
