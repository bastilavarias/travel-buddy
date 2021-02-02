<template>
  <v-chip :color="color" :small="small">
    {{ dateStatus }}
  </v-chip>
</template>

<script>
import moment from "moment";

export default {
  name: "generic-booking-status-chip",
  props: {
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
    small: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    currentDate() {
      return moment().valueOf() || null;
    },
    dateStatus() {
      const fromDate = moment(this.fromDate).valueOf() || null;
      const toDate = moment(this.toDate).valueOf() || null;
      let status = null;
      if (this.currentDate > toDate) status = "Done";
      if (this.currentDate < fromDate) status = "Pending";
      if (this.currentDate >= fromDate && this.currentDate <= toDate)
        status = "Now";
      return status;
    },
    color() {
      switch (this.dateStatus) {
        case "Pending":
          return "warning";
        case "Done":
          return "success";
        case "Now":
          return "info";
        default:
          return "error";
      }
    },
  },
};
</script>
