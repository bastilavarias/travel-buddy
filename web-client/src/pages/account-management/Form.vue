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
            Create Account
          </span>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <span class="subtitle-1">Personal Information</span>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="First Name *"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field outlined label="Last Name *"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete outlined label="Nationality"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="10">
              <account-management-page-birth-date-picker
                label="Birth Date"
              ></account-management-page-birth-date-picker>
            </v-col>
            <v-col cols="12" md="2">
              <v-select outlined label="Gender"></v-select>
            </v-col>
            <v-col cols="12">
              <custom-image-input
                :multiple="false"
                label="Image"
              ></custom-image-input>
            </v-col>
            <v-col cols="12">
              <span class="subtitle-1">Sign In Credentials</span>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field outlined label="Email *"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select outlined label="Account Type *"></v-select>
            </v-col>
            <v-col cols="12">
              <h1 class="subtitle-2">Note</h1>
              <span class="body-2"
                >Default password will be the combination of last name and birth
                date. Eg; <strong>LASTNAME-10-10-10</strong></span
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block>Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import CommonUtilities from "@/common/utilities";
import AccountManagementPageBirthDatePicker from "@/components/account-management-page/BirthDateDatePicker";
import CustomImageInput from "@/components/custom/ImageInput";
export default {
  components: {
    CustomImageInput,
    AccountManagementPageBirthDatePicker,
    CustomTooltipButton,
  },
  mixins: [CommonUtilities],
};
</script>
