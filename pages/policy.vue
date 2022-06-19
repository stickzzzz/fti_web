<template>
  <div style="position:relative">
    <div class="">
      <v-img class="terms-bg" contain :src="terms_bg"></v-img>
    </div>
    <v-card
      class="mb-7 mx-2"
      color="transparent"
      style="position:fixed;bottom:5px"
      flat
    >
      <v-card
        class="main-card"
        color="black"
        style="opacity:0.8"
        height="230"
        scroll
        flat
      >
        <v-card-text class="my-2">
          <div>
            <span class="white--text" style="font-size:14px">{{
              policyTitle
            }}</span>
          </div>
          <div>
            <span style="font-size:12px" class="policy-text white--text">{{
              policyText
            }}</span>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="d-flex mt-3" color="transparent" flat>
        <v-btn class="mx-5" color="white" @click="cancel" width="40%"
          >ยกเลิก</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn class="mx-5" color="#00D0FF" @click="acceptPolicy" width="40%"
          >ตกลง</v-btn
        >
      </v-card>
    </v-card>
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
  </div>
</template>
<script>
import terms_bg from "@/assets/images/item/terms_bg.png";

export default {
  data() {
    return {
      policyTitle: "กติกาและเงื่อนไขการร่วมสนุก!",
      policyText:
        "โซนเซรามิก คลับ ฟลุท เทควันโดวันเวย์เทปเรซิ่นอิมพีเรียล วิดีโอมลภาวะโกเต็กซ์แทงกั๊ก อวอร์ดเกสต์เฮาส์ ไรเฟิลโทร แทคติคอีแต๋น ฮาร์ด แอ็คชั่นแบด นอร์ทผิดพลาดคอร์รัปชั่น แรงใจอุปทานไพลินเก๋ากี้ รวมมิตรฟรุตไลท์ไตรมาสแฟนตาซี ซีเรียส ทับซ้อนสต็อกราชบัณฑิตยสถาน จึ๊กมาร์ตสต๊อคเซลส์โต๋เต๋ เวสต์จีดีพีเธคคอนเทนเนอร์ รอยัลตี้ปิโตรเคมี เอ๊าะแฟรี่ดัมพ์แรงดูดยากูซ่า มอนสเตอร์วีเจพันธุวิศวกรรม ชัตเตอร์อะอิเลียดอินดอร์ ไชน่าแอปเปิลคีตกวีคาแรคเตอร์ สเปครีไซเคิลวีไอพีซิม คอมเพล็กซ์สะบึมอุปัทวเหตุนายแบบฟลุก บุญคุณ ซัมเมอร์ลิมิตอัลมอนด์มหภาคพลานุภาพ อพาร์ทเมนต์ ฮาราคีรีชาร์ตโทรโข่ง ลอร์ดเลคเชอร์แม่ค้ามาราธอน คาวบอยศึกษาศาสตร์ยนตรกรรม แพนด้าลาเต้พันธุวิศวกรรมวอลนัท ตะหงิดติวโนติสสเตอริโอ",
      terms_bg,
      cancelDialog:false
    };
  },
  methods: {
    acceptPolicy() {
      this.$cookies.set("fti_policy", true, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.$router.push("/");
    },
    cancel() {
        this.cancelDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.main-card {
  .terms-bg {
    position: absolute;
  }
}
.main-card {
  // position:fixed;bottom:5px
  overflow: auto;
  .policy-text {
    white-space: pre-wrap;
  }
}
</style>
