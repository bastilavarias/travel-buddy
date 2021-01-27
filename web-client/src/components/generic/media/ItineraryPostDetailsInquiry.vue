<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2 text-content flex-grow-1">
          <div class="px-4 py-3">
            <div class="caption mb-2">
              Asked by
              <span class="text-capitalize">{{
                formatName(profile.firstName, profile.lastName)
              }}</span>
              - {{ formatDateFromNow(createdAt) }}
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
      <v-btn depressed text @click="shouldShowReplyField = true">
        <v-icon class="mr-1">mdi-reply-outline</v-icon>
        <span class="caption font-weight-bold">1</span>
      </v-btn>
    </v-card-actions>
    <div class="pl-10 pr-3 pt-3">
      <v-row dense>
        <v-col cols="12" v-if="shouldShowReplyField">
          <v-card outlined tile>
            <div class="px-4 pt-3">
              <span class="caption">Type your reply as Cardo D.</span>
            </div>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-textarea
                    label="Type your reply here"
                    outlined
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
                    <v-btn color="secondary">Reply</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <slot></slot>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
import utilities from "@/common/utilities";
export default {
  name: "itinerary-post-details-inquiry-media",

  mixins: [utilities],

  props: {
    className: {
      type: String,
      required: false,
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
  },
  data() {
    return {
      shouldShowReplyField: false,
      shouldShowReplies: false,
    };
  },
};
</script>
