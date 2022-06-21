<template>
  <div style="height:auto;">
    <v-sheet
      class="d-flex justify-center align-center"
      color="transparent"
      :height="screenHieight"
    >
      <div class="not-found-text white--text ma-auto">
        <div class="ma-auto">
          มีบางอย่างผิดพลาด {{textError}}
        </div>
        <div class="ma-auto">
          กรุณาสแกน QRcode ใหม่
        </div>
      </div>
    </v-sheet>
  </div>
</template>
<script>
export default {
  asyncData({ params, query }) {
    return {
      textError: query.text ? String(query.text) : ""
    };
  },
  data() {
    return {
      screenHieight: window.innerHeight
    };
  }
};
</script>
<style lang="scss" scoped>
.not-found-text {
}
</style>
