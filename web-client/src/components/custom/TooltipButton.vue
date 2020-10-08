<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
        :color="color"
        @click="action"
        :to="to"
        :exact-active-class="exactActiveClass"
        ><v-icon>{{ icon }}</v-icon></v-btn
      >
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "custom-tooltip-button",
  props: {
    icon: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    action: {
      type: Function,
      required: false,
      default: () => 1,
    },
    to: {
      type: Object,
      required: false,
    },
    exactActiveClass: {
      type: String,
      required: false,
    },
  },
};
</script>
