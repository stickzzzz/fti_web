<template>
  <div class="">
    <div class="main-card" :class="activeFrame ? '' : 'd-none'">
      <v-img class="frame-img" :src="framePlayImg"></v-img>
    </div>
    <code v-if="device">{{ device.label }}</code>
    <!-- width="100%"
      height="500" 
      resolution="{height:500:width:'100%'}"
      -->
    <v-card>
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
        <web-cam
          ref="webcam"
          :device-id="deviceId"
          :selectFirstDevice="true"
          @started="onStarted"
          @stopped="onStopped"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
        />
      </v-card-text>
    </v-card>

    <div style="z-index:110;position:relative">
      <!-- <v-select
        v-model="device.deviceId"
        persistent-hint
        :items="devices"
      ></v-select> -->
      <select v-model="camera">
        <option>-- Select Device --</option>
        <option
          v-for="device in devices"
          :key="device.deviceId"
          :value="device.deviceId"
          >{{ device.label }}</option
        >
      </select>
      <v-btn @click="onCapture">
        Capture Photo
      </v-btn>
      <v-btn @click="onStop">
        Stop Camera
      </v-btn>
      <v-btn @click="onStart">
        Start Camera
      </v-btn>
      <v-btn @click="activeFrame = !activeFrame">frame</v-btn>
      <h2>Captured Image</h2>
      <div class="figure">
        <v-img :src="img" class="img-responsive"></v-img>
      </div>
    </div>
    <v-sheet>
      <div>deviceId : {{ deviceId }}</div>
      <div>device : {{ device }}</div>
      <div>devices : {{ devices }}</div>
    </v-sheet>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
import { find, head } from "lodash";
import framePlayImg from "@/assets/images/item/frame-1.png";
import frameResultImg from "@/assets/images/item/frame.png";
import VueCountdown from "@chenfengyuan/vue-countdown";
export default {
  name: "HelloWorld",
  components: {
    WebCam,
    VueCountdown
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      framePlayImg,
      frameResultImg,
      activeFrame: true
    };
  },
  computed: {
    device() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      let first = head(this.devices);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();

      this.loadingStage = true;
      this.page = 2;
      try {
        // boothShopId
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
    onError(error) {
      console.log("On Error Event", error);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main-card {
  background-color: black;
  height: 100%;
  width: 100%;
  .frame-img {
    z-index: 100;
    position: absolute;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
