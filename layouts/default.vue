<template>
  <v-app>
    <v-main>
      <v-fade-transition>
        <nuxt />
      </v-fade-transition>
    </v-main>

  </v-app>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: true
    };
  },
  computed: {
  },
  async mounted() {
    //  await this.getProfileDetail();
  },
  methods: {
  }
};
</script>
