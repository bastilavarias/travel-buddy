<template>
  <v-card :class="`${className}`" flat color="transparent" outlined>
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2 text-content">
        <div class="mr-2">
          <div class="caption mb-2">
            Sebastian Curtis T. Lavarias - 6 hrs ago
          </div>
          <div class="subtitle-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            obcaecati qui temporibus. Distinctio, eveniet illum non obcaecati
            quisquam repellendus ut.
          </div>
        </div>
        <v-avatar :size="40">
          <v-img
            src="https://bastilavarias.github.io/assets/img/sebastian-lavarias.5c3a8fdd.png"
          ></v-img>
        </v-avatar>
      </div>
    </div>
    <v-card-actions>
      <v-btn depressed text @click="shouldShowReplyField = true">
        <v-icon class="mr-1">mdi-reply-outline</v-icon>
        <span class="caption font-weight-bold">3</span>
      </v-btn>
    </v-card-actions>

    <div class="pl-10 pr-3 pt-3">
      <v-row dense>
        <v-col cols="12" v-if="shouldShowReplyField">
          <v-card outlined tile>
            <div class="px-4 pt-3">
              <span class="caption"
                >Type your reply as Sebastian Curtis T. Lavarias</span
              >
            </div>
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-textarea
                    label="Type your reply here"
                    single-line
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
          <span
            class="subtitle-2 cursor-pointer"
            @click="shouldShowReplies = !shouldShowReplies"
          >
            {{ shouldShowReplies ? "Hide Replies" : "Show Replies" }}
            <v-icon color="secondary">
              {{ shouldShowReplies ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </span>
        </v-col>
        <v-col cols="12" v-if="shouldShowReplies">
          <slot></slot>
        </v-col>
        <v-col cols="12" v-if="shouldShowReplies">
          <span class="subtitle-2 cursor-pointer">
            <span>Show more replies</span>
            <v-icon color="secondary"> </v-icon>
          </span>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
export default {
  name: "itinerary-post-details-inquiry-list-item",

  props: {
    className: {
      type: String,
      required: false,
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
