<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="customDate"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "itinerary-post-details-page-date-picker",
  data: () => ({
    customDate: "March 15, 2020 - March 18, 2020",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  props: {
    label: {
      type: String,
      required: false,
    },
  },
};
</script>
