import Vue from "vue";
import Anchor from "@theme/components/Anchor.vue";
import Comment from "@Comment";
import MyTransition from "@theme/components/MyTransition.vue";
import PageEdit from "@theme/components/PageEdit.vue";
import PageInfo from "@PageInfo";
import PageNav from "@theme/components/PageNav.vue";
import Password from "@theme/components/Password.vue";
export default Vue.extend({
    name: "Page",
    components: {
        Anchor,
        Comment,
        MyTransition,
        PageEdit,
        PageInfo,
        PageNav,
        Password,
    },
    props: { 
        sidebarItems: {
            type: Array,
            default: () => [],
        },
        headers: {
            type: Array,
            default: () => [],
        },
    },
    mounted(){
        this.$nextTick(()=>{
          const appid = 'cyuC5e9AH';
          const conf = 'prod_36e46c72bcc7bba4a58bc2cf99108dd5';
          const width = window.innerWidth || document.documentElement.clientWidth; 
          if (width < 960) {
            this.loadJs('changyan_mobile_js',"https://cy-cdn.kuaizhan.com/upload/mobile/wap-js/changyan_mobile.js", function () {
              window.changyan && window.changyan.api.config({ appid: appid, conf: conf })
            });
          }
          else{
          this.loadJs('changyan_pc_js',"https://cy-cdn.kuaizhan.com/upload/changyan.js", function () {
            window.changyan && window.changyan.api.config({ appid: appid, conf: conf })
          });
        }
        })
      },
      methods: {
        loadJs(changyanid,url, cb){
          try {
            const c = document.getElementsByTagName("head")[0] || document.head || document.documentElement;
            const b = document.createElement("script");
            b.setAttribute("type","text/javascript");
            b.setAttribute("charset","UTF-8");
            b.setAttribute("src", url);
            b.setAttribute("id", changyanid);
            if(window.attachEvent){
              b.onreadystatechange = function(){
                const e = b.readyState;
                if(e === "loaded" || e === "complete"){
                  b.onreadystatechange = null;
                  cb && cb();
                }
              }
            }else{
               if(cb){
                  b.onload = cb
               }
            }
            c.appendChild(b)
          } catch (error) {
            cb && cb();
          }
        }
      },
      beforeDestroy() {
        try {
          const removeRep = /^http(s)?\:\/\/changyan\./
          const $head = document.getElementsByTagName("head")[0] || document.head || document.documentElement;
          const $script = $head.querySelectorAll('script');
          $script.forEach((item, index) => {
            const src = item.getAttribute('src');
            if(src && removeRep.test(src)){
              $head.removeChild(item)
            }
          });
          for (const key in window) {
            if (/^(changyan(\d)?|cyan)/.test(key)){
              window[key] = undefined;
            }
          }
        } catch (error) {}
      },
    data: () => ({
        password: "",
    }),
    computed: {
        commentEnable() {
            return this.$frontmatter.comment !== false && this.$themeConfig.comment !== false;
        },
        pagePassword() {
            const { password } = this.$frontmatter;
            return typeof password === "number"
                ? password.toString()
                : typeof password === "string"
                    ? password
                    : "";
        },
        pageDescrypted() {
            return this.password === this.pagePassword;
        },
    },
});
