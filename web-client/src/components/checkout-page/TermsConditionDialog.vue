<template>
  <v-dialog v-model="isOpenLocal" width="500">
    <v-card>
      <v-card-title>
        <span>Terms and Condition</span>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="isOpenLocal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
        architecto beatae ducimus eum non, quas quos! Culpa debitis sit
        temporibus? Aliquam blanditiis commodi corporis cumque dicta dolor
        dolorum, eligendi et expedita facere fugiat harum hic illum ipsam itaque
        labore laboriosam laborum laudantium magni maiores minima nostrum odit
        officiis pariatur quae quibusdam quidem ratione repellendus
        reprehenderit sequi sit sunt, velit veritatis vero voluptas voluptate
        voluptatem? Aut commodi eligendi facere reprehenderit tenetur. Alias
        aspernatur, atque consectetur consequatur consequuntur debitis
        doloremque eius ex fugit harum labore maiores molestias mollitia nam
        nemo neque nobis numquam placeat quas qui rerum sapiente sequi similique
        soluta sunt.
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="secondary" class="text-capitalize">I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "checkout-page-terms-condition-dialog",
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
