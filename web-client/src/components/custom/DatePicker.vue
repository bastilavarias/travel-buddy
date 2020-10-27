<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="formattedDate"
        :label="label"
        :filled="filled"
        :rounded="rounded"
        :outlined="outlined"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dateLocal" @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  name: "custom-date-picker",
  props: {
    date: {
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      required: false,
    },
    filled: {
      type: Boolean,
      required: false,
    },
    outlined: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dateLocal: this.date,
      menu: false,
    };
  },
  computed: {
    formattedDate() {
      return this.dateLocal
        ? moment(this.dateLocal).format("MMMM Do YYYY")
        : "";
    },
  },
  watch: {
    date(val) {
      this.dateLocal = val;
    },
    dateLocal(val) {
      this.$emit("update:date", val);
    },
  },
};
</script>
