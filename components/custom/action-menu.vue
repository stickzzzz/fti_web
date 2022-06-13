<template>
  <v-menu v-if="!hide" offset-y :open-on-hover="openOnHover">
    <template v-slot:activator="{ on }">
      <v-btn v-if="!iconOnly" small :ripple="false" v-on="on" :color="color" depressed :disabled="disabled">
        {{name || t('option')}}
        <v-icon right>{{icon}}</v-icon>
      </v-btn>
      <v-btn v-if="iconOnly" :ripple="false" v-on="on" :color="color" :icon="iconButton" depressed :disabled="disabled">
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </template>
    <slot name="list"></slot>
  </v-menu>
</template>
<script>
export default {
  name: "ActionMenu",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
    },
    color: {
      type: String,
      default: "golden"
    },
    icon: {
      type: String,
      default: "mdi-chevron-down"
    },
    iconButton: {
      type: Boolean,
      default: false
    },
    openOnHover: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(to, from) {
      // console.log("menu", to);
    }
  }
};
</script>