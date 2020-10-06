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
                    single-line
                    color="primary"
                    filled
                    rounded
                  ></v-text-field>
                  <v-text-field
                    filled
                    rounded
                    label="Password"
                    single-line
                    color="primary"
                    type="password"
                  ></v-text-field>
                  <p class="caption primary--text mb-9">Forgot Password?</p>
                  <v-btn
                    block
                    color="primary"
                    depressed
                    class="text-capitalize"
                    large
                    rounded
                    :to="{ name: 'feed-page' }"
                    >Sign In</v-btn
                  >
                </div>
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
