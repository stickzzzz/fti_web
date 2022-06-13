<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title>
          <vue-countdown
            v-if="counting"
            :time="totalTime"
            @end="onCountdownEnd"
            @progress="handleCountdownProgress"
            v-slot="{ totalSeconds }"
          >
            {{ totalSeconds }}
          </vue-countdown>
        </v-card-title>
        <v-card-text>
          <v-sheet class="animate-flicker">
            <camera
              v-if="page == 1"
              :snapPicture="snapTrigger"
              @returnPicture="sendPicture"
            ></camera>
            <!-- <v-avatar  :width="imageWidth" :height="imageHeight" tile> -->
            <v-img
              v-if="page == 2"
              :src="picturePage2"
              cover
              :width="imageWidth"
              :height="imageHeight"
            >
              <v-overlay absolute>
                <div class="d-flex fill-height" style="flex-direction:column">
                  <v-img :src="loadingIcon"></v-img>
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
        <v-btn @click="startCountdown">restart</v-btn>
        <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EasyCamera from "easy-vue-camera";
import camera from "/components/camera";
import VueCountdown from "@chenfengyuan/vue-countdown";
import loadingIcon from "/assets/item/loading_icon.gif";
export default {
  components: {
    "v-easy-camera": EasyCamera,
    camera,
    VueCountdown
  },
  asyncData({ params, query }) {
    return {
      userId: !!params.id ? Number(params.id) : null
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
      loadingIcon,
      imageHeight: 543,
      imageWidth: 300,
      counting: false,
      timeToWin: null,
      snapTrigger: false,
      picture: null,
      picturePage2: null,
      totalTime: 60000
    };
  },
  watch: {
    // totalSeconds(to){
    //   console.log('timeer',to)
    // }
  },
  async mounted() {
    // this.countDown();
    this.startCountdown();
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
      console.log("start");
      this.randomStep1();

      this.counting = true;
    },
    onCountdownEnd: function() {
      this.counting = false;
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
      console.log("itemRateList", this.itemRateList);
      const expanded = this.itemRateList.flatMap(item =>
        Array(item.pct).fill(item)
      );
      const winner = expanded[Math.floor(Math.random() * expanded.length)];
      if (winner.play) {
        this.timeToWin = this.getRandomInt(55, 50);
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
    sendPicture(value) {
      this.page = 2;
      console.log("get pic", value);
      this.picturePage2 = value;
      // let blob = new Blob([value]);
      //   console.log('blob',blob)
      //   let link = document.createElement("a");
      //   link.href = window.URL.createObjectURL(blob);
      //   // link.download = res.headers["file-name"];
      //   link.click();
    },
    resetState() {
      this.page = 1;
      this.picturePage2 = null;
    }
  }
};
</script>
<style lang="">
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
