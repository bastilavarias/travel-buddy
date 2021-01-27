<template>
  <v-card
    :class="`${className}`"
    flat
    color="transparent"
    :id="`inquiry-reply-media-${replyID}`"
  >
    <div class="pl-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2 flex-grow-1">
          <div class="px-4 py-3">
            <div class="caption mb-2">
              <div class="mb-3">
                <span class="text-capitalize">
                  {{ formatName(profile.firstName, profile.lastName) }}
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
  </v-card>
</template>

<script>
import "@/style/global.css";
import commonUtilities from "@/common/utilities";
export default {
  name: "itinerary-post-details-inquiry-reply-media",

  mixins: [commonUtilities],

  props: {
    className: {
      type: String,
      required: false,
    },

    replyID: {
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
  },
};
</script>
