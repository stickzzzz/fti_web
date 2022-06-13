<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :background-color="backgroundColor"
    flat
    solo
    style="font-weight: 500"
    height="60"
  >
  </v-text-field>
  <!-- <v-btn
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    :color="$attrs.color || 'primary'"
    :class="`text-capitalize ${className} ${$attrs.class}`"
  >
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot :name="name" v-bind="slotData"></slot>
    </template>
    <slot v-for="(_, name) in $slots" :name="name" :slot="name"></slot>
  </v-btn> -->
</template>
<script>
export default {
  name: "VCustomTextField",
  model: {
    event: "input",
    value: "value",
  },
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    backgroundColor: {
      type: String,
      default: "#F1F1F3",
    },
  },
  data() {
    return {};
  },
  watch: {
    value(to) {
      console.log(to);
    },
  },
  mounted() {
    console.log(this.$attrs);
    // console.log("VCustomBtn mounted");
  },
};
</script>