<template>
  <v-text-field
    :append-icon="isPasswordShow ? 'mdi-eye-off' : 'mdi-eye'"
    :type="isPasswordShow ? 'text' : 'password'"
    @click:append="isPasswordShow = !isPasswordShow"
    :outlined="outlined"
    :label="label"
    v-model="passwordLocal"
    :error="error"
    :error-messages="errorMessages"
    :rules="rules"
    :filled="filled"
    :rounded="rounded"
    :single-line="singleLine"
  ></v-text-field>
</template>

<script>
export default {
  name: "custom-password-text-field",
  props: {
    outlined: {
      type: Boolean,
      required: false,
    },
    filled: {
      type: Boolean,
      required: false,
    },
    rounded: {
      type: Boolean,
      required: false,
    },
    singleLine: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
    },
    errorMessages: {
      type: String,
      required: false,
    },
    rules: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isPasswordShow: false,
      passwordLocal: "",
    };
  },
  watch: {
    password(val) {
      this.passwordLocal = val;
    },
    passwordLocal(val) {
      this.$emit("update:password", val);
    },
  },
};
</script>
