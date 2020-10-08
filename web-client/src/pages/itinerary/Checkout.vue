<template>
  <section>
    <v-container>
      <v-btn @click="goBack" fab color="white" small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>Itinerary Checkout Details</v-card-title>
                <v-list-item three-line>
                  <v-list-item-avatar tile :size="75">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      lazy-src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold"
                      >Itinerary Name</v-list-item-title
                    >
                    <v-list-item-subtitle
                      ><span class="font-weight-bold">3 Days</span> | 11
                      Activities</v-list-item-subtitle
                    >
                    <v-list-item-subtitle>
                      <v-chip small class="mr-1">
                        <v-icon color="primary" small left>mdi-star</v-icon>
                        <span class="primary--text">5.0</span>
                      </v-chip>
                      <span>(666)</span></v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <v-alert dense text type="success">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolor, reiciendis?
                      </v-alert>
                      <v-alert dense text type="error">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolor, reiciendis?
                      </v-alert>
                    </v-col>
                    <v-col cols="12">
                      <itinerary-post-details-page-date-picker
                        label="Date"
                      ></itinerary-post-details-page-date-picker>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card outlined>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <h1 class="subtitle-2">
                        **Note for our beloved clients**
                      </h1>
                      <span class="body-2"
                        >Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Omnis, perspiciatis?</span
                      >
                    </v-col>
                    <v-col cols="12">
                      <stripe-elements
                        ref="elementsRef"
                        :pk="publishableKey"
                        :amount="amount"
                        locale="PHP"
                        @token="tokenCreated"
                        @loading="loading = $event"
                      >
                      </stripe-elements>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" class="text-capitalize" block
                    >Book (&#8369; 999.999)</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { StripeElements } from "vue-stripe-checkout";
import CommonUtilities from "@/common/utilities";
import ItineraryPostDetailsPageDatePicker from "@/components/itinerary-post-details-page/DatePicker";

export default {
  components: { ItineraryPostDetailsPageDatePicker, StripeElements },
  data() {
    return {
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      amount: 1000,
      token: null,
      charge: null,
    };
  },
  mixins: [CommonUtilities],
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description, // optional description that will show up on stripe when looking at payments
      };
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer(charge) {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
    },
  },
};
</script>
