<template>
  <v-combobox
    v-model="transportLocal"
    :items="genericTransportation"
    :search-input.sync="search"
    hide-selected
    :label="label"
    persistent-hint
    :single-line="singleLine"
    :outlined="outlined"
    item-text="name"
    item-value="name"
    :clearable="clearable"
    :return-object="false"
    :rules="rules"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            "<strong>{{ search }}</strong
            >". Press <kbd>enter</kbd> to enter local transport (e.g.., pedicab)
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: "itinerary-management-transportation-combobox",
  props: {
    transport: {
      String: Array,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    outlined: {
      type: Boolean,
      required: false,
    },
    singleLine: {
      type: Boolean,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    rules: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      transportLocal: this.transport,
      search: null,
    };
  },
  computed: {
    genericTransportation() {
      return this.$store.state.generic.transportation;
    },
  },
  watch: {
    transport(val) {
      this.transportLocal = val;
    },
    transportLocal(val) {
      this.$emit("update:transport", val);
    },
  },
};
</script>
