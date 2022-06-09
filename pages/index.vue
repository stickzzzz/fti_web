<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">fti expo web Game</v-card-title>
        <v-card-text>
          <v-btn @click="$router.push(`/result/20`)">Next</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
  }
}
</script>
