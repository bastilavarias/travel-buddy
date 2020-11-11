<template>
  <section>
    <v-container>
      <v-row v-if="isGetPostDetailsStart">
        <v-col cols="12" md="8">
          <v-row dense>
            <v-col cols="12">
              <v-skeleton-loader
                type="card, article, actions"
              ></v-skeleton-loader>
            </v-col>
            <v-col cols="12">
              <v-skeleton-loader type="card"></v-skeleton-loader>
              <v-skeleton-loader
                type="card, article, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
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
              <span> Checkout Details </span>
            </v-card-title>
            <v-card-subtitle>Additional Details</v-card-subtitle>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="transactionNumber"
                    readonly
                    label="Transaction Number"
                    outlined
                    :loading="isGetTransactionNumberStart"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" :md="form.fromDate ? '6' : '12'">
                  <custom-date-picker
                    :date.sync="form.fromDate"
                    outlined
                    :label="form.fromDate ? 'From Date *' : 'Date *'"
                    clearable
                  ></custom-date-picker>
                </v-col>
                <v-col cols="12" md="6" v-if="form.fromDate">
                  <v-text-field
                    label="To Date *"
                    outlined
                    readonly
                    :value="formattedToDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :placeholder="
                      availableTourGuidesAutocompleteLabel
                        ? availableTourGuidesAutocompleteLabel
                        : ''
                    "
                    label="Tour Guide *"
                    outlined
                    :hint="
                      !form.fromDate ? 'Please select the date first.' : ''
                    "
                    :persistent-hint="!form.fromDate"
                    :disabled="!form.fromDate"
                    :items="availableTourGuides"
                    :error="tourGuidesAutocompleteError.error"
                    :messages="tourGuidesAutocompleteError.message"
                    :loading="isFetchAvailableTourGuidesStart"
                    clearable
                    item-value="id"
                    item-text="profile.lastName"
                    v-model="form.tourGuideID"
                  >
                    <template v-slot:selection="{ item }">
                      <span class="text-capitalize">{{
                        formatName(
                          item.profile.firstName,
                          item.profile.lastName
                        )
                      }}</span>
                    </template>
                    <template v-slot:item="{ item }">
                      <v-list-item-avatar :size="50">
                        <v-img
                          :src="item.profile.image.url"
                          :lazy-src="item.profile.image.url"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          ><span class="text-capitalize">
                            {{
                              formatName(
                                item.profile.firstName,
                                item.profile.lastName
                              )
                            }}
                          </span>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip small class="mr-1">
                            <v-icon color="primary" small left>mdi-star</v-icon>
                            <span class="primary--text">5.0</span>
                          </v-chip>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-subtitle> Payment Details </v-card-subtitle>
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
                <v-col cols="12">
                  <v-checkbox v-model="hasAcceptedTermsCondition">
                    <template v-slot:label>
                      I agree and accept the
                      <span
                        class="ml-1 text-decoration-underline"
                        @click="isTermsConditionDialogOpen = true"
                      >
                        terms and conditions</span
                      >. *
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                block
                large
                @click="submit"
                :disabled="!isFormValid"
                :loading="isTransactionCheckoutStart"
                >Confirm Transaction ({{ formatMoney(amount) }})</v-btn
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
    <checkout-page-terms-condition-dialog
      :is-open.sync="isTermsConditionDialogOpen"
    ></checkout-page-terms-condition-dialog>
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
import {
  FETCH_TRANSACTION_AVAILABLE_TOUR_GUIDES,
  GET_TRANSACTION_NUMBER,
  TRANSACTION_CHECKOUT,
} from "@/store/types/transaction";
import CustomLabelAndContent from "@/components/custom/LabelAndContent";
import CheckoutPageTermsConditionDialog from "@/components/checkout-page/TermsConditionDialog";

const defaultCheckoutForm = {
  fromDate: null,
  toDate: null,
  tourGuideID: null,
};

