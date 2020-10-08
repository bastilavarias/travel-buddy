<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="px-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2 text-content">
          <div class="px-4 py-3">
            <div class="caption mb-2">Cardo Dalisay - 6 hrs ago</div>
            <div class="subtitle-2 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              obcaecati qui temporibus. Distinctio, eveniet illum non obcaecati
              quisquam repellendus ut.
            </div>
          </div>
        </div>
        <v-avatar :size="40">
          <v-img
            src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
            lazy-src="https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"
          ></v-img>
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
          <slot></slot>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
export default {
  name: "itinerary-post-details-inquiry-media",

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
