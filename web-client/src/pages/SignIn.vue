<template>
  <v-app :style="{ backgroundColor: '#ECEFF3' }">
    <v-app-bar color="secondary" fixed style="z-index: 5" dark>
      <v-toolbar-title>
        <custom-router-link :to="{ name: 'home-page' }">
          <span class="font-weight-bold white--text">
            Travel <span class="primary--text">Buddy</span>
          </span>
        </custom-router-link>
      </v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-btn
        color="primary"
        class="text-capitalize white--text"
        :to="{ name: 'signup-page' }"
        >Signup</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-row no-gutters>
        <v-col cols="12" md="4" lg="5" xl="6" class="d-none d-md-block">
          <v-img
            :src="require('@/assets/sign-in-page/girl-dancing.jpg')"
            cover
            height="100vh"
            position="top"
          ></v-img>
        </v-col>
        <v-col cols="12" md="8" lg="7" xl="6">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" md="10" lg="8">
                <div class="text-center mb-10">
                  <v-icon color="primary" :size="65" class="mb-10">
                    mdi-map-marker
                  </v-icon>
                  <h1 class="display-2 font-weight-bold mb-5">Hello, Buddy!</h1>
                  <h2 class="subtitle-1">Please sign in to your account.</h2>
                </div>
                <div>
                  <v-text-field
                    label="Email"
                    color="primary"
                    filled
                    rounded
                    v-model="form.email"
                    :rules="[formRules.email]"
                    :error="!!signInError.email"
                    :error-messages="signInError.email"
                  ></v-text-field>
                  <custom-password-text-field
                    filled
                    rounded
                    label="Password"
                    :password.sync="form.password"
                    :rules="[formRules.password]"
                    :error="!!signInError.password"
                    :error-messages="signInError.password"
                  ></custom-password-text-field>
                  <div class="mb-9"></div>
                  <v-btn
                    block
                    color="primary"
                    depressed
                    class="text-capitalize"
                    large
                    rounded
                    @click="signIn"
                    :loading="isSignInStart"
                    :disabled="!isSignInFormValid"
                    >Sign In</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-main>
    <generic-basic-footer></generic-basic-footer>
  </v-app>
</template>

<script>
import commonUtilities from "@/common/utilities";
import GenericBasicFooter from "@/components/generic/footer/Basic";
import CustomPasswordTextField from "@/components/custom/PasswordTextField";
import CustomRouterLink from "@/components/custom/RouterLink";
import { AUTHENTICATION_SIGN_IN } from "@/store/types/authentication";
const defaultSignInForm = {
  email: "",
  password: "",
};
export default {
  components: { CustomRouterLink, CustomPasswordTextField, GenericBasicFooter },
  mixins: [commonUtilities],
  data() {
    return {
      form: Object.assign({}, defaultSignInForm),
      defaultSignInForm,
      formRules: {
        email: (value) => !!value || "Email should not be empty.",
        password: (value) => !!value || "Password should not be empty.",
      },
      isSignInStart: false,
      signInError: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    isSignInFormValid() {
      const { email, password } = this.form;
      return email && password;
    },
  },
  methods: {
    async signIn() {
      this.isSignInStart = true;
      const { token, error } = await this.$store.dispatch(
        AUTHENTICATION_SIGN_IN,
        this.form
      );
      this.isSignInStart = false;
      if (token) {
        return await this.$router.push({ name: "feed-page" });
      }
      this.signInError = error;
    },
  },
};
</script>
