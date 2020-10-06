<template>
  <router-link
      :style="{
      textDecoration: 'none',
    }"
      :to="to"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "custom-router-link",
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
};
</script>