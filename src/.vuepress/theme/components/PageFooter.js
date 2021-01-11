import Vue from "vue";
import MediaLinks from "@theme/components/MediaLinks.vue";
export default Vue.extend({
    name: "PageFooter",
    components: { MediaLinks },
    computed: {
        footerConfig() {
            return this.$themeConfig.footer || {};
        },
        enable() {
            const { copyrightText, footer, medialink } = this.$page.frontmatter;
            return (footer !== false &&
                Boolean(copyrightText || footer || medialink || this.footerConfig.display));
        },
        footerContent() {
            const { footer } = this.$page.frontmatter;
            return footer === false
                ? false
                : typeof footer === "string"
                    ? footer
                    : this.footerConfig.content || "";
        },
        copyright() {
            return this.$frontmatter.copyrightText === false
                ? false
                : this.$frontmatter.copyrightText ||
                    this.footerConfig.copyright ||
                    (this.$themeConfig.author
                        ? `Copyright © 2020 ${this.$themeConfig.author}`
                        : "");
        },
        
        footerLinks(){
            const links = this.footerConfig.links;
            return links;

        },

    },
    mounted() {
        this.initCNZZ();
     },
     methods: {
         initCNZZ() {
             //添加脚本
             const script = document.createElement('script');
             script.src = 'https://s4.cnzz.com/z_stat.php?id=1278535032&web_id=1278535032';
             script.language = 'JavaScript';
             script.id='cnzz';
             document.body.appendChild(script);
         }
     },
     watch: {
         '$route' () {
             if (window._czc) {
                 //监听路由变化
                 let location = window.location;
                 let contentUrl = location.pathname + location.hash;
                 let refererUrl = '/';
                 window._czc.push(['_trackPageview', contentUrl, refererUrl])
             }
         }
        }
});
