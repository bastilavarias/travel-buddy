<template>
  <v-autocomplete
    v-model="destinationLocal"
    :items.sync="genericDestinations"
    :outlined="outlined"
    :label="label"
    :search-input.sync="search"
    :loading="isSearchStart"
    :filter="(v) => v"
    @keyup="searchDestinations"
    placeholder="Search Destination"
    item-text="display_name"
    item-value="display_name"
    :disabled="isSearchStart"
  >
  </v-autocomplete>
</template>

<script>
import {
  SEARCH_GENERIC_DESTINATIONS,
  SET_GENERIC_DESTINATIONS,
} from "@/store/types/generic";
let timeout = null;

export default {
  name: "custom-destination-search-autocomplete",
  props: {
    destination: {
      type: String,
      required: true,
    },
    outlined: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      destinationLocal: this.destination,
      search: null,
      isSearchStart: false,
    };
  },
  computed: {
    genericDestinations() {
      return this.$store.state.generic.destinations;
    },
  },
  watch: {
    destination(val) {
      this.destinationLocal = val;
    },
    destinationLocal(val) {
      this.$emit("update:destination", val);
    },
  },
  methods: {
    async searchDestinations() {
      if (this.search === null) return;
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        this.isSearchStart = true;
        await this.$store.dispatch(SEARCH_GENERIC_DESTINATIONS, this.search);
        this.isSearchStart = false;
      }, 800);
    },
  },
};
</script>
