<template>
  <section>
    <v-container>
      <v-row v-if="isGetPostDetailsStart">
        <v-col cols="12" md="8">
          <v-skeleton-loader type="card, article, actions"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!isGetPostDetailsStart">
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title>
              <v-btn icon @click="goBack" class="mr-1">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span>Checkout Details</span>
            </v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    readonly
                    outlined
                    :value="formatName(profile.firstName, profile.lastName)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email Address"
                    readonly
                    outlined
                    :value="credentials.email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-title>Date & Tour Guide</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" :md="form.fromDate ? '6' : '12'">
                  <custom-date-picker
                    :date.sync="form.fromDate"
                    outlined
                    :label="form.fromDate ? 'From Date' : 'Date'"
                    clearable
                  ></custom-date-picker>
                </v-col>
                <v-col cols="12" md="6" v-if="form.fromDate">
                  <v-text-field
                    label="To Date"
                    outlined
                    readonly
                    :value="form.toDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    label="Tour Guide"
                    outlined
                    :hint="
                      !form.fromDate ? 'Please select the date first.' : ''
                    "
                    :persistent-hint="!form.fromDate"
                    :disabled="!form.fromDate"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-title> Payment Details </v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <stripe-elements
                    ref="elementsRef"
                    :pk="publishableKey"
                    :amount="postDetails.price"
                    locale="en"
                    @token="tokenCreated"
                    @loading="loading = $event"
                  >
                  </stripe-elements>
                </v-col>
                <v-col cols="12"> </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" block large @click="submit"
                >Confirm Checkout ({{ formatMoney(postDetails.price) }})</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" ref="postDetails">
          <div :style="{ position: 'relative', height: `${height}px` }">
            <div class="sticky-container">
              <v-card class="custom-border">
                <v-card-title>Itinerary Summary</v-card-title>
                <v-list-item three-line>
                  <v-list-item-avatar tile :size="75">
                    <v-img
                      :src="postDetails.images[0].url"
                      :lazy-src="postDetails.images[0].url"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      ><span class="font-weight-bold text-capitalize mr-1">
                        {{ postDetails.name }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle
                      ><span class="font-weight-bold text-capitalize">
                        {{ formatMoney(postDetails.price) }}
                      </span>
                      | <generic-rating-chip></generic-rating-chip
                      ><span class="caption">(99)</span>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      {{ formatItineraryDetails(postDetails.days) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { StripeElements } from "vue-stripe-checkout";
import commonUtilities from "@/common/utilities";
import ItineraryPostDetailsPageDatePicker from "@/components/itinerary-post-details-page/DatePicker";
import CustomDatePicker from "@/components/custom/DatePicker";
import { GET_ITINERARY_SOFT_DETAILS } from "@/store/types/itinerary";
import commonValidation from "@/common/validation";
import GenericRatingChip from "@/components/generic/chip/Rating";
import moment from "moment";

const defaultCheckoutForm = {
  fromDate: null,
  toDate: null,
};

export default {
  components: {
    GenericRatingChip,
    CustomDatePicker,
    ItineraryPostDetailsPageDatePicker,
    StripeElements,
  },
  data() {
    return {
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      amount: 1000,
      token: null,
      charge: null,
      form: Object.assign({}, defaultCheckoutForm),
      defaultCheckoutForm,
      height: 0,
      isGetPostDetailsStart: false,
      postDetails: {},
    };
  },
  mixins: [commonUtilities, commonValidation],
  computed: {
    credentials() {
      return this.$store.state.authentication.credentials;
    },
    profile() {
      return this.credentials.profile;
    },
  },
  watch: {
    postDetails(val) {
      if (this.validateObject(val) && !this.isGetPostDetailsStart) {
        this.$nextTick(() => {
          this.matchHeight();
        });
      }
    },
    "form.fromDate"(val) {
      if (val) {
        const addedDate = moment(val).add(1, "days");
        return (this.form.toDate = moment(addedDate).format("ll"));
      }
    },
  },
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
    matchHeight() {
      this.height = this.$refs.postDetails.clientHeight;
    },
    async getPostDetails() {
      this.isGetPostDetailsStart = true;
      const { postID } = this.$route.params;
      if (!postID) return this.goBack();
      const gotDetails = await this.$store.dispatch(
        GET_ITINERARY_SOFT_DETAILS,
        postID
      );
      if (!this.validateObject(gotDetails)) return this.goBack();
      this.isGetPostDetailsStart = false;
      this.postDetails = Object.assign({}, gotDetails);
    },
  },
  async created() {
    this.scrollToTop();
    await this.getPostDetails();
  },
};
</script>

<style scoped>
.custom-border {
  border-top: 0.3rem solid #ff7557;
}
</style>