export default {
  components: {
    CheckoutPageTermsConditionDialog,
    CustomLabelAndContent,
    GenericRatingChip,
    CustomDatePicker,
    ItineraryPostDetailsPageDatePicker,
    StripeElements,
  },
  data() {
    return {
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      amount: 0,
      token: null,
      charge: null,
      form: Object.assign({}, defaultCheckoutForm),
      defaultCheckoutForm,
      height: 0,
      isGetPostDetailsStart: false,
      postDetails: {},
      transactionNumber: "",
      isGetTransactionNumberStart: false,
      formattedToDate: "",
      hasNoAvailableTourGuides: false,
      availableTourGuides: [],
      isFetchAvailableTourGuidesStart: false,
      availableTourGuidesAutocompleteLabel: "",
      isTermsConditionDialogOpen: false,
      hasAcceptedTermsCondition: false,
      isTransactionCheckoutStart: false,
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
    tourGuidesAutocompleteError() {
      const { fromDate } = this.form;
      const formattedFromDate = moment(fromDate).format("ll");
      return this.availableTourGuides.length === 0 &&
        this.hasNoAvailableTourGuides
        ? {
            error: true,
            message: `No available tour guides in your selected date (${formattedFromDate} - ${this.formattedToDate})`,
          }
        : {
            error: false,
            message: "",
          };
    },
    isFormValid() {
      const { fromDate, toDate, tourGuideID } = this.form;
      return (
        fromDate && toDate && tourGuideID && this.hasAcceptedTermsCondition
      );
    },
  },
  watch: {
    postDetails(val) {
      if (this.validateObject(val) && !this.isGetPostDetailsStart) {
        this.$nextTick(() => {
          this.matchHeight();
          const { price } = val;
          this.amount = price;
        });
      }
    },
    "form.fromDate"(val) {
      if (val) {
        const daysCount = this.postDetails.days.map((item) => item.day).length;
        const addedDate = moment(val).add(daysCount, "days");
        this.form.toDate = moment(addedDate).format("YYYY-MM-DD");
        return (this.formattedToDate = moment(addedDate).format("ll"));
      }
      if (val === null) {
        this.availableTourGuidesAutocompleteLabel = "";
        this.availableTourGuides = [];
        this.form.fromDate = null;
        this.form.toDate = null;
        this.form.tourGuideID = null;
      }
    },
    async "form.toDate"(val) {
      if (val) {
        await this.fetchAvailableTourGuides();
      }
    },
  },
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      this.token = token;
      this.charge = {
        source: token.id,
        amount: this.amount,
        description: this.postDetails.name,
      };
      this.sendTokenToServer(this.charge);
    },
    async sendTokenToServer({ source, amount }) {
      const payload = {
        fromDate: this.form.fromDate,
        toDate: this.form.toDate,
        postID: this.postDetails.id,
        clientID: this.credentials.id,
        tourGuideID: this.form.tourGuideID,
        payment: {
          token: source,
          amount,
        },
      };
      this.isTransactionCheckoutStart = true;
      const checkoutResult = await this.$store.dispatch(
        TRANSACTION_CHECKOUT,
        payload
      );
      this.isTransactionCheckoutStart = false;
      console.log(checkoutResult);
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
    async getTransactionNumber() {
      this.isGetTransactionNumberStart = true;
      this.transactionNumber = await this.$store.dispatch(
        GET_TRANSACTION_NUMBER
      );
      this.isGetTransactionNumberStart = false;
    },
    async fetchAvailableTourGuides() {
      this.isFetchAvailableTourGuidesStart = true;
      const { fromDate, toDate } = this.form;
      const payload = { fromDate, toDate };
      const fetchedTourGuides = await this.$store.dispatch(
        FETCH_TRANSACTION_AVAILABLE_TOUR_GUIDES,
        payload
      );
      this.isFetchAvailableTourGuidesStart = false;
      if (fetchedTourGuides.length === 0)
        return (this.hasNoAvailableTourGuides = true);
      this.availableTourGuides = fetchedTourGuides;
      const tourGuidesCount = fetchedTourGuides.length;
      this.availableTourGuidesAutocompleteLabel = `${tourGuidesCount} Tour Guides Available`;
    },
  },
  async created() {
    this.scrollToTop();
    await this.getPostDetails();
    await this.getTransactionNumber();
  },
};
</script>

<style scoped>
.custom-border {
  border-top: 0.3rem solid #ff7557;
}
</style>
