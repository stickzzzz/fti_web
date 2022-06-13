import Vue from "vue";
import { mapGetters, mapState } from "vuex";

Vue.mixin({
  data() {
    return {
      appRules: {
        required: v => !!v || "Required",
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(v) || "Invalid e-mail format (Ex. admin@mail.com)"
          );
        },
        minFiles: v => v.length > 0 || "Minimum 1 file",
        maxFiles: v => {
          return v.length <= 3 || "Maximun 3 files";
        },
        validPassword: v => {
          const pattern = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
          return (
            (v.length >= 8 && pattern.test(v)) ||
            "Password must contain at least 1 a-z A-Z, 1 digit and greater or equal to 8 characters"
          );
        },
        englishLetterAndNumber: v => {
          const pattern = /^[a-zA-Z0-9]+$/;
          return (
            pattern.test(v) || "รองรับตัวอักษรภาษาอังกฤษ และ ตัวเลขเท่านั้น"
          );
        },
        name: v => {
          const pattern = /^[ก-๏a-zA-Z\s.,\-_"()]+$/;
          return (
            pattern.test(v) ||
            "รองรับตัวอักษรภาษาไทย , ภาษาอังกฤษ , อักขระพิเศษ . , - ( ) "
          );
        },
        name2: v => {
          const pattern = /^[0-9ก-๏a-zA-Z/()[\]\\{}&*\s.,_\-]+$/;
          return (
            pattern.test(v) ||
            "รองรับตัวอักษรภาษาไทย , ภาษาอังกฤษ , ตัวเลข , อักขระพิเศษ . , - _ / ( ) [ ] { } & * เว้นวรรค "
          );
        },
        name3: v => {
          const pattern = /^[0-9ก-๏a-zA-Z/()[\]\\{}&*\s.,_\-"]+$/;
          return (
            pattern.test(v) ||
            'รองรับตัวอักษรภาษาไทย , ภาษาอังกฤษ , ตัวเลข , อักขระพิเศษ . , - _ / ( ) [ ] { } & * เว้นวรรค "" '
          );
        },
        nameA: v => {
          const pattern = /^[0-9ก-๏a-zA-Z/()[\]\\{}&*\s.,_\-]+$/;
          return (
            pattern.test(v) ||
            "รองรับตัวอักษรภาษาไทย , ภาษาอังกฤษ , ตัวเลข , อักขระพิเศษ . , - _ / ( ) [ ] { } & * เว้นวรรค "
          );
        },
        nameB: v => {
          const pattern = /^[0-9ก-๏a-zA-Z\s]+$/;
          return (
            pattern.test(v) ||
            "รองรับตัวอักษรภาษาไทย , ภาษาอังกฤษ , ตัวเลข เว้นวรรค "
          );
        },
        password: v => {
          const pattern = /^[0-9a-zA-Z/()[\]\\{}&*.,_\-]+$/;
          return (
            pattern.test(v) ||
            "รองรับตัวอักษรภาษาอังกฤษ , ตัวเลข , อักขระพิเศษ . , - _ / ( ) [ ] { } & * "
          );
        },
        time: v => {
          const pattern = /^([0-5][0-9]):([0-5][0-9]):([0-5][0-9])?$/;
          // const pattern = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
          return pattern.test(v) || "เวลาไม่ถูกต้อง";
        },
        limit10: v => {
          return v ? v.length <= 10 : false || "จำกัดตัวอักษรจำนวน 10 ตัว";
        },
        limit15: v => {
          return v ? v.length <= 15 : false || "จำกัดตัวอักษรจำนวน 15 ตัว";
        },
        limit20: v => {
          return v ? v.length <= 20 : false || "จำกัดตัวอักษรจำนวน 20 ตัว";
        },
        limit40: v => {
          return v ? v.length <= 40 : false || "จำกัดตัวอักษรจำนวน 40 ตัว";
        },
        limit50: v => {
          // console.log('v.length',v.length,v)
          return v ? !!v.length <= 50 : false || "จำกัดตัวอักษรจำนวน 50 ตัว";
        },
        limit100: v => {
          return v ? v.length <= 100 : false || "จำกัดตัวอักษรจำนวน 100 ตัว";
        },
        limit255: v => {
          return v ? v.length <= 255 : false || "จำกัดตัวอักษรจำนวน 255 ตัว";
        },
        limit1000: v => {
          return v ? v.length <= 1000 : false || "จำกัดตัวอักษรจำนวน 1000 ตัว";
        },
        limit5000: v => {
          return v ? v.length <= 5000 : false || "จำกัดตัวอักษรจำนวน 5000 ตัว";
        },
        limit10000: v => {
          return v
            ? v.length <= 10000
            : false || "จำกัดตัวอักษรจำนวน 10000 ตัว";
        },
        number: v => {
          const pattern = /^[0-9]+$/;
          return pattern.test(v) || "รองรับตัวเลขเท่านั้น";
        },
        limit3mb: file => {
          if (file) {
            // console.log(file);
            return file.size <= 3145728 || "ขนาดไฟล์สูงสุดไม่เกิน 3 MB";
          }
          return true;
        },
        limit20mb: file => {
          if (file) {
            // console.log(file);
            return file.size <= 20971520 || "ขนาดไฟล์สูงสุดไม่เกิน 20 MB";
          }
          return true;
        },
        limit500mb: file => {
          if (file) {
            // console.log(file);
            return file.size <= 524392857 || "ขนาดไฟล์สูงสุดไม่เกิน 500 MB";
          }
          return true;
        },
        youtube: v => {
          let arrayLink = v ? v.split(".") : [];
          for (let i = 0; i < arrayLink.length; i++) {
            if (arrayLink[i] == "youtube" || arrayLink[i] == "https://youtu") {
              return true;
            }
          }
          return false || "ลิงค์ youtube เท่านั้น";
        },
        webUrl: v => {
          const pattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
          return pattern.test(v) || "url ไม่ถูกต้อง";
        },

        passwordForm: v => {
          const pattern = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
          return (
            pattern.test(v) ||
            "รหัสผ่านต้องประกอบด้วยตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว และตัวเลขอย่างน้อย 1 ตัว รวมกันไม่น้อยกว่า 8 ตัวอักษร"
          );
        },
        minPassword: v => {
          // if (v.length >= 8) {
          //   return true;
          // }
          return (
            v.length >= 8 ||
            v.length <= 64 ||
            "รหัสผ่านต้องมีความยาวระหว่าง 8 - 64 ตัวอักษร"
          );
        },
        maxPassword: v => {
          // if (v.length >= 8) {
          //   return true;
          // }
          return v.length <= 64 || "รหัสผ่านต้องมีความยาวไม่ต่ำกว่า 8 ตัวอักษร";
        }
      }
    };
  },
  computed: {
    ...mapState([]),

    $breakpoint() {
      return this.$vuetify.breakpoint;
    },
    ...mapState(["isLoggedIn", "accessToken"]),
    ...mapGetters("text", ["t"])
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async getProfileDetail() {
      try {
        let res = await this.$axios.$get("/user/profile");
        // console.log("res", res);
        if (res?.code === 200) {
          this.$store.commit("set_account", res.responseObject);
        } else {
          throw res;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getTaskTotal() {
      try {
        let res = await this.$axios.$get(
          `/task/list?offset=0&max=-1&status=3&carRegistration=`
        );
        // console.log("res", res);
        // let res = { code: 200 };
        if (res?.code === 200) {
          const { taskList, total } = res.responseObject;
          this.$store.commit("set_request_task_total", total);
        }
      } catch (err) {
        console.error(err);
      }
    },
    parseBetweenDates(value1, value2) {
      // console.log({ value1, value2 });
      let output = "";
      let date1 = new Date(value1);
      let date2 = new Date(value2);

      let day1 = date1.getDate();
      let day2 = date2.getDate();
      let month1 = date1.getMonth();
      let month2 = date2.getMonth();

      let year1 = date1.getFullYear();
      let year2 = date2.getFullYear();

      // console.log({ day1, day2, month1, month2 });
      if (day1 === day2 && month1 === month2) {
        output = `${day1} ${this.parseLocaleMonth(value2)}`;
      } else if (day1 !== day2 && month1 === month2) {
        output = `${day1}-${day2} ${this.parseLocaleMonth(value2)}`;
      } else {
        output = `${day1} ${this.parseLocaleMonth(
          value1
        )} - ${day2} ${this.parseLocaleMonth(value2)}`;
      }
      // if(month1 === month2) {
      //     return this.parseLocaleDate(date1)
      // }

      return output;
    },
    parseLocaleMonth(date, month = "short", year = "numeric") {
      if (date) {
        let locale = "th-TH";
        // switch (this.$store.$i18n.locale) {
        switch ("en") {
          case "th":
            locale = "th-TH";
            return `${new Date(date).toLocaleDateString(locale, {
              year: year,
              month: month
            })}`;

          default:
            locale = "en-EN";
            return `${new Date(date).toLocaleDateString(locale, {
              year: year,
              month: month
            })}`;
        }
      }
      return "";
    },
    parseSingleDatesBuddhist(date) {
      let output = "";
      let date1 = new Date(date);
      let day1 = date1.getDate();
      date1.setFullYear(date1.getFullYear() + 543);
      // date1.setFullYear(date.getFullYear() + 1);

      return `${day1} ${this.parseLocaleMonth(date1)}`;
    },
    parseSingleDatesCE(date) {
      // console.log('to CE 1',date)
      
      // let date1 = new Date(date).toLocaleDateString("en-EN");
      // console.log('to CE 2',date1)
      let d = date.split("/");
      return `${d[2]-543}-${d[1]}-${d[0]}`;
    },
    parseSingleDatesBE(date) {
      // console.log('to BE1',date)
      let date1 = new Date(date).toLocaleDateString("th-TH");
      // console.log('to BE 2',date)
      let d = date1.split("/");
      // console.log('to BE 3',d)
      return [d[2],d[1],d[0]]
    },

  }
});
