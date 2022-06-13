<template>
  <div v-if="modal" :class="contentClass">
    <slot name="button" :open="openDialog">
      <v-btn
        v-if="!hide"
        small
        depressed
        color="red lighten-2"
        dark
        @click.stop="openDialog()"
        >Confirm</v-btn
      >
    </slot>
    <v-dialog
      v-model="confirmDialog"
      max-width="480"
      transition="fade-transition"
      persistent
    >
      <v-card v-if="wordingConfirm">
        <v-card-title class="title">{{ config.header }}</v-card-title>
        <v-card-text>
          <div class="d-flex justify-center">
            <div class="ma-auto my-2">กรุณากรอกตัวเลขเพื่อยืนยันการกดปุ่ม</div>
          </div>
          <div class="d-flex justify-center">
            <div class="primary--text title my-2">{{ randomNum }}</div>
          </div>
          <v-text-field
            v-model="wording"
            dense
            outlined
            v-mask="'######'"
            :label="t('กรุณากรอกตัวเลขเพื่อยืนยันการกดปุ่ม')"
            hide-details
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false" :ripple="false">{{
            t("cancel")
          }}</v-btn>
          <v-btn
            color="primary white--text"
            depressed
            :ripple="false"
            :disabled="wording != randomNum"
            @click.stop="confirm"
            >{{ t("confirm") }}</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="title">{{ config.header }}</v-card-title>
        <v-card-text>
          <div v-html="config.message"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="confirmDialog = false" :ripple="false">{{
            t("cancel")
          }}</v-btn>
          <v-btn
            color="primary white--text"
            depressed
            :ripple="false"
            @click.stop="confirm"
            >{{ t("confirm") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-dialog
    v-else
    v-model="confirmDialog"
    max-width="480"
    transition="fade-transition"
  >
    <template v-slot:activator="{ on }">
      <slot name="button" v-bind:open="on">
        <v-btn small depressed color="red lighten-2" dark v-on="on"
          >Confirm</v-btn
        >
      </slot>
    </template>

    <v-card>
      <v-card-title class="title">{{ config.header }}</v-card-title>
      <v-card-text>
        <div>{{ config.message }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" :ripple="false">{{ t("no") }}</v-btn>
        <v-btn
          color="primary white--text"
          depressed
          :ripple="false"
          @click="confirm()"
          >{{ t("confirm") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ConfirmDialog",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: Boolean
    },
    contentClass: {
      type: String,
      default: "d-inline-block"
    },
    modal: {
      // TRUE: external dialog activator
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      required: true
    },
    confirmFunc: {
      type: Function,
      required: false
    },
    hide: {
      type: Boolean,
      default: false
    },
    wordingConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmDialog: false,
      wording: "",
      randomNum: 0
    };
  },
  watch: {
    value(to, from) {
      // console.log(to);
    },
    confirmDialog(to) {
      this.randomNumber();
    }
  },
  methods: {
    openDialog() {
      setTimeout(() => {
        this.confirmDialog = true;
      });
    },
    async randomNumber() {
      let num = Math.floor(100000 + Math.random() * 900000);
      this.randomNum = num;
    },
    async confirm() {
      try {
        let res = await this.$emit("confirm");
        this.confirmDialog = await false;
      } catch (err) {
        console.error(err);
      }
    },
    async cancel() {
      try {
        let res = await this.$emit("cancel");
        this.confirmDialog = await false;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
