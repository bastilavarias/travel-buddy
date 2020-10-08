<template>
  <v-chip :color="isActive ? 'success' : 'error'">
    {{ isActive ? "Active" : "Disabled" }}
  </v-chip>
</template>

<script>
export default {
  name: "generic-account-status-chip",
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
