<template>
  <v-card :class="`${className}`" flat color="transparent">
    <div class="pl-4 pt-3">
      <div class="d-flex align-start justify-space-between mb-2">
        <div class="mr-2">
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
          ></v-img>
        </v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script>
import "@/style/global.css";
export default {
  name: "itinerary-post-details-inquiry-reply-media",

  props: {
    className: {
      type: String,
      required: false,
    },
  },
};
</script>
