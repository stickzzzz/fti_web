<template>
  <v-app>
    <!-- <v-content> -->
    <v-fade-transition>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="display-3 font-weight-bold">
              Code
              <span class="primary--text">{{error.statusCode}}</span>
            </h1>
            <!-- <h2 class="display-2">Something went wrong</h2> -->
            <h2 class="display-1 grey--text">{{message}}</h2>
          </v-col>
          <!-- <v-col cols="12" md="8" class="text-center">
          <v-btn text @click="back()" color="primary" x-large>Back</v-btn>
          <v-btn text to="/" color="primary" x-large>Home</v-btn>
          </v-col>-->
        </v-row>
      </v-container>
    </v-fade-transition>
    <!-- </v-content> -->
  </v-app>
</template>

<script>
export default {
  name: "ErrorLayout",
  props: ["error"],
  data: () => ({
    drawer: null,
    message: "",
    // menuItems: [
    //   {
    //     text: "แดชบอร์ด",
    //     icon: "mdi-view-dashboard-outline",
    //     to: {
    //       path: "/dashboard"
    //     }
    //   },
    //   {
    //     text: "บริษัทของฉัน",
    //     icon: "mdi-domain",
    //     active: false,
    //     items: [
    //       {
    //         text: "ตั้งค่า",
    //         icon: "mdi-cog",
    //         to: {
    //           path: "/company/settings"
    //         }
    //       },
    //       {
    //         text: "สาขา",
    //         icon: "mdi-source-branch",
    //         to: {
    //           path: "/company/branches"
    //         }
    //       },
    //       {
    //         text: "แผนก",
    //         icon: "mdi-lan",
    //         to: {
    //           path: "/company/departments"
    //         }
    //       },
    //       {
    //         text: "ตำแหน่ง",
    //         icon: "mdi-briefcase-outline",
    //         to: {
    //           path: "/company/positions"
    //         }
    //       },
    //       {
    //         text: "ผู้ใช้งานระบบ",
    //         icon: "mdi-account-multiple-outline",
    //         to: {
    //           path: "/users"
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     text: "สมาชิก",
    //     icon: "mdi-account-group",
    //     to: {
    //       path: "/employees"
    //     }
    //   },
    //   {
    //     text: "หลักสูตร",
    //     icon: "mdi-book-open",
    //     to: {
    //       path: "/courses"
    //     }
    //   },
    //   {
    //     text: "คำถามที่พบบ่อย",
    //     icon: "mdi-frequently-asked-questions",
    //     to: {
    //       path: "/faq"
    //     }
    //   },
    //   {
    //     text: "ข่าวสารประชาสัมพันธ์",
    //     icon: "mdi-newspaper",
    //     to: {
    //       path: "/news"
    //     }
    //   },
    //   {
    //     text: "ติดต่อเรา",
    //     icon: "mdi-account-box-outline",
    //     to: {
    //       path: "/contact"
    //     }
    //   }
    // ],
    items: [
      { icon: "mdi-lightbulb_outline", text: "Notes" },
      { icon: "mdi-touch_app", text: "Reminders" },
      { divider: true },
      { heading: "Labels" },
      { icon: "mdi-add", text: "Create new label" },
      { divider: true },
      { icon: "mdi-archive", text: "Archive" },
      { icon: "mdi-delete", text: "Trash" },
      { divider: true },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-chat_bubble", text: "Trash" },
      { icon: "mdi-help", text: "Help" },
      { icon: "mdi-phonelink", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Keyboard shortcuts" }
    ]
  }),
  mounted() {
    switch (this.error.statusCode) {
      case 404:
        this.message = "ไม่พบหน้านี้";
        break;

      default:
        this.message = this.error.message;
        break;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
#app .v-navigation-drawer__border {
  /* display: none; */
}
</style>