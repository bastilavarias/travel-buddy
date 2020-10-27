<template>
  <v-file-input
    accept="image/png, image/jpeg, image/bmp"
    :label="label"
    outlined
    prepend-icon=""
    :multiple="multiple"
    v-model="imagesLocal"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip v-if="index < 2" color="secondary" dark label small>
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ images.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>

<script>
export default {
  name: "custom-image-input",

  props: {
    images: {
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      imagesLocal: this.images,
    };
  },

  watch: {
    images(val) {
      this.imagesLocal = val;
    },

    imagesLocal(val) {
      this.$emit("update:images", val);
    },
  },
};
</script>
