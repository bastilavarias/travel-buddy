<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold">Account List</span>
          <div class="flex-grow-1"></div>
          <custom-tooltip-button
            icon="mdi-plus"
            text="Create new Account"
            :to="{ name: 'account-management-page/form' }"
          ></custom-tooltip-button>
        </v-card-title>
        <v-data-table :headers="tableHeaders" :items="sampleItems">
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    single-line
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
          <template v-slot:item.isActive="{ item }">
            <generic-account-status-chip
              :is-active="item.isActive"
            ></generic-account-status-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <custom-tooltip-button
              icon="mdi-stop"
              text="Disable Account"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-pencil-outline"
              text="Edit Account"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-delete-outline"
              text="Delete Account"
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
import GenericAccountStatusChip from "@/components/generic/chip/AccountStatus";
export default {
  components: {
    GenericAccountStatusChip,
    GenericRatingChip,
    CustomTooltipButton,
  },
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
          text: "Type",
          value: "type",
          sortable: false,
        },
        {
          text: "Status",
          value: "isActive",
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
          type: "Tour Guide",
          isActive: true,
        },
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          type: "Tour Guide",
          isActive: true,
        },
        {
          image:
            "https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg",
          name: "Cardo D.",
          type: "Client",
          isActive: false,
        },
      ],
    };
  },
};
</script>
