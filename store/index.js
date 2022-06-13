import { log } from "util";

export const strict = false;

const DEFAULT_TIMEOUT = 5000;

export const state = () => ({
  version: "1.8.6",
  isLoggedIn: false,
  accessToken: "",
  locale: "th",
  locales: ["th", "en"],
  snackbar: false,
  snackbarText: "",
  snackbarPosition: "top",
  snackbarDuration: DEFAULT_TIMEOUT,
  snackbarTimeout: null,
  currentPermission: null,
  timePushNotification: 15,
  menuValidate: {},
  faqCount: 0,
  categoryId: 0,
  newNotificationNumber: 0,
  requestTaskTotal:0,
  account: {
    company: {
      contact: "",
      corpId: "",
      dateCreate: "",
      email: "",
      enabled: false,
      id: null,
      initials: "",
      lastUpdate: "",
      logo: "",
      name: "",
      tel: "",
      initials: "",
      theme: {},
      thumbnailImage: ""
    },
    user: { id: 0 },
    userVersion: null
  },
  menuFormMixin: [],
  menuItemsGlobalStore: [],
  menuItems: [
    {
      text: "แดชบอร์ด",
      icon: "mdi-view-dashboard-outline",
      keyPage: "dashboard",
      level: 1,
      alertCount: false,
      to: {
        path: "/dashboard"
      }
    },
    {
      text: "ผู้ใช้ระบบ",
      icon: "mdi-account-multiple-outline",
      keyPage: "listBackendUser",
      level: 1,
      alertCount: false,
      to: {
        path: "/admins"
      }
    },
    {
      text: "รายชื่อช่าง",
      icon: "mdi-account-group",
      keyPage: "none",
      level: 1,
      alertCount: false,
      to: {
        path: "/technicians"
      }
    },
    {
      text: "รายการรถ",
      icon: "mdi-car",
      keyPage: "none",
      level: 1,
      alertCount: false,
      to: {
        path: "/cars"
      }
    },
    {
      text: "คำขอใบงานใหม่",
      icon: "mdi-image-auto-adjust",
      keyPage: "none",
      level: 1,
      alertCount: true,
      to: {
        path: "/request-task"
      }
    },
    {
      text: "รายการใบงาน",
      icon: "mdi-content-paste",
      keyPage: "none",
      level: 1,
      alertCount: false,
      to: {
        path: "/task"
      }
    },
    {
      text: "เตือนความจำ",
      icon: "mdi-bell-ring",
      keyPage: "none",
      level: 1,
      alertCount: false,
      to: {
        path: "/reminder"
      }
    },
    {
      text: "รายงาน",
      icon: "mdi-export-variant",
      keyPage: "none",
      level: 1,
      alertCount: false,
      to: {
        path: "/report"
      }
    },
    {
      text: "ข้อมูล",
        icon: "mdi-tablet-dashboard",
      keyPage: "none",
      level: 2,
      items: [
        {
          text: "ประเภทรถ",
          icon: "",
          keyPage: "none",
          to: {
            path: "/master/car-type"
          }
        },
        {
          text: "ยี่ห้อรถ",
          icon: "",
          keyPage: "none",
          to: {
            path: "/master/brand"
          }
        },
        {
          text: "รุ่นรถ",
          icon: "",
          keyPage: "none",
          to: {
            path: "/master/model"
          }
        },
        {
          text: "สีรถ",
          icon: "",
          keyPage: "none",
          to: {
            path: "/master/color"
          }
        },
        {
          text: "อะไหล่รถ",
          icon: "",
          keyPage: "none",
          to: {
            path: "/master/spare-part"
          }
        }
      ]
    }
  ]
});

export const getters = {
  //
};

export const actions = {
  async openSnackbar({ commit, dispatch, state }, payload) {
    // console.log('openSnackbar')
    commit("set_snackbar_state", payload);
  },

  closeSnackbar({ state, commit }) {
    commit("close_snackbar");
  }
};

export const mutations = {
  async set_logging_in(state, value) {
    state.loggingIn = value;
  },

  set_token(state, payload) {
    state.accessToken = payload.accessToken;
  },

  async set_auth(state, value) {
    state.isLoggedIn = true;
    state.accessToken = value;
  },

  async remove_auth(state) {
    state.isLoggedIn = false;
    state.accessToken = "";
  },

  set_snackbar_state(state, payload) {
    if (state.snackbar == true) {
      state.snackbar = false;
      state.snackbarText = "";
      clearTimeout(state.snackbarTimeout);
      // state.snackbarDuration = DEFAULT_TIMEOUT;
    }

    setTimeout(() => {
      if (typeof payload === "string") {
        state.snackbar = true;
        state.snackbarText = `<div>${payload}</div>`;
        state.snackbarTimeout = setTimeout(() => {
          state.snackbar = false;
          state.snackbarText = "";
        }, DEFAULT_TIMEOUT);
      } else if (typeof payload === "object") {
        if (
          payload.hasOwnProperty("duration") &&
          payload.duration !== DEFAULT_TIMEOUT
        ) {
          state.snackbarDuration = payload.duration;
        } else {
          // console.log(payload.duration);
          state.snackbarDuration = DEFAULT_TIMEOUT;
          state.snackbarTimeout = setTimeout(() => {
            state.snackbar = false;
            state.snackbarText = "";
          }, DEFAULT_TIMEOUT);
        }

        // console.log(state.snackbarDuration);

        var header = "";
        let type = payload.type;
        switch (payload.type) {
          case "error":
            header = "เกิดข้อผิดพลาด";
            break;
          case "warning":
            header = "คำเตือน";
            break;
          case "success":
            header = "สำเร็จ";
            break;
          case "notification":
            header = "แจ้งเตือนใหม่";
            type = "success";
            break;
          default:
            break;
        }
        state.snackbarPosition = payload.position ? payload.position : "top";
        // console.log("type", type);
        state.snackbarText = `<strong class="${
          type ? type : "white"
        }--text">${header}</strong>
                <div class="black--text py-2">${payload.message}</div>`;
        state.snackbar = true;
      }
    }, 500);
  },
  reset_snackbar(state) {
    state.snackbar = false;
    state.snackbarText = "";
    state.snackbarDuration = DEFAULT_TIMEOUT;
  },

  close_snackbar(state) {
    state.snackbar = false;
    state.snackbarText = "";
    state.snackbarDuration = DEFAULT_TIMEOUT;
  },

  set_account(state, value) {
    state.account = value;
  },
  set_request_task_total(state, value) {
    state.requestTaskTotal = value;
  },
  set_permission(state, value) {
    state.currentPermission = value;
  },
  get_permission(state, key) {
    // console.log("get_permission");
    try {
      let accesses = state.currentPermission.accesses
        ? state.currentPermission.accesses
        : [];
      for (let i = 0; i < accesses.length; i++) {
        for (let j = 0; j < accesses[i].pages.length; j++) {
          if (accesses[i].pages[j].keyPage == key) {
            state.menuValidate[key] = accesses[i].pages[j].access;
          }
        }
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  set_faqCount(state, value) {
    state.faqCount = value;
  }
};
