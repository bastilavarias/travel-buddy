<template>
  <v-dialog v-model="isOpenLocal" width="500">
    <v-card>
      <v-card-title :class="`${type} white--text text-capitalize`">{{
        title
      }}</v-card-title>
      <v-card-text class="py-5">
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          color="secondary"
          text
          class="text-capitalize"
          @click="isOpenLocal = false"
          >Cancel</v-btn
        >
        <v-btn :color="type" @click="action" :loading="loading">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "custom-alert-dialog",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    action: {
      type: Function,
      required: false,
      default: () => 1,
    },
  },
  data() {
    return {
      isOpenLocal: false,
    };
  },
  watch: {
    isOpen(val) {
      this.isOpenLocal = val;
    },
    isOpenLocal(val) {
      this.$emit("update:isOpen", val);
    },
  },
};
</script>
