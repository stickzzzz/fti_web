<template>
  <div style="position:relative;height:auto">
    <!-- :style="`backgroundImage:url(${terms_bg})`" -->

    <div class="policy-page" style="height:100%">
      <div class="" style="">
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
            <v-btn
              class="primary"
              :ripple="false"
              @click="cancelDialog = false"
            >
              ตกลง
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import terms_bg from "@/assets/images/item/terms_bg.png";

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
        }
      ],
      terms_bg,
      cancelDialog: false
    };
  },
  methods: {
    acceptPolicy() {
      this.$cookies.set("fti_policy", true, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.$router.push(`/${this.$store.state.boothShopCode}`);
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
    overflow: auto;
    .policy-text {
      white-space: pre-wrap;
    }
  }
}
</style>
