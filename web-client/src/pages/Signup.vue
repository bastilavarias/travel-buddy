<template>
  <v-app>
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
                          label="First Name"
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          filled
                          rounded
                          label="Last Name"
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          filled
                          rounded
                          label="Nationality"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          filled
                          rounded
                          label="E-mail"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          filled
                          rounded
                          label="Date of Birth"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          filled
                          rounded
                          label="Gender"
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          type="password"
                          filled
                          rounded
                          label="Password"
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          type="password"
                          filled
                          rounded
                          label="Confirm Password"
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-checkbox
                          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id lobortis enim."
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12">
                        <div class="d-flex justify-space-between align-center">
                          <div class="flex-grow-1"></div>
                          <v-btn color="primary" large class="text-capitalize">
                            Continue
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <span class="caption">
                          Have an account?
                          <custom-router-link :to="{ name: 'sign-in-page' }">
                            <span class="primary--text font-weight-bold"
                              >Sign In here</span
                            >
                          </custom-router-link>
                        </span>
                      </v-col>
                    </v-row>
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
import CommonUtilities from "@/common/utilities";
import GenericBasicFooter from "@/components/generic/footer/Basic";
import CustomRouterLink from "@/components/custom/RouterLink";
export default {
  components: { CustomRouterLink, GenericBasicFooter },
  mixins: [CommonUtilities],
};
</script>
