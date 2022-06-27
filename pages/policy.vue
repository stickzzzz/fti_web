<template>
  <!-- <div style="position:relative;height: 100%;"> -->
  <!-- :style="`backgroundImage:url(${terms_bg})`" -->
  <!-- " -->
  <!-- style="overflow: hidden;"
    :style="`height:${screenHieight}px`" -->
  <div class="policy-page">
    <div class="d-flex" style="" :style="`height:auto`">
      <v-img class="terms-bg" :src="terms_bg"></v-img>
    </div>
    <!-- <div
      class="mb-7 mx-2"
      color="transparent"
      flat
    > -->
    <!-- :style="`height:calc(${screenHieight}px - 360px)`" -->

    <v-card class="main-card" color="transparent" flat>
      <v-card
      class="mx-3 mt-3 pa-2 detail-box"
        color="#404040"
        style="opacity:0.8;overflow: auto;"
        scroll
        :height="screenHieight-455"
      >
        <div
          v-for="(text, i) in policyTexts"
          :key="i"
          class="white--text"
          :style="
            `${
              text.isTopic
                ? 'font-size:14px'
                : 'font-size:12px;margin-bottom:5px'
            } `
          "
        >
          {{ text.text }}
        </div>
      </v-card>
      <v-card-actions class="ma-2">
        <v-btn class="mx-5" color="white" @click="cancel" width="120"
          >ยกเลิก</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          class="mx-5 white--text"
          color="primary"
          @click="acceptPolicy"
          width="120"
          >ยอมรับ</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- </div> -->
    <v-dialog
      v-model="cancelDialog"
      max-width="480"
      transition="fade-transition"
      persistent
    >
      <v-card>
        <v-card-title>การยินยอมเงื่อนไขการใช้งาน</v-card-title>
        <v-card-text>
          ท่านต้องยินยอมเงื่อนไขการใช้งานเว็บไซต์ เพื่อเข้าร่วมเล่นเกม
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary" :ripple="false" @click="cancelDialog = false">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- </div> -->
  </div>
</template>
<script>
import terms_bg from "@/assets/images/item/policy_bg.png";

export default {
  data() {
    return {
      policyTitle: "กติกาและเงื่อนไขการร่วมสนุก!",
      policyTexts: [
        {
          text: "นโยบายความเป็นส่วนตัว",
          isTopic: true
        },
        {
          text:
            "ทางเราจำเป็นต้องประมวลผลจากกล้องเพื่อดำเนินการสุ่มรางวัลให้คุณจากระบบหลังบ้านซึ่งจะไม่เปิดเผยข้อมูลของคุณให้กับบุคคลอื่นๆ หลังจากประมวลผลทางคอมพิวเตอร์เสร็จทางระบบหลังบ้านของเราได้ลบรูปภาพของคุณทันที ไม่ได้เก็บรูปภาพของคุณ และ เราจำเป็นต้องเข้าถึง Cookie เพื่อจะบันทึกประวัติการร่วมสนุกและของรางวัลที่คุณได้รับ เพื่อประสบการณ์ที่ดีในการร่วมสนุกกับกิจกรรมของเรา",
          isTopic: false
        },
        {
          text: "วิธีการร่วมสนุกกับกิจกรรม",
          isTopic: true
        },
        {
          text:
            "ส่องกล้องหาของขวัญภายในงาน ภายใน 60 วินาที ถ้าคุณได้รับของรางวัล คุณจำเป็นต้องบันทึกรูปภาพหรือ Cap screen หน้าจอเพื่อเอารูปไปรับรางวัลตามที่กำหนด",
          isTopic: false
        },
      ],
      terms_bg,
      cancelDialog: false,
      screenHieight: window.innerHeight
    };
  },
  methods: {
    acceptPolicy() {
      this.$cookies.set("fti_policy", true, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.$router.push(`/${this.$store.state.boothShopCode}${this.$store.state.isByPass?'__1':''}`);
    },
    cancel() {
      this.cancelDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.policy-page {
  .terms-bg {
    //   position: absolute;
  }
  .main-card {
    // position:fixed;bottom:5px
    // overflow: auto;
    .policy-text {
      white-space: pre-wrap;
    }
    .detail-box{
        // height:calc(50% - 50px) !important;
        // height: 50%;
    }
  }
}
</style>
