<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>Edit Account</v-card-title>
        <v-tabs v-model="tab">
          <template v-for="(tab, index) in tabs">
            <v-tab :key="index" class="text-capitalize">{{ tab }}</v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" v-if="accountForm.imageUrl">
                  <div class="text-center">
                    <v-avatar :size="150">
                      <v-img
                        :src="accountForm.imageUrl"
                        :lazy-src="accountForm.imageUrl"
                      ></v-img>
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
                    v-model="accountForm.firstName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    outlined
                    label="Last Name *"
                    v-model="accountForm.lastName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    outlined
                    label="Nationality"
                    item-text="label"
                    item-value="name"
                    :items="genericNationalities"
                    v-model="accountForm.nationality"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="10">
                  <custom-date-picker
                    :date.sync="accountForm.birthDate"
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
                    v-model="accountForm.sex"
                  ></v-select>
                </v-col>
                <v-col cols="12" v-if="accountForm.imageUrl">
                  <custom-image-input
                    :multiple="false"
                    label="New Image"
                    :images.sync="accountForm.images"
                  ></custom-image-input>
                </v-col>
                <v-col cols="12" v-if="!accountForm.imageUrl">
                  <custom-image-input
                    :multiple="false"
                    label="Image"
                    :images.sync="accountForm.images"
                  ></custom-image-input>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                block
                :disabled="!isAccountFormValid"
                :loading="isUpdateAccountStart"
                @click="updateAccount"
                >Update</v-btn
              >
            </v-card-actions>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    label="Email"
                    disabled
                    v-model="credentialsForm.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <custom-password-text-field
                    label="New Password"
                    outlined
                    :password.sync="credentialsForm.password"
                  ></custom-password-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <custom-password-text-field
                    label="Confirm New Password"
                    outlined
                    :password.sync="credentialsForm.confirmPassword"
                  ></custom-password-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                block
                :disabled="!isCredentialsFormValid"
                :loading="isUpdatePasswordStart"
                @click="updatePassword"
                >Update</v-btn
              >
            </v-card-actions>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import {
  FETCH_GENERIC_NATIONALITIES,
  FETCH_GENERIC_SEXES,
} from "@/store/types/generic";
import CustomDatePicker from "@/components/custom/DatePicker";
import CustomImageInput from "@/components/custom/ImageInput";
import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_PASSWORD,
} from "@/store/types/account";
import commonValidation from "@/common/validation";
import CustomPasswordTextField from "@/components/custom/PasswordTextField";

const defaultAccountForm = {
  firstName: null,
  nationality: "filipino",
  lastName: null,
  email: null,
  birthDate: null,
  sex: null,
  typeID: null,
  images: null,
  imageUrl: null,
};

const defaultCredentialsForm = {
  email: null,
  password: null,
  confirmPassword: null,
};

export default {
  components: { CustomPasswordTextField, CustomImageInput, CustomDatePicker },

  data() {
    return {
      tabs: ["Information", "Credentials"],
      tab: null,
      accountForm: Object.assign({}, defaultAccountForm),
      defaultAccountForm,
      credentialsForm: Object.assign({}, defaultCredentialsForm),
      isUpdateAccountStart: false,
      isUpdatePasswordStart: false,
    };
  },

  mixins: [commonValidation],

  computed: {
    genericSexes() {
      return this.$store.state.generic.sexes;
    },

    genericNationalities() {
      return this.$store.state.generic.nationalities;
    },

    isAccountFormValid() {
      const {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
      } = this.accountForm;
      return firstName && lastName && nationality && birthDate && sex;
    },

    isCredentialsFormValid() {
      const { password, confirmPassword } = this.credentialsForm;
      return password && password === confirmPassword;
    },
  },

  methods: {
    async getInformation() {
      const id = this.$store.state.authentication.credentials.id;
      const result = await this.$store.dispatch(GET_ACCOUNT, id);
      this.accountForm = Object.assign(
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
      this.credentialsForm = Object.assign(
        {},
        {
          email: result.email,
        }
      );
    },

    async updateAccount() {
      const {
        firstName,
        lastName,
        nationality,
        birthDate,
        sex,
        email,
        typeID,
        images,
      } = this.accountForm;
      const payload = {
        accountID: this.$store.state.authentication.credentials.id,
        firstName: firstName || null,
        lastName: lastName || null,
        nationality: nationality || null,
        email: email || null,
        birthDate: birthDate || null,
        sex: sex || null,
        images: images || [],
        typeID: typeID || null,
      };
      this.isUpdateAccountStart = true;
      const { account } = await this.$store.dispatch(UPDATE_ACCOUNT, payload);
      this.isUpdateAccountStart = false;
      const isValid = this.validateObject(account);
      if (isValid) {
        this.accountForm = Object.assign(this.accountForm, {
          imageUrl: account.profile.image.url,
          images: [],
        });
      }
    },

    async updatePassword() {
      const { password } = this.credentialsForm;
      const payload = {
        accountID: this.$store.state.authentication.credentials.id,
        password,
      };
      this.isUpdatePasswordStart = true;
      const { account } = await this.$store.dispatch(
        UPDATE_ACCOUNT_PASSWORD,
        payload
      );
      this.isUpdatePasswordStart = false;
      const isValid = this.validateObject(account);
      if (isValid) {
        this.credentialsForm = Object.assign(this.credentialsForm, {
          password: null,
          confirmPassword: null,
        });
      }
    },
  },

  async created() {
    await this.$store.dispatch(FETCH_GENERIC_NATIONALITIES);
    await this.$store.dispatch(FETCH_GENERIC_SEXES);
    await this.getInformation();
  },
};
</script>
