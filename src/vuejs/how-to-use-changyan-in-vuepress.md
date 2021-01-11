---
icon: page
title: 如何在VuePress中使用畅言云评论
author: Kim
time: 2020-12-17
category: 技术交流
tag:
  - vue.js
  - 云评
  - vuepress
---

## 为什么会选择畅言云评论

VuePress是一套静态渲染的建站系统，静态站点本身是脱离数据库支撑的，所以像评论这种需要动态支持的功能就需要借助三方功能，现在主流的解决方案是使用Valine插件，这个插件虽然简单易用，但是功能也较少，所以我想到了国内的一套非常优秀的社会化评论插件畅言云评论。

## 如何引入畅言云评论

虽然畅言云评论本身并没有提供Vue.js的安装包，但是由于js本身的良好扩展性，我们仍然可以在vue.js系统中使用本系统。

1. 注册畅言云评论

首先到 http://changyan.kuaizhan.com/ 注册账号，然后登录到后台**代码安装**页面，记录下appid和conf的值。

![2020-12-16-23-24-13](https://oss.starchina.top/imgs/2020-12-16-23-24-13_1612a8c6.png)

2. 在VUE文件中插入图层
找到需要使用评论的页面模板文件，VuePress的模板文件通常由3个文件构成，他们通常位于.vuepress/theme 文件夹中：
- .vue代表页面布局
- .js 是TypeScript或JavaScript脚本
- .d.ts 是TypeScript 的类型定义

我们首先修改.vue文件，在适当的位置插入以下代码，这里我用了文件路径作为sid值，如果你的页面中有其他唯一值也可以替换掉:sid=后面的变量。

```html
<div id="SOHUCS" :sid="$route.path" />
```

3. 修改脚本文件
打开与.vue文件同名的.js文件，在export default Vue.extend({ 后添加以下代码：

```js
    mounted(){
        this.$nextTick(()=>{
          const appid = '第一步中记录的appid';
          const conf = '第一步中记录的conf';
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
      }

```


至此安装完成，效果见本页面。