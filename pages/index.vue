<template>
  <v-layout
    column
    justify-center
    align-center
    :style="page == 3 ? 'height:100%' : ''"
  >
    <div
      v-if="page == 1"
      class="main-card"
      :class="activeFrame ? '' : 'd-none'"
    >
      <v-img class="frame-img" cover :src="frameImage"></v-img>
    </div>
    <v-card v-if="page == 1" class="" color="transparent" width="100%">
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
          <v-overlay absolute v-if="showingLoading">
            <div class="d-flex fill-height" style="flex-direction:column">
              <v-img width="100%" height="auto" :src="loadingIcon"></v-img>
            </div>
          </v-overlay>
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn @click=""></v-btn> -->
        <!-- picture {{picture}} -->
      </v-card-actions>
    </v-card>
    <v-card v-if="page == 2" color="transparent" class="px-4" style="">
      <v-card-text>
        <v-avartar class="pa-3" color="white">
          <v-img
            v-if="page == 2"
            :src="resultPicture"
            contain
            :width="'auto'"
            :height="400"
            style="position:rerative"
          >
          </v-img>
        </v-avartar>
      </v-card-text>
      <v-card-actions>
        <v-img :src="panelImg" width="100%" height="auto">
          <div class="d-flex align-center justify-center" style="height:100%">
            <div class="d-flex" style="width:100% ">
              <div
                v-if="resultWinner"
                class="d-flex"
                style="top: 20%; width: 100%; position: absolute;"
              >
                <span class="ma-auto white--text">
                  บันทึกหรือแค๊พ เพื่อนำไปรับรางวัล
                </span>
              </div>
              <v-btn
                class="ma-auto"
                style="width:90%"
                color="#00D0FF"
                @click="downloadImage"
                >บันทึก</v-btn
              >
            </div>
          </div>
        </v-img>
      </v-card-actions>
    </v-card>
    <v-card v-if="page == 3" color="transparent" class="d-block" height="100%">
      <div style="width:100%;height:100%;margin-top:150px" class="d-block">
        <v-img class="ma-auto my-10" :src="ftiLogo" width="80%" height="auto">
          <div class="d-flex align-center justify-center" style="height:100%">
            <div class="d-flex" style="width:100% "></div>
          </div>
        </v-img>
        <div class="d-block my-10" style="width:100%">
          <v-img class="ma-auto" :src="panelImg" width="80%" height="auto">
            <div class="d-flex align-center justify-center" style="height:100%">
              <div class="d-flex" style="width:100% ">
                <span class="ma-auto white--text">
                  {{ limitType == "same" ? limitTextSame : limitText3 }}
                </span>
              </div>
            </div>
          </v-img>
        </div>
      </div>
    </v-card>
    <div
      style="z-index:110;position: fixed; bottom: 5px;"
      v-if="page !== 2 && openButtonTab"
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
      <v-btn @click="resetCookie">
        reset cookie
      </v-btn>
      <v-btn v-if="page == 2" @click="downloadImage">
        download
      </v-btn>
      <v-btn @click="isMock = !isMock">Mock {{ isMock ? "on" : "off" }}</v-btn>
      <v-btn @click="isLucky = !isLucky"
        >win {{ isLucky ? "on" : "off" }}</v-btn
      >

      <h2 class="red--text">Time To Win {{ timeToWin }}</h2>
      <!-- <div class="figure">
        <v-img :src="img" class="img-responsive"></v-img>
      </div> -->
    </div>
    <v-btn
      style="z-index:110;position: fixed; bottom: 5px;right:5px"
      @click="openButtonTab = !openButtonTab"
      color="white"
      outlined
      dense
      >tab</v-btn
    >
  </v-layout>
</template>

