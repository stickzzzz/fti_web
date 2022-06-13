<template>
  <v-card flat color="transparent">
    <v-card-subtitle class="pt-0 py-4">
      <v-row>
        <v-col class="d-flex">
          <v-breadcrumbs class="pt-1 pb-0 px-0 pr-4" :items="breadcrumbs">
            <template v-slot:divider>
              <!-- <v-icon size="18" class="indigo--text text--darken-3">mdi-arrow-right</v-icon> -->
              <v-icon size="18">mdi-chevron-right</v-icon>
            </template>
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                class="title font-weight-light"
                active-class="h6 font-weight-bold"
                :to="item.to"
                :disabled="item.disabled"
                :exact="item.exact"
                >{{ item.text }}</v-breadcrumbs-item
              >
            </template>
          </v-breadcrumbs>
          <slot name="button" :loading="loading">
            <v-btn
              x-large
              v-if="showButton"
              rounded
              depressed
              color="primary"
              :ripple="false"
              :loading="loading"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ btnName || t("add") }}
            </v-btn>
          </slot>
        </v-col>
        <v-col v-if="rightButton" class="d-flex justify-end d-content">
          <slot name="button-right" :loading="loading">
            <v-btn
              v-if="showRightButton"
              x-large
              rounded
              depressed
              color="primary"
              :ripple="false"
              :loading="loading"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ btnName || t("role") }}
            </v-btn>
          </slot>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "PageHeader",
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    },
    showButton: {
      type: Boolean,
      default: false
    },
    btnName: {
      type: String,
      default: "เพิ่ม"
    },
    title: {
      type: String,
      default: "Title"
    },
    rightButton: {
      type: Boolean,
      default: false
    },
    showRightButton: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    };
  }
};
</script>
