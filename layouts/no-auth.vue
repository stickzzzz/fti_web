<template>
  <v-app>
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>
   

    <v-snackbar
      :value="snackbar"
      vertical
      top
      :timeout="snackbarDuration"
      color="rgba(255, 255, 255, 0.75)"
    >
      <div v-html="snackbarText"></div>
      <v-btn
        v-if="snackbarDuration === 0"
        small
        text
        @click="$store.dispatch('closeSnackbar')"
      >Close</v-btn>
    </v-snackbar>

    <!-- <v-footer fixed color="white">
      <div class="mx-auto caption">WISEROOM by Wisdom Vast Co., Ltd Reserved © {{year}}</div>
    </v-footer>-->
  </v-app>
</template>
<script>
import { mapState, mapGetters } from "vuex";
// import backgroundImg from "@/assets/images/bg.png";

export default {
  name: "NoAuthLayout",
  data() {
    return {
    //   backgroundImg,
      year: new Date().getFullYear()
    };
  },
  computed: {
    ...mapState(["snackbar", "snackbarDuration", "snackbarText", "isLoggedIn"])
  }
};
</script>