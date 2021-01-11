import Vue from "vue";
import MyTransition from "@theme/components/MyTransition.vue";

var axios = require('axios')
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

async function apiAxios(method, url, params) {
    if (params) {
        params = filterNull(params)
    }
    await axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        withCredentials: false
    })
        .then(res => {
            return res.data
        })
}


export default Vue.extend({
    data() {
        return {
            description: null,
        };
      },
    name: "BlogHero",
    async beforeMount() {
        this.description=(await axios({
            url: "https://v1.hitokoto.cn/",    
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            method: 'get'
        })).data.hitokoto
        
    },

    components: { MyTransition },
    computed: {
        heroImageStyle() {
            const defaultStyle = {
                maxHeight: "180px",
                margin: this.$frontmatter.showTitle === false
                    ? "6rem auto 1.5rem"
                    : "1rem auto",
            };
            return {
                ...defaultStyle,
                ...this.$frontmatter.heroImageStyle,
            };
        },
        bgImageStyle() {
            const defaultBgImageStyle = {
                height: "350px",
                textAlign: "center",
                overflow: "hidden",
            };
            const { bgImageStyle = {} } = this.$frontmatter;
            return {
                ...defaultBgImageStyle,
                ...bgImageStyle,
            };
        },
    },
});
