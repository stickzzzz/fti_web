<template>
  <v-layout column justify-center align-center>
    <div class="main-card" :class="activeFrame ? '' : 'd-none'">
      <v-img class="frame-img" cover :src="framePlayImg"></v-img>
    </div>
    <v-card class="" color="transparent" width="100%">
      <v-card-title>
        <vue-countdown
          v-if="counting"
          class="counter-time"
          :time="totalTime"
          @end="onCountdownEnd"
          @progress="handleCountdownProgress"
          v-slot="{ totalSeconds }"
        >
          {{ totalSeconds }}
        </vue-countdown>
      </v-card-title>
      <v-card-text>
        <v-sheet class="animate-flicker" color="transparent">
          <!-- <camera
            v-if="page == 1"
            :snapPicture="snapTrigger"
            :stopTrigger="stopTrigger"
            @returnPicture="sendPicture"
          ></camera> -->
          <web-cam
            v-if="page == 1"
            ref="webcam"
            :device-id="deviceId"
            @started="onStarted"
            @stopped="onStopped"
            @error="onError"
            @cameras="onCameras"
            @camera-change="onCameraChange"
          />
          <v-img
            v-if="page == 2"
            :src="resultPicture"
            cover
            :width="imageWidth"
            :height="imageHeight"
            style="position:rerative"
          >
            <v-overlay absolute v-if="showingLoading">
              <div class="d-flex fill-height" style="flex-direction:column">
                <v-img width="100%" height="auto" :src="loadingIcon"></v-img>
              </div>
            </v-overlay>
          </v-img>
          <!-- </v-avatar> -->
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn @click=""></v-btn> -->
        <!-- picture {{picture}} -->
      </v-card-actions>
    </v-card>
    <div
      style="z-index:110;
    position: fixed;
    bottom: 5px;"
    >
      <!-- <v-select
        v-model="device.deviceId"
        persistent-hint
        :items="devices"
      ></v-select> -->
      <!-- <select v-model="camera">
        <option>-- Select Device --</option>
        <option
          v-for="device in devices"
          :key="device.deviceId"
          :value="device.deviceId"
          >{{ device.label }}</option
        >
      </select> -->
      <v-btn @click="sendPicture">
        Capture Photo
      </v-btn>
      <v-btn @click="onStop">
        Stop Camera
      </v-btn>
      <v-btn @click="onStart">
        Start Camera
      </v-btn>
      <v-btn @click="activeFrame = !activeFrame">frame</v-btn>
      <h2 class="white--text">timeToWin {{timeToWin}}</h2>
      <!-- <div class="figure">
        <v-img :src="img" class="img-responsive"></v-img>
      </div> -->
    </div>
  </v-layout>
</template>

