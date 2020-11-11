<template>
  <v-dialog v-model="isOpenLocal" width="800">
    <v-card>
      <div class="text-center success py-5">
        <v-icon :size="150" color="white"> mdi-check-circle </v-icon>
      </div>
      <div class="text-center py-10 px-5">
        <h1 class="display-1 font-weight-bold mb-5">Thank You!</h1>
        <p class="subtitle-1 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
          architecto!
        </p>
        <p class="subtitle-1">You will redirected to your feed...</p>
      </div>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="success">View Booking</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "checkout-page-thank-you-dialog",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isOpenLocal: this.isOpen,
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
