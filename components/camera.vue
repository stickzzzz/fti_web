<template>
  <v-container>
    <div style="position: relative">
      <video id="camera-display" autoplay playsinline></video>

      <!-- <v-btn
        style="
          position: absolute;
          bottom: 2em;
          right: 50%;
          transform: translate(50%, 0%);
        "
        @click="snapAsDataUrl"
        fab
        color="white"
        ><v-icon size="20" color="primary">fa-camera</v-icon></v-btn
      > -->
    </div>

    <!-- <v-row>
      <v-col cols="12">
      </v-col>
    </v-row> -->
        <canvas id="picture-preview"></canvas>

    <v-card></v-card>
  </v-container>
</template>

<script>
import EasyCamera from "easy-vue-camera";
import Camera from "easy-js-camera";

export default {
  name: "VueCamera",
  components: {
    "vue-camera": EasyCamera,
  },
  props:{
    snapPicture:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      picture: null,
      video: null,
      canvas: null,
      camera: null,
    };
  },
  watch: {
    picture(to) {
      console.log({ picture: to });
    },
    snapPicture(to){
      console.log('snapPicture',to)
      this.snapAsDataUrl();
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.camera = null;
  },
  methods: {
    async sendImage() {
      try {
        await this.$liff.sendMessages([
          {
            type: "image",
            originalContentUrl: "https://niti-bbt-uat.web.app/gsb.png",
            previewImageUrl: "https://niti-bbt-uat.web.app/gsb.png",
          },
        ]);
      } catch (err) {
        alert(err);
      }
    },
    async init() {
      try {
        this.video = document.getElementsByTagName("video")[0];
        this.canvas = document.getElementsByTagName("canvas")[0];

        if (Camera.isCameraSupported()) {
          this.camera = await Camera.tryInvokePermission(
            this.video,
            this.canvas
          );
          this.camera.setVideoConstraints({ width: 300, height: 534 });
          this.camera.start();
        } else {
          alert("Camera NOT SUPPORT");
        }
      } catch (err) {
        console.error(err);
      }
    },

    async snapAsDataUrl() {
      this.picture = await this.camera.snapAsDataUrl();
      this.stopStream();
    },
    async startStream(){
      this.camera.start();
    },
    async stopStream(){
      this.camera.stop();
      this.$emit('returnPicture',this.picture)
    },
    
  },
};
</script>

<style>
#camera-display,
#picture-preview {
  display: block;
  margin: auto;
}
</style>
