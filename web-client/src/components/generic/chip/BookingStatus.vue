<template>
  <v-chip :color="color">
    {{ dateStatus }}
  </v-chip>
</template>

<script>
import moment from "moment";

export default {
  name: "generic-booking-status-chip",
  props: {
    isDone: {
      type: Boolean,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentDate() {
      return moment().format("DD.MM.YYYY").valueOf();
    },
    dateStatus() {
      const fromDate =
        moment(this.fromDate).format("DD.MM.YYYY").valueOf() || "";
      const toDate = moment(this.toDate).format("DD.MM.YYYY").valueOf() || "";
      let status = "";
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
