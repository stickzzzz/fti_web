<template>
  <div :class="contentClass">
    <slot name="button" :open="openDialog">
      <v-btn
        v-if="!hide"
        small
        depressed
        color="primary lighten-2"
        dark
        @click.stop="openDialog()"
        >open</v-btn
      >
    </slot>
    <v-dialog
      transition="fade-transition"
      :persistent="false"
      v-model="dialog"
      :max-width="1000"
    >
      <v-sheet v-if="!isAlbum">
        <v-img :src="image ? image : ''"></v-img>
      </v-sheet>
      <v-carousel
        v-else
        progress
        hide-delimiter-background
        delimiter-icon="fa-minus"
        :show-arrows="isAlbum"
        :hide-delimiters="!isAlbum"
      >
        <!-- <v-carousel-item
                v-if="loading"
                v-for="i in 1"
                :key="i"
                :src="loadingImg"
              ></v-carousel-item> -->
        <v-carousel-item
          contain
          class="fill-height"
          v-for="(item, i) in images"
          :key="i"
          eager
        >
          <v-avatar tile width="100%" height="100%">
            <v-img :src="item[urlKey]" class="grey lighten-2" contain>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    persistent: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: 1000
    },
    isAlbum: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: "d-inline-block"
    },
    image: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: null
    },
    urlKey: {
      type: String,
      default: "image"
    }
  },
  async mounted() {},
  computed: {},
  watch: {
    dialog(to) {
      if (to) {
      }
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    openDialog() {
      setTimeout(() => {
        this.dialog = true;
      });
    },
    async closeDialog() {
      this.clearData();
      this.dialog = false;
    },
    cancel() {
      this.clearData();
      this.dialog = false;
    }
  }
};
</script>
