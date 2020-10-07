<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Inquiries</v-card-title>
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
  </v-card>
</template>

<script>
import ItineraryPostDetailsInquiryMedia from "@/components/generic/list-item/ItineraryPostDetailsInquiry";
import ItineraryPostDetailsInquiryReplyMedia from "@/components/generic/list-item/ItineraryPostDetailsInquiryReply";
export default {
  name: "itinerary-post-details-page-inquiries-card",
  components: {
    ItineraryPostDetailsInquiryReplyMedia,
    ItineraryPostDetailsInquiryMedia,
  },
};
</script>
