<template>
  <v-chip :color="isDone ? 'success' : 'warning'">
    {{ isDone ? "Done" : "Pending" }}
  </v-chip>
</template>

<script>
export default {
  name: "generic-booking-status-chip",
  props: {
    isDone: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
