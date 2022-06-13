<template>
  <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    :class="`text-capitalize ${$attrs.class ? $attrs.class : ''} ${
      highlight ? 'highlight' : ''
    }`"
  >
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot :name="name" v-bind="slotData"></slot>
    </template>
    <slot v-for="(_, name) in $slots" :name="name" :slot="name"></slot>
  </v-btn>
</template>
<script>
export default {
  name: "VCustomBtn",
  props: {
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //
    };
  },
  mounted() {
    // console.log("VCustomBtn mounted", this.$slots);
  },
};
</script>
<style lang="scss">
.v-btn.highlight {
  // border-width: 5px;
  // border-color: red !important;
  // border-top-width: 10px;
}
</style>