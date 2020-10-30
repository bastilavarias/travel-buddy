<template>
  <v-snackbar
    v-model="isOpenLocal"
    :color="colorLocal"
    multi-line
    :timeout="timeout"
  >
    {{ textLocal }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="isOpenLocal = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS } from "@/store/types/generic";
export default {
  name: "custom-global-snackbar",
  data() {
    return {
      isOpenLocal: false,
      textLocal: "",
      colorLocal: "",
      timeout: 4000,
    };
  },
  computed: {
    configs() {
      return this.$store.state.generic.globalSnackbarConfigs;
    },
  },
  watch: {
    configs(val) {
      const { isOpen, text, color } = val;
      this.textLocal = text;
      this.colorLocal = color;
      this.isOpenLocal = isOpen;
    },
    isOpenLocal(isOpen) {
      if (!isOpen)
        return this.$store.commit(SET_GENERIC_GLOBAL_SNACKBAR_CONFIGS, {
          isOpen: false,
          text: "",
          color: "",
        });
    },
  },
  created() {
    this.isOpenLocal = this.configs.isOpen;
    this.textLocal = this.configs.text;
    this.colorLocal = this.configs.color;
  },
};
</script>
