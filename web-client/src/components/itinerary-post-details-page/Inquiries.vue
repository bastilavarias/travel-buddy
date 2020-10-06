<template>
  <v-card outlined>
    <v-card-title class="subtitle-2">Inquiries</v-card-title>
    <v-card-text>
      <template v-for="n in [1, 2, 3]">
        <itinerary-post-details-inquiry-list-item :key="n">
          <template v-for="n2 in [4, 5]">
            <itinerary-post-details-inquiry-reply-list-item
              :key="n2"
            ></itinerary-post-details-inquiry-reply-list-item>
            <v-divider v-if="n2 !== 5"></v-divider>
          </template>
        </itinerary-post-details-inquiry-list-item>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import ItineraryPostDetailsInquiryListItem from "@/components/generic/list-item/ItineraryPostDetailsInquiry";
import ItineraryPostDetailsInquiryReplyListItem from "@/components/generic/list-item/ItineraryPostDetailsInquiryReply";
export default {
  name: "itinerary-post-details-page-inquiries-card",
  components: {
    ItineraryPostDetailsInquiryReplyListItem,
    ItineraryPostDetailsInquiryListItem,
  },
};
</script>
