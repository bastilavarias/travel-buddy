<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2 text-content flex-grow-1">
          <div class="px-4 py-3">
            <div class="caption mb-2">
              <div class="mb-3">
                <span class="text-capitalize">
                  Asked by {{ formatName(profile.firstName, profile.lastName) }}
                </span>
                <span> - {{ formatDateFromNow(createdAt) }} </span>
              </div>
              <div
                class="subtitle-2 text-justify"
                :style="{ wordBreak: 'break-all' }"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
        <v-avatar :size="40">
          <v-img :src="profile.image.url" :lazy-src="profile.image.url"></v-img>
        </v-avatar>
      </div>
    </div>
    <v-card-actions>
      <v-btn
        depressed
        text
        @click="shouldShowReplies = true"
        v-if="!shouldShowReplies && repliesLocal.length > 0"
      >
        <v-icon class="mr-1">mdi-chevron-down</v-icon>
        <span class="text-capitalize">
          Show Replies (<span class="caption font-weight-bold">{{
            repliesLocal.length
          }}</span
          >)
        </span>
      </v-btn>
      <v-btn
        depressed
        text
        @click="shouldShowReplies = false"
        v-if="shouldShowReplies && repliesLocal.length > 0"
      >
        <v-icon class="mr-1">mdi-chevron-up</v-icon>
        <span class="text-capitalize"> Hide Replies </span>
      </v-btn>
    </v-card-actions>
    <div class="pl-10 pr-3 pt-3">
      <v-row dense>
        <v-col cols="12" v-if="shouldShowReplies">
          <slot></slot>
        </v-col>
        <v-col cols="12" v-if="!shouldShowReplyField">
          <div class="d-flex">
            <div class="flex-grow-1"></div>
            <v-btn icon @click="shouldShowReplyField = true">
              <v-icon>mdi-reply</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" v-if="shouldShowReplyField">
          <v-card outlined tile>
            <div class="px-4 pt-3">
              <span class="caption text-capitalize"
                >Type your reply as {{ displayName }}</span
              >
            </div>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-textarea
                    label="Type your reply here"
                    outlined
                    v-model="replyMessage"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <div class="d-flex align-center justify-space-between">
                    <div class="flex-grow-1"></div>
                    <v-btn
                      color="secondary"
                      text
                      class="text-capitalize mr-2"
                      @click="shouldShowReplyField = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="secondary"
                      @click="sendReply"
                      :disabled="!isFormValid"
                      >Reply</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
import utilities from "@/common/utilities";
import { CREATE_ITINERARY_INQUIRY_REPLY } from "@/store/types/itinerary";
export default {
  name: "itinerary-post-details-inquiry-media",

  mixins: [utilities],

  props: {
    className: {
      type: String,
      required: false,
    },

    inquiryID: {
      type: Number,
      required: true,
    },

    profile: {
      type: Object,
      required: true,
    },

    createdAt: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    replies: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      shouldShowReplyField: false,
      shouldShowReplies: false,
      repliesLocal: this.replies,
      replyMessage: null,
    };
  },

  computed: {
    credentials() {
      return this.$store.state.authentication.credentials || null;
    },

    displayName() {
      if (this.credentials) {
        const { firstName, lastName } = this.credentials.profile;
        return this.formatName(firstName, lastName);
      }
      return null;
    },

    isFormValid() {
      return !!this.replyMessage;
    },
  },

  watch: {
    replies(value) {
      this.repliesLocal = value;
    },

    repliesLocal(value) {
      this.$emit("update:replies", value);
    },
  },

  methods: {
    async sendReply() {
      const payload = {
        inquiryID: this.inquiryID,
        message: this.replyMessage,
        accountID: this.credentials.id,
      };
      const { success, data } = await this.$store.dispatch(
        CREATE_ITINERARY_INQUIRY_REPLY,
        payload
      );
      if (success) {
        this.repliesLocal = [...this.repliesLocal, data];
        this.shouldShowReplies = true;
        this.shouldShowReplyField = false;
        this.replyMessage = null;
        this.$nextTick(() => {
          this.$vuetify.goTo(`#inquiry-reply-media-${data.id}`, {
            offset: 100,
          });
        });
      }
    },
  },
};
</script>
