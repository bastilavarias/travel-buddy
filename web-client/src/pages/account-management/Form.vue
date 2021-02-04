<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span>
            <custom-tooltip-button
              icon="mdi-chevron-left"
              text="Back to Itinerary List"
              :action="goBack"
            ></custom-tooltip-button>
            Create Account
          </span>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" v-if="form.imageUrl">
              <div class="text-center">
                <v-avatar :size="150">
                  <v-img :src="form.imageUrl" :lazy-src="form.imageUrl"></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="12">
              <span class="subtitle-1">Personal Information</span>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                label="First Name *"
                v-model="form.firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                label="Last Name *"
                v-model="form.lastName"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                outlined
                label="Nationality"
                item-text="label"
                item-value="name"
                :items="genericNationalities"
                v-model="form.nationality"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="10">
              <custom-date-picker
                :date.sync="form.birthDate"
                outlined
                label="Birth Date"
              ></custom-date-picker>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                outlined
                label="Sex"
                item-text="label"
                item-value="name"
                :items="genericSexes"
                v-model="form.sex"
              ></v-select>
            </v-col>
            <v-col cols="12" v-if="form.imageUrl">
              <custom-image-input
                :multiple="false"
                label="New Image"
                :images.sync="form.images"
              ></custom-image-input>
            </v-col>
            <v-col cols="12" v-if="!form.imageUrl">
              <custom-image-input
                :multiple="false"
                label="Image"
                :images.sync="form.images"
              ></custom-image-input>
            </v-col>
            <v-col cols="12">
              <span class="subtitle-1">Sign In Credentials</span>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field
                outlined
                label="Email *"
                v-model="form.email"
                :error="!!createAccountError.email"
                :error-messages="createAccountError.email"
                :disabled="operation === 'update'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                outlined
                label="Account Type *"
                item-text="label"
                item-value="id"
                :items="accountTypes"
                v-model="form.typeID"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <h1 class="subtitle-2">Note</h1>
              <span class="body-2"
                >Default password will be the combination of last name and birth
                date. Eg; <strong>FIRSTNAME_LASTNAME</strong></span
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :loading="isCreateAccountStart"
            block
            @click="createNewAccount"
            :disabled="!isFormValid"
            v-if="operation === 'create'"
            >Create</v-btn
          >
          <v-btn
            color="primary"
            :loading="isUpdateAccountStart"
            block
            @click="updateAccount"
            v-if="operation === 'update'"
            :disabled="!isFormValid"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import commonUtilities from "@/common/utilities";
import AccountManagementPageBirthDatePicker from "@/components/account-management-page/BirthDateDatePicker";
import CustomImageInput from "@/components/custom/ImageInput";
import {
  FETCH_GENERIC_NATIONALITIES,
  FETCH_GENERIC_SEXES,
} from "@/store/types/generic";
import {
  CREATE_NEW_ACCOUNT,
  FETCH_ACCOUNT_TYPES,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
} from "@/store/types/account";
import CustomDatePicker from "@/components/custom/DatePicker";
import commonValidation from "@/common/validation";

const defaultAccountForm = {
  firstName: "",
  nationality: "filipino",
  lastName: "",
  email: "",
  birthDate: "",
  sex: "",
  typeID: null,
  images: null,
  imageUrl: null,
};

export default {
  components: {
    CustomDatePicker,
    CustomImageInput,
    AccountManagementPageBirthDatePicker,
    CustomTooltipButton,
  },

  data() {
    return {
      form: Object.assign({}, defaultAccountForm),
      defaultAccountForm,
      isCreateAccountStart: false,
      isUpdateAccountStart: false,
      createAccountError: {
        email: "",
      },
      operation: null,
      currentAccountID: null,
    };
  },

  mixins: [commonUtilities, commonValidation],

  computed: {
    genericSexes() {
      return this.$store.state.generic.sexes;
    },

    genericNationalities() {
      return this.$store.state.generic.nationalities;
    },

    accountTypes() {
      return this.$store.state.account.types;
    },

    isFormValid() {
      const {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
      } = this.form;
      return (
        firstName &&
        lastName &&
        nationality &&
        birthDate &&
        sex &&
        email &&
        typeID
      );
    },
  },

  methods: {
    async createNewAccount() {
      this.isCreateAccountStart = true;
      const {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
        images,
      } = this.form;
      const payload = {
        firstName: firstName || "",
        lastName: lastName || "",
        nationality: nationality || "",
        email: email || "",
        birthDate: birthDate || "",
        sex: sex || "",
        images: images || [],
        typeID: typeID || null,
      };
      const { account, error } = await this.$store.dispatch(
        CREATE_NEW_ACCOUNT,
        payload
      );
      this.isCreateAccountStart = false;
      const isCreatedNewAccountValid = this.validateObject(account);
      if (isCreatedNewAccountValid) {
        this.form = Object.assign({}, this.defaultAccountForm);
        this.createAccountError = { email: "" };
        return;
      }
      this.createAccountError = error;
    },

    async updateAccount() {
      this.isUpdateAccountStart = true;
      const {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
        images,
      } = this.form;
      const payload = {
        accountID: this.currentAccountID,
        firstName: firstName || "",
        lastName: lastName || "",
        nationality: nationality || "",
        email: email || "",
        birthDate: birthDate || "",
        sex: sex || "",
        images: images || [],
        typeID: typeID || null,
      };
      const { account } = await this.$store.dispatch(UPDATE_ACCOUNT, payload);
      this.isUpdateAccountStart = false;
      const isValid = this.validateObject(account);
      if (isValid) {
        await this.$router.push({ name: "account-management-page/table" });
      }
    },

    async getInformation() {
      const result = await this.$store.dispatch(
        GET_ACCOUNT,
        this.currentAccountID
      );
      this.form = Object.assign(
        {},
        {
          firstName: result.profile.firstName,
          nationality: result.profile.nationality,
          lastName: result.profile.lastName,
          email: result.email,
          birthDate: result.profile.birthDate,
          sex: result.profile.sex,
          typeID: result.type.id,
          images: null,
          imageUrl: result.profile.image.url,
        }
      );
    },
  },

  async created() {
    const { operation, id } = this.$route.params;
    const validPageCondition =
      operation ||
      ["create", "update"].includes(operation) ||
      (operation === "update" && id);
    if (!validPageCondition) this.$router.go(-1);
    this.operation = operation;
    this.currentAccountID = id;
    if (operation === "update" && id) await this.getInformation();
    await this.$store.dispatch(FETCH_GENERIC_NATIONALITIES);
    await this.$store.dispatch(FETCH_GENERIC_SEXES);
    await this.$store.dispatch(FETCH_ACCOUNT_TYPES);
  },
};
</script>
