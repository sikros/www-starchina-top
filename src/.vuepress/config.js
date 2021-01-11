const { config } = require("./theme/index.js");
module.exports = config({
  title: "星晨网络",
  base: "/",
  dest: "./dist",
  editLinks: false,

  head: [
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.production.min.js" }],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js" }],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.min.js" }],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js" }],
    ["script", { src: "https://cdn.bootcdn.net/ajax/libs/babel-standalone/6.7.7/babel.min.js" }],
    ["link", { rel: "stylesheet", href: "https://cdn.bootcdn.net/ajax/libs/element-ui/2.14.1/theme-chalk/index.min.css" }],

  ],

  plugins: [
    ['fulltext-search'],
    ['@vuepress/active-header-links'],
    ['@vuepress/plugin-nprogress'],
    ['@vuepress/plugin-medium-zoom'],
    ['@vuepress/vuepress-plugin-baidu-autopush'],
    ['@vuepress/vuepress-plugin-qihu-autopush'],
    ['qrcode',{
      labelText:'📱'}],
    ['vuepress-plugin-helper-live2d', {
        log: false,
        live2d: {
          enable: true,
          model: 'miku',
          display: {
            position: "right",
            width: 165,
            height: 300,
            hOffset: 65,
            vOffset: 0,
          },
          mobile: {
            show: false
          },
          react: {
            opacity: 0.8
          }
        }
      }]
  ],

  themeConfig: {
    baseLang: "zh-CN",
    logo: "/logo.svg",
    author: "星晨网络",
    hostname: "https://www.starchina.top/",
    sitemap: {
      hostname: "https://www.starchina.top/"
    },
    nav: [
      { text: "主页", link: "/", icon: "home" },
      { text: "项目", link: "/home/", icon: "projectfeed" },
      { text: "快捷指令", link: "/shortcuts/", icon: "layers" },
      { text: "购物站", link: "http://shop.starchina.top/", icon: "shop" },
    ],

    locales: {
      "/en/": {
        nav: [
          { text: "Home", link: "/en/", icon: "home" },
          { text: "Project", link: "/en/home/", icon: "home" },
          { text: "Shortcuts", link: "/en/shortcuts/", icon: "layers" },
          { text: "Shop", link: "http://shop.starchina.top/", icon: "shop" },
        ],
      },
    },
    pageInfo: ['Author', 'Category', 'Tag', 'ReadTime'],
    blog: {
      intro: "https://blog.starchina.top/",
      sidebarDisplay: "mobile",
    },

    comment: {
      type: "valine",
      appId: "QQ2MAL1WmncHjW4iAhEQJKRm-gzGzoHsz",
      appKey: "vbTHxS8cUmKJTW12uDPQcF1O",
    },

    copyright: {
      status: "global",
    },

    footer: {
      display: true,
      links: [
        { text: "关于我们", link: "/aboutus/" }, { text: "海外镜像", link: "https://web.starchina.top/" },
      ],
      content: "<a href='http://beian.miit.gov.cn/' target='_blank'>津ICP备19012047号-1</a>",
      copyright: "Copyright <a href='https://miniapp.aliwork.com/auth?BACK_URL=%2Fvisit.html%3FcorpId%3Ddinge10bc56ab551e1c335c2f4657eb6378f%26appCode%3DPLUS_EQBSH810LK21BJ0HE87I%26token%3D83becd12e4d3e81f6ef8b2cd3104157d&authCorpId=dinge10bc56ab551e1c335c2f4657eb6378f' target='_blank'>©星晨网络</a> by <a href='/license/' target='_blank'>MIT Licensed</a>"
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      showInstall: false,
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ]
      },
    },

  },
});