<script>
// import EasyCamera from "easy-vue-camera";
import camera from "@/components/camera";
import VueCountdown from "@chenfengyuan/vue-countdown";
import loadingIcon from "@/assets/images/item/gift-animaton.gif";
import { WebCam } from "vue-web-cam";
import { find, head } from "lodash";
import framePlayImg from "@/assets/images/item/frame-1.png";
import frameResultImg from "@/assets/images/item/frame.png";
export default {
  components: {
    // "v-easy-camera": EasyCamera,
    camera,
    VueCountdown,
    WebCam

    // 'el-camera':elCamera
  },
  asyncData({ params, query }) {
    return {
      // boothShopCode: !!params.id ? Number(params.id) : null,
      boothShopCode: query.boothShopCode ? String(query.boothShopCode) : ""
    };
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      activeFrame: true,
      page: 1,
      itemRateList: [
        { play: true, text: "pass", pct: 80 },
        { play: false, text: "no pass", pct: 20 }
      ],
      framePlayImg,
      frameResultImg,
      random1: 40, // 40
      random2: 1, // 0
      loadingIcon,
      imageHeight: '100%',
      imageWidth: "auto",
      counting: false,
      timeToWin: null,
      snapTrigger: false,
      picture: null,
      resultPicture: null,
      totalTime: 0,
      setTime: 60000,
      loadingStage: false,
      openBoxState: false,
      openBoxTime: 3000,
      image64Res: "",
      stopTrigger: false,
      boothCookieList: [],
      showingLoading: false,
      byPassBoothId: "okpd",
      switchCameraTrigger: false
    };
  },
  computed: {
    device() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    }
  },
  watch: {
    // totalSeconds(to){
    //   console.log('timeer',to)
    // }
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      let first = head(this.devices);
      if (first) {
     
        // this.camera = first.deviceId;
        // this.deviceId = first.deviceId;
        this.deviceId = this.devices[this.devices.length-1].deviceId
      }
         console.log('devices',this.devices)
        console.log('first',first)
        console.log('deviceId',this.deviceId)
    }
  },
  async mounted() {
    this.checkBoothIdList();
  },
  methods: {
    countDown() {
      console.log("count");
      setTimeout(() => {
        console.log("count 1");
        this.randomStep1();
      }, 3000);
    },
    startCountdown: function() {
      this.resetState();
      this.totalTime = this.setTime;
      console.log("start");
      this.randomStep1();
      this.counting = true;
    },
    onCountdownEnd: function() {
      // this.counting = false;
      if (this.timeToWin == null) {
        console.log("game over");
      }
      console.log("end");
    },
    handleCountdownProgress(data) {
      console.log(data.totalSeconds);
      if (data.totalSeconds == this.timeToWin) {
        this.onCountdownEnd();
        this.snapTrigger = !this.snapTrigger;
      }
    },
    randomStep1() {
      // console.log("itemRateList", this.itemRateList);
      const expanded = this.itemRateList.flatMap(item =>
        Array(item.pct).fill(item)
      );
      const winner = expanded[Math.floor(Math.random() * expanded.length)];
      if (winner.play) {
        this.timeToWin = this.getRandomInt(this.random1, this.random2);
        console.log("timeToWin", this.timeToWin);
      } else {
        this.timeToWin = null;
      }
      console.log("winner: " + winner.text);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async sendPicture(value) {
      this.loadingStage = true;
      this.page = 2;
      try {
        let boothShopCode = this.boothShopCode ? this.boothShopCode : "1";
        this.img = this.$refs.webcam.capture();
        let form = { import: this.img };
        let res = await this.$axios.$post(
          `/rewardCheck/${boothShopCode}/uploadv2`,
          form
        );
        // let res = { code: 2000 };
        console.log("sendPicture", res);
        if (res?.code === 2000) {
          await this.showImageGif();
          this.resultPicture =
            "data:image/png;base64," + res.responseObject.ImagesMergeLayer;
          // this.resultPicture = this.img;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingStage = false;
      }
    },
    resetState() {
      this.page = 1;
      this.resultPicture = null;
      this.totalTime = 0;
      // this.counting = false;
    },
    checkBoothIdList() {
      this.boothCookieList = this.$cookies.get("fti_booth_winner");
      if (this.boothCookieList) {
        let found = this.boothCookieList.find(
          item => item.boothShopCode == this.boothShopCode
        );
        if (found) {
          this.sameBoothShop();
        } else {
          this.startCountdown();
        }
      } else {
        this.startCountdown();
      }
    },
    saveBoothCode(boothShopCode) {
      this.boothCookieList.push({
        boothShopCode: this.boothShopCode,
        status: "win"
      });

      this.$cookies.set("fti_booth_winner", this.boothCookieList, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
    },
    sameBoothShop() {
      console.log("เล่นไปแล้ว");
    },
    showImageGif() {
      this.showingLoading = true;
      setTimeout(() => {
        this.showingLoading = false;
      }, 3000);
    },

    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>
<style lang="scss">
.main-card {
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  // // background-position: center;
  // background-size: contain;
  background-color: black;
  height: 100%;
  // width: 300px;
  width: 100%;
  .frame-img {
    z-index: 100;
    position: absolute;
  }
}
.counter-time {
  position: absolute;
  color: white;
  top: 30px;
  right: 40px;
  z-index: 200;
}

/* body {
  background: url('/assets/images/item/frame-1.png') no-repeat center center fixed !important;
  background-size: cover;
} */
/* 
@keyframes flickerAnimation {
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-o-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-moz-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
}
@-webkit-keyframes flickerAnimation{
  0%   { opacity:1; }
  50%  { opacity:0; }
  100% { opacity:1; }
} */
/* .animate-flicker {
   -webkit-animation: flickerAnimation .5s infinite;
   -moz-animation: flickerAnimation .5s infinite;
   -o-animation: flickerAnimation .5s infinite;
    animation: flickerAnimation .5s infinite;
} */
</style>
