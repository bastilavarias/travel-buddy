<template>
  <footer class="secondary">
    <v-container>
      <div class="white--text">
        <div class="pt-2 text-center">
          <p class="caption">
            lorem ipsum dolor sit amet, consectetur adipisicing elit. eligendi,
            quisquam.
          </p>
        </div>
        <v-divider dark></v-divider>
        <div class="py-5">
          <div class="d-flex align-center justify-space-between">
            <v-list dark color="transparent">
              <v-subheader>company</v-subheader>
              <template v-for="n in 5">
                <v-list-item :key="n" class="subtitle-2"
                  >link {{ n }}</v-list-item
                >
              </template>
            </v-list>
            <v-list dark color="transparent">
              <v-subheader>resources</v-subheader>
              <template v-for="n in 5">
                <v-list-item :key="n" class="subtitle-2"
                  >link {{ n }}</v-list-item
                >
              </template>
            </v-list>
            <v-list dark color="transparent">
              <v-subheader>advertisement</v-subheader>
              <template v-for="n in 5">
                <v-list-item :key="n" class="subtitle-2"
                  >link {{ n }}</v-list-item
                >
              </template>
            </v-list>
          </div>
        </div>
        <v-divider dark></v-divider>
        <div class="py-3">
          <div class="d-flex align-content-center align-center">
            <span class="caption mr-5">follow us</span>
            <template v-for="n in 5">
              <v-btn x-small fab color="primary" :key="n" class="mr-2">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </template>
          </div>
        </div>
        <v-divider dark></v-divider>
        <div class="py-5 text-center">
          <span class="caption"> © 2020 Travel Buddy® </span>
        </div>
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: "generic-basic-footer",
};
</script>
