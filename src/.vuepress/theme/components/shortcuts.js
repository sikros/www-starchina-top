import Vue from "vue";
import MyTransition from "@theme/components/MyTransition.vue";
import NavLink from "@theme/components/NavLink.vue";
import { navigate } from "@theme/util/navigate";
import qs from 'qs';
var axios = require('axios')

export default Vue.extend({   
    data() {
        return {
            shortcuts: 'null',
        };
      },
    name: "shortcuts",    
    async beforeMount() {
        this.shortcuts=(await axios({
            url: "https://api.starchina.top/shortcuts/version",    
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "APPCODE ba56f9529079467f9b07b4fd02b522fd" },
            method: 'POST',
            data: qs.stringify({
                name: 'all'
            })
        })).data.shortcuts
    },
    components: { MyTransition, NavLink },
    computed: {
        actionLinks() {
            const { action } = this.$frontmatter;
            if (Array.isArray(action))
                return action;
            return [action];
        },
    },
    methods: {
        navigate(link) {
            navigate(link, this.$router, this.$route);
        },
    },
});
