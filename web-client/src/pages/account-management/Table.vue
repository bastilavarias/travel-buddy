<template>
  <section>
    <v-container>
      <v-card outlined>
        <v-card-title>
          <span class="font-weight-bold">Account List</span>
          <div class="flex-grow-1"></div>
          <custom-tooltip-button
            icon="mdi-plus"
            text="Create new Account"
            :to="{ name: 'account-management-page/form' }"
          ></custom-tooltip-button>
        </v-card-title>
        <v-data-table
          :headers="accountTableHeaders"
          :items="searchedAccounts"
          :loading="isFetchAccountsStart"
        >
          <template v-slot:top>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="10">
                  <v-text-field
                    hide-details
                    label="Search"
                    outlined
                    v-model="search"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn color="secondary" block x-large>
                    <span class="text-capitalize mr-1">Search</span>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </template>
          <template v-slot:item.image="{ item }">
            <v-avatar :size="25" color="secondary" class="mr-1">
              <v-img
                :src="item.profile.image.url"
                :lazy-src="item.profile.image.url"
              ></v-img>
            </v-avatar>
          </template>
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize">
              {{ formatName(item.profile.firstName, item.profile.lastName) }}
            </span>
          </template>
          <template v-slot:item.type="{ item }">
            <span class="text-capitalize">
              {{ item.type.label }}
            </span>
          </template>
          <template v-slot:item.isActive="{ item }">
            <generic-account-status-chip
              :is-active="item.isActive"
            ></generic-account-status-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <custom-tooltip-button
              icon="mdi-stop"
              text="Disable Account"
              :action="() => openDisableAccountAlertDialog(item)"
              v-if="item.isActive"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-play"
              text="Enable Account"
              :action="() => openEnableAccountAlertDialog(item)"
              v-if="!item.isActive"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-pencil-outline"
              text="Edit Account"
            ></custom-tooltip-button>
            <custom-tooltip-button
              icon="mdi-delete-outline"
              text="Delete Account"
            ></custom-tooltip-button>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <custom-alert-dialog
      :is-open.sync="isDisableAccountAlertDialogOpen"
      type="error"
      title="Disable Account"
      text="Are you sure you want to disable this account?"
      :loading="isDisableAccountStart"
      :action="() => disableAccount()"
    ></custom-alert-dialog>
    <custom-alert-dialog
      :is-open.sync="isEnableAccountAlertDialogOpen"
      type="success"
      title="Enable Account"
      text="Are you sure you want to enable this account?"
      :action="() => enableAccount()"
    ></custom-alert-dialog>
  </section>
</template>

<script>
import CustomTooltipButton from "@/components/custom/TooltipButton";
import GenericRatingChip from "@/components/generic/chip/Rating";
import GenericAccountStatusChip from "@/components/generic/chip/AccountStatus";
import {
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  FETCH_ACCOUNTS_DETAILS,
} from "@/store/types/account";
import commonUtilities from "@/common/utilities";
import CustomAlertDialog from "@/components/custom/AlertDialog";
export default {
  components: {
    CustomAlertDialog,
    GenericAccountStatusChip,
    GenericRatingChip,
    CustomTooltipButton,
  },
  mixins: [commonUtilities],
  data() {
    return {
      accountTableHeaders: [
        {
          text: "",
          value: "image",
          sortable: false,
          align: "left",
        },
        {
          text: "Name",
          value: "name",
          sortable: true,
        },
        {
          text: "Type",
          value: "type",
          sortable: false,
        },
        {
          text: "Status",
          value: "isActive",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
        },
      ],
      accounts: [],
      isFetchAccountsStart: false,
      search: "",
      isDisableAccountAlertDialogOpen: false,
      isEnableAccountAlertDialogOpen: false,
      selectedAccount: {},
      isDisableAccountStart: false,
      isEnableAccountStart: false,
    };
  },

  computed: {
    searchedAccounts() {
      if (this.search === "") return this.accounts;
      return this.accounts.filter((account) => {
        const { firstName, lastName } = account.profile;
        const keyword = this.search.toLowerCase();
        if (firstName.toLowerCase().includes(keyword)) return account;
        if (lastName.toLowerCase().includes(keyword)) return account;
      });
    },
  },

  methods: {
    async fetchAccounts() {
      this.isFetchAccountsStart = true;
      this.accounts = await this.$store.dispatch(FETCH_ACCOUNTS_DETAILS);
      this.isFetchAccountsStart = false;
    },
    async openDisableAccountAlertDialog(account) {
      this.isDisableAccountAlertDialogOpen = true;
      this.selectedAccount = account;
    },
    async openEnableAccountAlertDialog(account) {
      this.isEnableAccountAlertDialogOpen = true;
      this.selectedAccount = account;
    },
    async disableAccount() {
      this.isDisableAccountStart = true;
      const isDisabled = await this.$store.dispatch(
        DISABLE_ACCOUNT,
        this.selectedAccount.id
      );
      this.isDisableAccountStart = false;
      if (isDisabled) {
        this.accounts = this.accounts.map((account) => {
          if (account.id === this.selectedAccount.id) {
            account.isActive = false;
          }
          return account;
        });
        this.selectedAccount = {};
        this.isDisableAccountAlertDialogOpen = false;
      }
    },
    async enableAccount() {
      this.isEnableAccountStart = true;
      const isEnabled = await this.$store.dispatch(
        ENABLE_ACCOUNT,
        this.selectedAccount.id
      );
      this.isEnableAccountStart = false;
      if (isEnabled) {
        this.accounts = this.accounts.map((account) => {
          if (account.id === this.selectedAccount.id) {
            account.isActive = true;
          }
          return account;
        });
        this.selectedAccount = {};
        this.isEnableAccountAlertDialogOpen = false;
      }
    },
  },

  async created() {
    await this.fetchAccounts();
  },
};
</script>
