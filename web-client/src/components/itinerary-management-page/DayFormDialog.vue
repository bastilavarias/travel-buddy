<template>
  <v-dialog v-model="isOpenLocal" width="500">
    <v-card>
      <v-card-title>
        <span>{{ operation === "add" ? "Add new Day" : "Update Day" }}</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isOpenLocal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle> Fill out day details. </v-card-subtitle>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Day"
              v-model="form.day"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <custom-destination-search-autocomplete
              :destination.sync="form.destination"
              label="Destination *"
              outlined
            ></custom-destination-search-autocomplete>
          </v-col>
          <v-col cols="12">
            <itinerary-management-transportation-combobox
              :transport.sync="form.transportation"
              label="Transportation"
              outlined
            ></itinerary-management-transportation-combobox>
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Lodging"
              v-model="form.lodging"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <itinerary-management-page-activity-combobox
              label="Activities"
              :activities.sync="form.activities"
            ></itinerary-management-page-activity-combobox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          color="secondary"
          class="text-capitalize"
          :disabled="!isFormValid"
          @click="addDay"
          v-if="operation === 'add'"
          >Add</v-btn
        >
        <v-btn
          color="secondary"
          class="text-capitalize"
          :disabled="!isFormValid"
          @click="updateDay"
          v-if="operation === 'update'"
          >Update</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomDestinationSearchAutocomplete from "@/components/custom/DestinationSearchAutocomplete";
import ItineraryManagementPageActivityCombobox from "@/components/itinerary-management-page/ActivityCombobox";
import ItineraryManagementTransportationCombobox from "@/components/itinerary-management-page/TransportationCombobox";
import commonValidation from "@/common/validation";

const defaultDayForm = {
  destination: "",
  transportation: "",
  activities: [],
  day: null,
};

export default {
  name: "itinerary-management-page-day-form-dialog",
  components: {
    ItineraryManagementTransportationCombobox,
    ItineraryManagementPageActivityCombobox,
    CustomDestinationSearchAutocomplete,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    days: {
      type: Array,
      required: true,
    },
    selectedDay: {
      required: true,
    },
    operation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpenLocal: this.isOpen,
      form: Object.assign({}, defaultDayForm),
      defaultDayForm,
      daysLocal: this.days,
    };
  },
  mixins: [commonValidation],
  computed: {
    isFormValid() {
      const {
        day,
        destination,
        transportation,
        lodging,
        activities,
      } = this.form;
      return (
        day && destination && transportation && lodging && activities.length > 0
      );
    },
    dayCount() {
      if (this.operation === "add") return this.daysLocal.length + 1;
      return this.selectedDay.day;
    },
  },
  watch: {
    isOpen(val) {
      this.isOpenLocal = val;
    },
    isOpenLocal(val) {
      this.$emit("update:isOpen", val);
    },
    days(val) {
      this.daysLocal = val;
    },
    daysLocal(val) {
      this.$emit("update:days", val);
    },
    selectedDay(val) {
      if (val && this.validateObject(val)) {
        this.form = Object.assign(this.form, val);
        return;
      }
      this.form = Object.assign({}, this.defaultDayForm);
    },
  },
  methods: {
    addDay() {
      const payload = {
        index: this.dayCount,
        day: this.form.day,
        destination: this.form.destination || "",
        transportation: this.form.transportation || "",
        lodging: this.form.lodging || "",
        activities: this.form.activities || [],
      };
      this.daysLocal = [...this.daysLocal, payload];
      this.clearForm();
      this.isOpenLocal = false;
    },
    updateDay() {
      this.daysLocal = this.daysLocal.map((item) => {
        if (item.index === this.selectedDay.index)
          item = Object.assign({}, this.form);
        return item;
      });
      this.clearForm();
      this.isOpenLocal = false;
    },
    clearForm() {
      this.form = Object.assign({}, this.defaultDayForm);
    },
  },
};
</script>
