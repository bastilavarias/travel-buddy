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
        depressed
        class="text-capitalize white--text"
        :to="{ name: 'sign-in-page' }"
        >Sign In</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-row no-gutters>
        <v-col md="2" class="d-none d-md-block">
          <v-img
            :src="require('@/assets/signup-page/woman-standing.jpg')"
            cover
            height="100vh"
            position="top"
          ></v-img>
        </v-col>
        <v-col cols="12" md="10">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" md="10" lg="8">
                <v-card color="transparent" flat>
                  <v-card-title>New User?</v-card-title>
                  <v-card-subtitle
                    >Use the form below to create your account.</v-card-subtitle
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          filled
                          rounded
                          label="First Name *"
                          single-line
                          v-model="form.firstName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          filled
                          rounded
                          label="Last Name *"
                          single-line
                          v-model="form.lastName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-autocomplete
                          filled
                          rounded
                          label="Nationality *"
                          single-line
                          :loading="isFetchGenericNationalitiesStart"
                          :items="genericNationalities"
                          item-text="label"
                          item-value="name"
                          v-model="form.nationality"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          filled
                          rounded
                          label="Email *"
                          single-line
                          type="email"
                          v-model="form.email"
                          :error="!!signupError.email"
                          :error-messages="signupError.email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <custom-date-picker
                          label="Date of Birth *"
                          rounded
                          filled
                          :date.sync="form.birthDate"
                        ></custom-date-picker>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          filled
                          rounded
                          label="Sex *"
                          single-line
                          :loading="isFetchGenericSexesStart"
                          :items="genericSexes"
                          item-text="label"
                          item-value="name"
                          v-model="form.sex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <custom-password-text-field
                          :password.sync="form.password"
                          filled
                          rounded
                          label="Password *"
                        ></custom-password-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <custom-password-text-field
                          :password.sync="form.confirmPassword"
                          filled
                          rounded
                          label="Confirm Password *"
                          :rules="[formRules.password]"
                        ></custom-password-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          label="I agree and accept the terms and conditions. *"
                          v-model="isAgreeByTermsAndCondition"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <div class="d-flex justify-space-between align-center">
                          <div class="flex-grow-1"></div>
                          <v-btn
                            color="primary"
                            large
                            class="text-capitalize"
                            @click="signup"
                            :disabled="!isSignupFormValid"
                            :loading="isSignupStart"
                          >
                            Signup
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                    <div class="my-15">
                      <p class="caption">Or, Sign In with Social Accounts</p>
                      <div class="d-flex align-center">
                        <v-btn
                          color="#3B5998"
                          depressed
                          rounded
                          dark
                          class="mr-5"
                        >
                          <v-icon class="mr-2">mdi-facebook</v-icon>
                          <span class="text-capitalize"
                            >Signup with Facebook</span
                          >
                        </v-btn>
                        <v-btn
                          color="#DB4437"
                          depressed
                          rounded
                          dark
                          class="mr-5"
                        >
                          <v-icon class="mr-2">mdi-google</v-icon>
                          <span class="text-capitalize"
                            >Signup with Google</span
                          >
                        </v-btn>
                        <v-btn color="#1DA1F2" depressed rounded dark>
                          <v-icon class="mr-2">mdi-twitter</v-icon>
                          <span class="text-capitalize"
                            >Signup with Twitter</span
                          >
                        </v-btn>
                      </div>
                    </div>
                    <p class="caption">
                      Have an account?
                      <span class="primary--text font-weight-bold"
                        >Sign In here</span
                      >
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <generic-basic-footer></generic-basic-footer>
    </v-main>
  </v-app>
</template>

<script>
import CustomRouterLink from "@/components/custom/RouterLink";
import GenericBasicFooter from "@/components/generic/footer/Basic";
import CustomDatePicker from "@/components/custom/DatePicker";
import {
  GENERIC_FETCH_NATIONALITIES,
  GENERIC_FETCH_SEXES,
} from "@/store/types/generic";
import CustomPasswordTextField from "@/components/custom/PasswordTextField";
import { AUTHENTICATION_SIGNUP } from "@/store/types/authentication";
const defaultSignupForm = {
  firstName: "",
  nationality: "filipino",
  lastName: "",
  email: "",
  birthDate: "",
  sex: "",
  password: "",
  confirmPassword: "",
};
export default {
  components: {
    CustomPasswordTextField,
    CustomDatePicker,
    GenericBasicFooter,
    CustomRouterLink,
  },
  data() {
    return {
      birthDate: "",
      isFetchGenericNationalitiesStart: false,
      isFetchGenericSexesStart: false,
      form: Object.assign({}, defaultSignupForm),
      defaultSignupForm,
      formRules: {
        password: (value) =>
          value === this.form.password || "Password are not same.",
      },
      isAgreeByTermsAndCondition: false,
      isSignupStart: false,
      signupError: {
        email: "",
      },
    };
  },
  computed: {
    genericNationalities() {
      return this.$store.state.generic.nationalities;
    },
    genericSexes() {
      return this.$store.state.generic.sexes;
    },
    isSignupFormValid() {
      const {
        firstName,
        lastName,
        nationality,
        email,
        birthDate,
        sex,
        password,
        confirmPassword,
      } = this.form;
      const isSatisfied =
        firstName &&
        lastName &&
        nationality &&
        email &&
        birthDate &&
        sex &&
        password &&
        confirmPassword;
      const isPasswordsSame = password === confirmPassword;
      return isSatisfied && isPasswordsSame && this.isAgreeByTermsAndCondition;
    },
  },
  methods: {
    async fetchGenericNationalities() {
      this.isFetchGenericNationalitiesStart = true;
      await this.$store.dispatch(GENERIC_FETCH_NATIONALITIES);
      this.isFetchGenericNationalitiesStart = false;
    },
    async fetchGenericSexes() {
      this.isFetchGenericSexesStart = true;
      await this.$store.dispatch(GENERIC_FETCH_SEXES);
      this.isFetchGenericSexesStart = false;
    },
    async signup() {
      this.isSignupStart = true;
      const { token, error } = await this.$store.dispatch(
        AUTHENTICATION_SIGNUP,
        this.form
      );
      this.isSignupStart = false;
      if (token) {
        return await this.$router.push({ name: "feed-page" });
      }
      this.signupError = error;
    },
  },
  async created() {
    await this.fetchGenericNationalities();
    await this.fetchGenericSexes();
  },
};
</script>
