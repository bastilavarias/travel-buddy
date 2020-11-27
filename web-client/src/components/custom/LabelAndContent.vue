<template>
  <div>
    <div class="subtitle-2">{{ label }}</div>
    <h1 :class="`${contentClassName} title secondary--text`">
      {{ content }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "custom-label-and-content",
  props: {
    label: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentClassName: {
      type: String,
      required: false,
    },
  },
};
</script>
