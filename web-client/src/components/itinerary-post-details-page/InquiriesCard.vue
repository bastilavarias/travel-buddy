<template>
  <v-card outlined>
    <v-card-title>
      <span class="subtitle-2"> Inquiries </span>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="isDialogOpen = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text
      class="text-center py-15"
      v-if="!isGetInquiriesStart && inquiries.length === 0"
    >
      No inquiries yet.
    </v-card-text>
    <v-card-text>
      <template v-for="(inquiry, index) in inquiries">
        <itinerary-post-details-inquiry-media
          :key="index"
          :inquiryID="inquiry.id"
          :profile="inquiry.author.profile"
          :created-at="inquiry.createdAt"
          :message="inquiry.message"
          :replies.sync="inquiry.replies"
          class-name="py-3"
        >
          <template v-for="(reply, index) in inquiry.replies">
            <itinerary-post-details-inquiry-reply-media
              :key="index"
              :replyID="reply.id"
              :profile="reply.author.profile"
              :created-at="reply.createdAt"
              :message="reply.message"
            ></itinerary-post-details-inquiry-reply-media>
          </template>
        </itinerary-post-details-inquiry-media>
        <v-divider v-if="index !== inquiries.length - 1"></v-divider>
      </template>
    </v-card-text>
    <div class="text-center py-15" v-if="isGetInquiriesStart">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        color="secondary"
        class="text-capitalize"
        :loading="isCreateInquiryStart"
        @click="getInquiries"
        :disabled="isGetInquiriesStart"
        v-if="showMoreButton"
        >See More</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="isDialogOpen" width="500">
      <v-card>
        <v-card-title>
          <span class="subtitle-2">Write your Inquiry</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="isDialogOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea
            outlined
            label="Inquiry"
            v-model="message"
            clearable
            @click:clear="message = null"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="secondary"
            block
            class="text-capitalize"
            :disabled="!isFormValid"
            @click="createInquiry"
            :loading="isCreateInquiryStart"
            >Ask</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import ItineraryPostDetailsInquiryMedia from "@/components/generic/media/ItineraryPostDetailsInquiry";
import ItineraryPostDetailsInquiryReplyMedia from "@/components/generic/media/ItineraryPostDetailsInquiryReply";
import {
  CREATE_ITINERARY_INQUIRY,
  GET_ITINERARY_INQUIRIES,
} from "@/store/types/itinerary";
export default {
  name: "itinerary-post-details-page-inquiries-card",
  components: {
    ItineraryPostDetailsInquiryReplyMedia,
    ItineraryPostDetailsInquiryMedia,
  },
  data() {
    return {
      isDialogOpen: false,
      isCreateInquiryStart: false,
      message: null,
      skip: 0,
      inquiries: [],
      showMoreButton: true,
      isGetInquiriesStart: false,
    };
  },

  computed: {
    isFormValid() {
      return this.message !== null;
    },

    postID() {
      return this.$route.params.postID;
    },
  },

  methods: {
    async createInquiry() {
      this.isCreateInquiryStart = true;
      const payload = {
        postID: parseInt(this.postID),
        accountID: this.$store.state.authentication.credentials.id,
        message: this.message,
      };
      const { success, data } = await this.$store.dispatch(
        CREATE_ITINERARY_INQUIRY,
        payload
      );
      if (success) {
        this.inquiries = [data, ...this.inquiries];
        this.message = null;
        this.isCreateInquiryStart = false;
        this.isDialogOpen = false;
        return;
      }
      this.isCreateInquiryStart = false;
    },

    async getInquiries() {
      this.isGetInquiriesStart = true;
      const payload = {
        postID: parseInt(this.postID),
        skip: this.skip,
      };
      const inquiries = await this.$store.dispatch(
        GET_ITINERARY_INQUIRIES,
        payload
      );
      if (inquiries.length === 5) {
        this.inquiries = [...this.inquiries, ...inquiries];
        this.skip += 5;
        this.isGetInquiriesStart = false;
        return;
      }
      this.inquiries = [...this.inquiries, ...inquiries];
      this.showMoreButton = false;
      this.isGetInquiriesStart = false;
    },
  },

  async created() {
    await this.getInquiries();
  },
};
</script>
