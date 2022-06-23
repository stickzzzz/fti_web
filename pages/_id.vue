<template>
  <div>
    <div class="not-support" :style="page == 3 ? 'height:100%' : ''">
      <!-- column
    justify-center
    align-center -->
      <div
        v-if="page == 1"
        class="main-card"
        :class="activeFrame ? '' : 'd-none'"
      >
        <!-- :style="`height:${screenHeight}px;width:auto`" -->

        <v-img
          class="frame-img"
          :src="frameImage"
          cover
          style="height:100%;"
        ></v-img>
      </div>
      <div v-if="page == 1 && !showingLoading" class="scan-image">
        <v-img
          :src="scanImg"
          width="260"
          height="auto"
          style="opacity:0.8"
        ></v-img>
      </div>
      <div v-if="showingLoading" class="d-flex gift-image">
        <v-img width="100%" height="100%" style="" :src="giftIcon"></v-img>
      </div>

      <!-- <div v-if="page == 1 && !showingLoading" class="logo-random-image" >
        <v-img
          :src="logoMotionImg"
          style="opacity:0.8;margin:auto"
          width="80%"
          height="auto"
        >
        </v-img>
      </div> -->
      <v-card v-if="page == 1" class="" color="transparent" width="100%">
        <v-card-title>
          <!-- <span class="title-game" style="font-size:18px">{{ titleText }}</span> -->
          <v-img
            class="title-label-game mt-3"
            :src="titleLabelImg"
            :width="300"
            hieght="auto"
          ></v-img>
          <v-img
            v-if="counting"
            class="counter-time d-flex align-center justify-center"
            :src="counterImg"
            :width="70"
            hieght="auto"
          >
            <!--
             -->
            <vue-countdown
              class="white--text"
              :style="
                tempTotalSeconds >= 10 ? 'margin-left:24px' : 'margin-left:28px'
              "
              :time="totalTime"
              @end="onCountdownEnd"
              v-slot="{ totalSeconds }"
              @progress="handleCountdownProgress"
            >
              {{ totalSeconds }}
            </vue-countdown>
          </v-img>
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
              height="100%"
            />
            <!-- <v-overlay  v-if="showingLoading">
              <div class="d-flex" style="">
                <v-img width="100%" height="auto" :src="giftIcon"></v-img>
              </div>
            </v-overlay> -->
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn @click=""></v-btn> -->
          <!-- picture {{picture}} -->
        </v-card-actions>
      </v-card>
      <v-card v-if="page == 2" color="transparent" class="px-4" style="">
        <v-card-text>
          <v-img
            v-if="page == 2"
            :src="resultPicture"
            contain
            :width="'auto'"
            :height="400"
            style="position:rerative"
          >
          </v-img>
        </v-card-text>
        <v-card-actions>
          <v-img :src="panelImg" width="100%" height="auto">
            <div class="d-flex align-center justify-center" style="height:100%">
              <div class="d-flex" style="width:100% ">
                <div
                  v-if="resultWinner == 1"
                  class="d-flex"
                  style="top: 20%; width: 100%; position: absolute;"
                >
                  <span class="ma-auto white--text">
                    บันทึกหรือแคปเจอร์ เพื่อนำไปรับรางวัล
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
      <v-card
        v-if="page == 3"
        color="transparent"
        class="d-block"
        height="100%"
      >
        <div style="width:100%;height:100%;margin-top:150px" class="d-block">
          <v-img class="ma-auto my-10" :src="ftiLogo" width="80%" height="auto">
            <div class="d-flex align-center justify-center" style="height:100%">
              <div class="d-flex" style="width:100% "></div>
            </div>
          </v-img>
          <div class="d-block my-10" style="width:100%">
            <v-img class="ma-auto" :src="panelImg" width="80%" height="auto">
              <div
                class="d-flex align-center justify-center"
                style="height:100%"
              >
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
        <!-- <v-btn @click="sendPicture">
        Capture Photo
      </v-btn> -->
        <v-btn @click="onStop">
          Stop Camera
        </v-btn>
        <v-btn @click="onStart">
          Start Camera
        </v-btn>
        <!-- <v-btn @click="activeFrame = !activeFrame">frame</v-btn> -->
        <v-btn @click="resetCookie">
          reset cookie
        </v-btn>
        <v-btn @click="saveBoothCode">
          saveCode
        </v-btn>
        <v-btn @click="isMock = !isMock"
          >Mock {{ isMock ? "on" : "off" }}</v-btn
        >
        <v-btn @click="isLucky = !isLucky"
          >win {{ isLucky ? "on" : "off" }}</v-btn
        >
        <v-btn @click="selectIcon(scanIconSelect)"
          >icon scan {{ scanIconSelect }}</v-btn
        >
        <h2 class="red--text">Time {{ timeToWin }}</h2>
        <h2 class="red--text d-flex ">
          Result
          <div v-if="resultWinner == 1" class="ml-2">win</div>
          <div v-else-if="resultWinner == 2" class="ml-2">lose</div>
          <div v-else class="ml-2">0</div>
        </h2>

        <!-- <div class="figure">
        <v-img :src="img" class="img-responsive"></v-img>
      </div> -->
      </div>
      <v-btn
        v-if="!openButtonTab"
        @click="resetBoothStatus"
        style="z-index:110;position: fixed; bottom: 5px;left:5px"
      >
        reset(debug)
      </v-btn>
      <v-btn
        style="z-index:110;position: fixed; bottom: 5px;right:5px"
        @click="openButtonTab = !openButtonTab"
        color="transparent"
        outlined
        dense
      ></v-btn>
      <v-dialog
        v-model="warningDialog"
        max-width="480"
        transition="fade-transition"
        persistent
      >
        <v-card>
          <v-card-title>บางอย่างผิดพลาด</v-card-title>
          <v-card-text>
            กรุณาสแกน QRcode ใหม่ {{ warningText ? `(${warningText})` : "" }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="primary"
              :ripple="false"
              @click="warningDialog = false"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="notSupportDialog">แอพพลิเคชั่นไม่รับรองแนวนอน</div>
  </div>
</template>

<script>
// import EasyCamera from "easy-vue-camera";
import imgMock from "@/assets/images/item/imgMock.json";
import camera from "@/components/camera";
import VueCountdown from "@chenfengyuan/vue-countdown";
import giftIcon from "@/assets/images/item/gift-animaton.gif";
import { WebCam } from "vue-web-cam";
import { find, head } from "lodash";
import framePlayImg from "@/assets/images/item/frame-play.png";
import frameResultImg from "@/assets/images/item/frame.png";
import panelImg from "@/assets/images/item/panelImg.svg";
import ftiLogo from "@/assets/images/item/fti_logo.png";
import scanImg1 from "@/assets/images/item/radar.gif";
import titleLabelImg from "@/assets/images/item/text_label.png";
import counterImg from "@/assets/images/item/counter.png";
import frame1 from "@/assets/images/item/frame5.png";
import logoMotionImg from "@/assets/images/item/logo_motion.gif";

export default {
  components: {
    // "v-easy-camera": EasyCamera,
    camera,
    VueCountdown,
    WebCam

    // 'el-camera':elCamera
  },
  created() {
    // console.log('policy',this.$cookies.get("fti_policy"))
    if (this.boothShopCode !== null) {
      //   console.log("boothShopCode", this.boothShopCode);
      let splitTexts = this.boothShopCode.split("__1");
      this.$store.commit(
        "set_boothShopCode",
        splitTexts ? splitTexts[0] : null
      );
      if (splitTexts.length > 1) {
        this.$store.commit("set_isByPass", true);
      } else {
        this.$store.commit("set_isByPass", false);
      }
      if (this.$cookies.get("fti_policy") === undefined) {
        this.$router.push("/policy");
      }
    } else {
      this.goErrorPage();
    }
  },
  asyncData({ params, query }) {
    return {
      boothShopCode: !!params.id ? params.id : null,
      // boothShopCode: query.boothShopCode ? String(query.boothShopCode) : "1",
      //   __1 นายกเคส
      isBypass: query.isBypass ? String(query.isBypass) : false
    };
  },
  data() {
    return {
      img: null,
      imgMock: imgMock.image,
      logoMotionImg,
      scanImg1,
      frame1,
      titleLabelImg,
      counterImg,
      isMock: false,
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
      titleText: "ส่องเพื่อหาของขวัญภายในเวลา",
      itemRateList: [
        { play: true, text: "pass", pct: 100 },
        { play: false, text: "no pass", pct: 0 }
      ],
      framePlayImg,
      frameResultImg,
      ftiLogo,
      random1: 30, // 45
      random2: 10, // 25
      byPassTime: 30,
      giftIcon,
      imageHeight: "100%",
      imageWidth: "auto",
      screenHeight: window.innerHeight,
      screenHeight: window.innerWdith,
      counting: false,
      timeToWin: null,
      picture: null,
      resultPicture: null,
      resultWinner: 0, // 0 ,win 1,lose 2
      totalTime: 0,
      setTime: 40000,
      tempTotalSeconds: 0,
      loadingStage: false,
      openBoxState: false,
      openBoxTime: 3000,
      boothShopCodeDetail: { list: [], createDate: null },
      showingLoading: false,
      switchCameraTrigger: false,
      warningDialog: false,
      warningText: "",
      scanIconSelect: 1
    };
  },
  computed: {
    scanImg() {
      return scanImg1;
    },
    device() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    },
    frameImage() {
      if (this.page == 1) {
        // return frame1;
        return framePlayImg;
      } else if (this.page == 2) {
        return frameResultImg;
      }
    },
    leftPosition() {
      let num = 115;
      if (window.innerHeight > 350) {
        num + 1;
      }
      return `calc(50% + ${num}px)`;
    },
    topPosition() {
      return `calc(50% + ${num}px)`;
    }
  },
  watch: {
    // totalSeconds(to){
    //   console.log('timeer',to)
    // }
    warningDialog(to) {
      console.log("warningDialog", to);
    },
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
    selectIcon(num) {
      this.scanIconSelect = num == 1 ? 2 : 1;
    },
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
      this.tempTotalSeconds = data.tempTotalSeconds;
      if (this.$store.state.isByPass) {
        this.timeToWin = this.byPassTime;
      }
      if (data.totalSeconds == this.timeToWin && this.resultWinner == 0) {
        await this.sendPicture();
        this.onCountdownEnd();
      }
      if (data.totalSeconds == 1 && this.resultWinner == 2) {
        this.showImageGif();
      }
      if (data.totalSeconds == 1 && this.resultWinner == 0) {
        this.openWarningDialog("somthing went wrong");
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
        let boothShopCode = this.$store.state.boothShopCode
          ? this.$store.state.boothShopCode
          : "";
        this.img = this.$refs.webcam.capture();
        let form = {
          import: this.isMock ? this.imgMock : this.img,
          boothShopCode: boothShopCode
        };
        if (this.$store.state.isByPass == true) {
          form = { ...form, isBypass: true };
        }
        let res = await this.$axios.$post(`/rewardCheck`, form);
        // let res = { code: 2000, responseObject: { isLucky: this.isLucky } };
        // console.log("sendPicture", res);
        if (res?.code === 2000) {
          this.resultPicture =
            "data:image/png;base64," + res.responseObject.ImagesMergeLayer;
          // this.resultPicture = this.imgMock;
          // this.page = 3;
          this.resultWinner = res.responseObject.isLucky ? 1 : 2;
          if (res.responseObject.isLucky) {
            this.saveBoothCode();
            await this.showImageGif();
          } else {
            this.timeToWin = 0;
          }
        } else {
          //   console.log('not if')
          throw res;
          // this.openWarningDialog('');
        }
      } catch (error) {
        this.goErrorPage(error?.message2 ? error?.message2 : "");
        // this.openWarningDialog();

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
    assignCookieWinner(cookieName) {
      return this.$cookies.get("fti_booth_winner")
        ? this.$cookies.get("fti_booth_winner")
        : { createDate: null, list: [] };
    },
    checkBoothIdList() {
      let currentDate = new Date();
      this.boothShopCodeDetail = this.assignCookieWinner();
      let current = new Date();
      let first = this.boothShopCodeDetail.createDate
        ? this.boothShopCodeDetail.createDate
        : null;
      let yesDay = this.createYesterday();
      console.log("yesDay", yesDay);
      if (this.boothShopCodeDetail.createDate) {
        // have cookie
        // if (this.checkSameDay(yesDay, current)) {
        if (this.checkSameDay(this.boothShopCodeDetail.createDate, current)) {
          // วันเดียวกัน
          console.log("วันเดียวกัน");
        } else {
          console.log("คนละวัน");
          this.$cookies.remove("fti_booth_winner");
          this.boothShopCodeDetail = this.assignCookieWinner();
        }
      }

      if (
        this.boothShopCodeDetail.list &&
        this.boothShopCodeDetail.list.length < 3
      ) {
        let found = this.boothShopCodeDetail.list.find(
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
      // let currentDate = this.formatDate(new Date());
      let currentDate = new Date();

      let c;
      //   console.log("date", currentDate);
      let obj = {
        boothShopCode: this.boothShopCode
      };
      this.boothShopCodeDetail.list.push(obj);

      this.$cookies.set(
        "fti_booth_winner",
        { createDate: currentDate, list: this.boothShopCodeDetail.list },
        {
          path: "/",
          maxAge: 60 * 60 * 24 * 1
        }
      );
      console.log("saveBoothCode", this.boothCookieList);
    },
    sameBoothShop(text) {
      console.log("เล่นไปแล้ว", text);
      this.limitType = text;
      this.page = 3;
    },
    showImageGif() {
      this.showingLoading = true;
      setTimeout(() => {
        this.showingLoading = false;
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
      this.resetBoothStatus();
      this.$cookies.remove("fti_policy");
    },
    resetBoothStatus() {
      this.$cookies.remove("fti_booth_winner");
    },
    downloadImage() {
      var a = document.createElement("a"); //Create <a>
      a.href = this.resultPicture; //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click(); //Downloaded file
    },
    openWarningDialog(text = "") {
      //   console.log("error", text);
      this.warningDialog = true;
      this.warningText = text;
    },
    goErrorPage(text) {
      this.$router.push(`/notfound?text=${text}`);
    },
    // formatDate(date) {
    //   return [
    //     date.getFullYear(),
    //     padTo2Digits(date.getMonth() + 1),
    //     padTo2Digits(date.getDate())
    //   ].join("-");
    // },
    checkSameDay(first, second) {
      let date1 = new Date(first);
      console.log(
        "first",
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      console.log(
        "second",
        second.getFullYear(),
        second.getMonth(),
        second.getDate()
      );
      return (
        date1.getFullYear() === second.getFullYear() &&
        date1.getMonth() === second.getMonth() &&
        date1.getDate() === second.getDate()
      );
    },
    createYesterday() {
      let date = new Date("2020-06-22");
      console.log("yes", date);
      return date;
    }
  }
};
</script>
<style lang="scss">
body {
  background-color: black;
}
.main-card {
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  // // background-position: center;
  // background-size: contain;
  // background-color: black;
  // position: absolute;
  // height: 100%;
  // width: 300px;
  width: auto;
  .frame-img {
    z-index: 100;
    position: absolute;
  }
}
.scan-image {
  position: absolute;
  top: 25%;
  left: calc(50% - 130px);

  z-index: 130;
}
.logo-random-image {
  width: 100%;
  position: absolute;
  top: 15%;
  // left: calc(50% - 130px);
  // left: 20%;

  z-index: 120;
}
.gift-image {
  position: fixed;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  // width: 100%;
  // height: 100%;
  z-index: 300;
}
.title-game {
  position: absolute;
  color: white;
  top: 5%;
  left: 52px;
  z-index: 200;
}
.title-label-game {
  z-index: 110;
}
.counter-time {
  position: absolute;
  //   color: white;
  //   top: 6%;
  right: 5%;
  z-index: 120;
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
@media screen and (orientation: landscape) {
  //   html {
  //     transform: rotate(-90deg);
  //     transform-origin: left top;
  //     width: 100vh;
  //     height: 100vw;
  //     overflow-x: hidden;
  //     position: absolute;
  //     top: 100%;
  //     left: 0;
  //   }
  .not-support {
    visibility: hidden;
  }
  .notSupportDialog {
    visibility: visible;
    background-color: black;
    color: white;
    text-align: center;
    position: fixed;
    top: 1px;
    bottom: 1px;
    right: 1px;
    left: 1px;
    font-size: 22px;
  }
}
</style>
