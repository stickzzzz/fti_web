import deployment from "./deployment.js";

export default {
  ssr: false,
  telemetry: false,
  server: {
    host: "localhost",
    port: 3001,
    // host:0.0.0.0

  },
  router: {
    base: "/"
    // base:"/fti"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.jpg" }
      // { rel: 'stylesheet', href: '../assets/font-awesome/css/font-awesome.min.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@fortawesome/fontawesome-free/css/all.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vue-mixins",
    "@/plugins/vue-components",
    { src: "@/plugins/axios", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "cookie-universal-nuxt"
  ],

  buildModules: ["@nuxtjs/vuetify"],

  vuetify: {
    treeShake: true,
    customVariables: ["~assets/styles/scss/_variables.scss"],

    defaultAssets: {
      icons: "mdi"
    },
    icons: {
      iconfont: "mdi"
    },
    lang: {
      locales: {
        // en: {
        //   noDataText: 'No Data'
        // }
      }
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: {
            lighten2: "#32485a",
            lighten1: "#193145",
            base: "#001B31",
            darken1: "#00182c",
            darken2: "#001527"
          },
          secondary: {
            lighten5: "#7f8d98",
            lighten2: "#f7bd62",
            lighten1: "#f5ab35",
            base: "#F4A21F",
            darken1: "#db911b",
            darken2: "#c38118"
          },
          tertiary: {
            lighten2: "#F3DB82",
            lighten1: "#CAAF4B",
            base: "#C0D4FF",
            darken1: "#876D0E",
            darken2: "#5C4800"
          },
          golden:{
            base:'#F2B135'
          },
          warning: {
            lighten2: "#E57373",
            lighten1: "#EF5350",
            base: "#F44336",
            darken1: "#E53935",
            darken2: "#D32F2F"
          }
        },
        dark: {
          primary: {
            lighten2: "#32485a",
            lighten1: "#193145",
            // base: "#021837",
            base: "#8E9EAE",
            darken1: "#00182c",
            darken2: "#001527"
          },
          background:{
            base:"#000000"
          }
          
        }
      }
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: "https://api.id4connect.com/cms/api/v1"
    baseURL: deployment.baseURL

  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
