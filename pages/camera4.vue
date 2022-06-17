<template>
  <v-layout column justify-center align-center>
    <!-- -->

    <!-- <div class="main-card">
      <v-img class="frame-img" :src="framePlayImg"></v-img>
    </div> -->
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
          <camera
            v-if="page == 1"
            :snapPicture="snapTrigger"
            :stopTrigger="stopTrigger"
            :switchCameraTrigger="switchCameraTrigger"
            @returnPicture="sendPicture"
          ></camera>
          <!-- <v-avatar  :width="imageWidth" :height="imageHeight" tile> -->
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
    <v-card>
      <div v-if="page == 1"></div>
      <div v-else-if="page == 2">
        <v-btn>Enter</v-btn>
      </div>
      <div class="d-flex" style="z-index:220" >
      <v-btn @click="startCountdown">restart</v-btn>
      <v-btn @click="closeWindow">stop</v-btn>
      <v-btn @click="switchCamera">switch</v-btn>
      </div>
    </v-card>
    <!-- <div id="image-cap"></div> -->
  </v-layout>
</template>

<script>
// import EasyCamera from "easy-vue-camera";
import camera from "@/components/camera";
import VueCountdown from "@chenfengyuan/vue-countdown";
import loadingIcon from "@/assets/images/item/gift-animaton.gif";
import framePlayImg from "@/assets/images/item/frame-1.png";
import frameResultImg from "@/assets/images/item/frame.png";
export default {
  components: {
    // "v-easy-camera": EasyCamera,
    camera,
    VueCountdown
    // 'el-camera':elCamera
  },
  asyncData({ params, query }) {
    return {
      boothShopId: !!params.id ? Number(params.id) : null
      // pathQr: query.carRegistration
      //   ? String(query.carRegistration)
      //   : ""
    };
  },
  data() {
    return {
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
      imageHeight: 480,
      imageWidth: '300',
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
      byPassBoothId:"okpd",
      switchCameraTrigger:false,
    };
  },
  watch: {
    // totalSeconds(to){
    //   console.log('timeer',to)
    // }
  },
  async mounted() {
    // this.countDown();
    this.checkBoothIdList();
    // this.startCountdown();
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
        // let binaryImage = this.convertToImage(value);
        // this.resultPicture = value;
        // boothShopId
        // console.log("img", value);
        let form = { import: value };
        // let res = await this.$axios.$post(`/rewardCheck/3/uploadv2`, form);
        // console.log("sendPicture", res);
        // if (res?.code === 2000) {
        //   this.resultPicture =
        //     "data:image/png;base64," + res.responseObject.encodedString;
        // }
        this.showImageGif();
        this.resultPicture = value;
      } catch (error) {
        console.error(error);
      } finally {
        this.loadingStage = false;
      }

      // let blob = new Blob([value]);
      //   console.log('blob',blob)
      //   let link = document.createElement("a");
      //   link.href = window.URL.createObjectURL(blob);
      //   // link.download = res.headers["file-name"];
      //   link.click();
    },
    // urlB64ToUint8Array(base64String) {
    //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    //   const base64 = (base64String + padding)
    //     .replace(/-/g, "+")
    //     .replace(/_/g, "/");
    //   // console.log("base64", base64);
    //   const rawData = window.atob(base64);
    //   const outputArray = new Uint8Array(rawData.length);

    //   for (let i = 0; i < rawData.length; ++i) {
    //     outputArray[i] = rawData.charCodeAt(i);
    //   }

    //   return outputArray;
    // },
    // convertToImage(base64String) {
    //   var image = document.createElement("img");
    //   console.log("img 1", image);
    //   image.src = "data:image/png;base64," + base64String;
    //   // console.log("img 2", image);
    //   //  document.getElementById('image-cap').appendChild(image);
    //   return image;
    //   // return document.body.appendChild(image);
    // },
    resetState() {
      this.page = 1;
      this.resultPicture = null;
      this.totalTime = 0;
      // this.counting = false;
    },
    closeWindow() {
      this.stopTrigger = !this.stopTrigger;
      window.close();
    },
    checkBoothIdList() {
      this.boothCookieList = this.$cookies.get("fti_booth_winner");
      if (this.boothCookieList) {
        let found = this.boothCookieList.find(
          item => item.boothShopId == this.boothShopId
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
    saveBoothCode(boothShopId) {
      this.boothCookieList.push({
        boothShopId: this.boothShopId,
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
      }, 5000);
    },
    switchCamera(){
      this.switchCameraTrigger = !this.switchCameraTrigger;
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
