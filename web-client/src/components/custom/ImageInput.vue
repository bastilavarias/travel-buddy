<template>
  <v-file-input
    accept="image/png, image/jpeg, image/bmp"
    :label="label"
    outlined
    prepend-icon=""
    :multiple="multiple"
    v-model="files"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip v-if="index < 2" color="secondary" dark label small>
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>

<script>
export default {
  name: "custom-image-input",
  data() {
    return {
      files: [],
    };
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