<script>
// import EasyCamera from "easy-vue-camera";
import imgMock from "@/assets/images/item/imgMock.json";
import camera from "@/components/camera";
import VueCountdown from "@chenfengyuan/vue-countdown";
import loadingIcon from "@/assets/images/item/gift-animaton.gif";
import { WebCam } from "vue-web-cam";
import { find, head } from "lodash";
import framePlayImg from "@/assets/images/item/frame-1.png";
import frameResultImg from "@/assets/images/item/frame.png";
import panelImg from "@/assets/images/item/panelImg.svg";
import ftiLogo from "@/assets/images/item/fti_logo.png";
export default {
  components: {
    // "v-easy-camera": EasyCamera,
    camera,
    VueCountdown,
    WebCam

    // 'el-camera':elCamera
  },
  created() {
    console.log('policy',this.$cookies.get("fti_policy"))
    if (this.$cookies.get("fti_policy") === undefined) {
      this.$router.push("/policy");
    }
  },
  asyncData({ params, query }) {
    return {
      // boothShopCode: !!params.id ? Number(params.id) : null,
      boothShopCode: query.boothShopCode ? String(query.boothShopCode) : "",
      isBypass: query.isBypass ? String(query.isBypass) : false
    };
  },
  data() {
    return {
      img: null,
      imgMock: imgMock.image,
      isMock: true,
      isLucky: false,
      camera: null,
      deviceId: null,
      devices: [],
      activeFrame: true,
      panelImg,
      page: 1,
      limitType: "same",
      openButtonTab: false,
      limitTextSame: "ขออภัย คุณได้ร่วมสนุกกับบูธนี้ไปแล้ว",
      limitText3: "ขออภัย คุณได้ร่วมสนุกครบ 3 บูธไปแล้ว",
      itemRateList: [
        { play: true, text: "pass", pct: 100 },
        { play: false, text: "no pass", pct: 0 }
      ],
      framePlayImg,
      frameResultImg,
      ftiLogo,
      random1: 12, // 45
      random2: 10, // 25
      loadingIcon,
      imageHeight: "100%",
      imageWidth: "auto",
      counting: false,
      timeToWin: null,
      picture: null,
      resultPicture: null,
      resultWinner: false,
      totalTime: 0,
      setTime: 15000,
      loadingStage: false,
      openBoxState: false,
      openBoxTime: 3000,
      boothCookieList: [],
      showingLoading: false,
      byPassBoothId: "okpd",
      switchCameraTrigger: false
    };
  },
  computed: {
    device() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    },
    frameImage() {
      if (this.page == 1) {
        return framePlayImg;
      } else if (this.page == 2) {
        return frameResultImg;
      }
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
        this.deviceId = this.devices[this.devices.length - 1].deviceId;
      }
      // console.log("devices", this.devices);
      // console.log("first", first);
      // console.log("deviceId", this.deviceId);
    }
  },
  async mounted() {
    this.checkBoothIdList();
  },
  methods: {
    countDown() {
      // console.log("count");
      // setTimeout(() => {
      // console.log("count 1");
      this.randomStep1();
      // }, 3000);
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
    async handleCountdownProgress(data) {
      console.log(data.totalSeconds);
      if (data.totalSeconds == this.timeToWin) {
        await this.sendPicture();
        this.onCountdownEnd();
      }
      if (data.totalSeconds == 0) {
        await this.showImageGif();
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
      this.onCountdownEnd();
      this.loadingStage = true;
      try {
        let boothShopCode = this.boothShopCode ? this.boothShopCode : "1";
        this.img = this.$refs.webcam.capture();
        let form = {
          import: this.isMock ? this.imgMock : this.img,
          isBypass: this.isBypass
        };
        // let res = await this.$axios.$post(
        //   `/rewardCheck/${boothShopCode}/uploadv2`,
        //   form
        // );
        let res = { code: 2000, responseObject: { isLucky: this.isLucky } };
        // console.log("sendPicture", res);
        if (res?.code === 2000) {
          // this.resultPicture =
          //   "data:image/png;base64," + res.responseObject.ImagesMergeLayer;
          this.resultPicture = this.imgMock;
          // this.page = 3;
          this.resultWinner = res.responseObject.isLucky;
          if (res.responseObject.isLucky) {
            this.saveBoothCode();
            await this.showImageGif();
          } else {
            this.timeToWin = 0;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingStage = false;
      }
    },
    resetState() {
      // this.page = 1;
      this.resultPicture = null;
      this.totalTime = 0;
      // this.counting = false;
    },
    checkBoothIdList() {
      this.boothCookieList = this.$cookies.get("fti_booth_winner")
        ? this.$cookies.get("fti_booth_winner")
        : [];
      if (this.boothCookieList && this.boothCookieList.length < 3) {
        let found = this.boothCookieList.find(
          item => item.boothShopCode == this.boothShopCode
        );
        if (found) {
          this.sameBoothShop("same");
        } else {
          this.startCountdown();
        }
      } else {
        this.sameBoothShop("limit3");
      }
      console.log("checkBoothIdList", this.boothCookieList);
    },
    saveBoothCode(boothShopCode) {
      let obj = {
        boothShopCode: this.boothShopCode,
        status: "win"
      };
      this.boothCookieList.push(obj);

      this.$cookies.set("fti_booth_winner", this.boothCookieList, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      // console.log("saveBoothCode", this.boothCookieList);
    },
    sameBoothShop(text) {
      console.log("เล่นไปแล้ว", text);
      this.limitType = text;
      this.page = 3;
    },
    showImageGif() {
      console.log("showImageGif 1");
      this.showingLoading = true;
      setTimeout(() => {
        this.showingLoading = false;
        console.log("showImageGif 2");
        this.page = 2;
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
    onError() {},
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
    resetCookie() {
      this.$cookies.remove("fti_booth_winner");
    },
    downloadImage() {
      var a = document.createElement("a"); //Create <a>
      a.href = this.resultPicture; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click(); //Downloaded file
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
