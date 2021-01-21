<template>
  <v-card outlined>
    <v-card-title>
      <span class="subtitle-2"> Inquiries </span>
      <div class="flex-grow-1"></div>
      <v-btn icon @click="isDialogOpen = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <template v-for="n in [1, 2, 3]">
        <itinerary-post-details-inquiry-media :key="n" class-name="mb-10">
          <template v-for="n2 in [4]">
            <itinerary-post-details-inquiry-reply-media
              :key="n2"
            ></itinerary-post-details-inquiry-reply-media>
          </template>
        </itinerary-post-details-inquiry-media>
      </template>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn color="secondary" class="text-capitalize">See All</v-btn>
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
import { CREATE_ITINERARY_INQUIRY } from "@/store/types/itinerary";
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
    };
  },

  computed: {
    isFormValid() {
      return this.message !== null;
    },
  },

  methods: {
    async createInquiry() {
      this.isCreateInquiryStart = true;
      const payload = {
        postID: parseInt(this.$route.params.postID),
        accountID: this.$store.state.authentication.credentials.id,
        message: this.message,
      };
      const { success, data } = await this.$store.dispatch(
        CREATE_ITINERARY_INQUIRY,
        payload
      );
      if (success) {
        console.log(data);
        this.message = null;
        this.isCreateInquiryStart = false;
        return;
      }
      this.isCreateInquiryStart = false;
    },
  },
};
</script>
