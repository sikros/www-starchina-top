---
icon: page
title: 从零开始用云开发平台部署VuePress博客
author: Kim
time: 2020-12-25
category: 技术交流
tag:
  - 云开发
  - vuejs
  - vuepress
---

## 什么是云开发平台

[阿里云云开发平台](https://workbench.aliyun.com/?source=5176.11533457&userCode=ixqnlu7p) 是一个面向开发者和中小企业打造的一站式、全云端的开发平台，打开浏览器就可以开发、调试、上线，所测即所得。

- 若您没有阿里云云开发平台账号可以 [点击这里注册](https://workbench.aliyun.com/?source=5176.11533457&userCode=ixqnlu7p)

## 创建应用

首先我们进入 [云开发平台控制台](https://workbench.aliyun.com/application?source=5176.11533457&userCode=ixqnlu7p) 创建一个团队。

![2020-12-25-00-19-55](https://oss.starchina.top/imgs/2020-12-25-00-19-55_62ba22c5.png)

然后进入到 **产品列表** 页面，系统会创建一个默认产品 [^产品] ，我们可以直接使用这个产品，也可以新建一个产品

::: tip

如果没有看到默认产品或上方提示 ==您需要为云开发平台进行服务授权,才能进行应用的部署调试！== 请先点击 **前往授权** ，给予相关的权限

:::


![2020-12-25-00-32-30](https://oss.starchina.top/imgs/2020-12-25-00-32-30_7a4de76a.png)


然后我们为产品新建一个应用，开发语言选择 **NodeJs** , 计算服务选择 **FC** [^FC], 解决方案选择 **空应用** ，并根据系统提示开启相应的云服务。

![2020-12-25-00-20-52](https://oss.starchina.top/imgs/2020-12-25-00-20-52_918bd931.png)

::: tip 提示

云服务是按量收费的，会在应用部署上线之后开启计费，若不再使用别忘了及时下线

参考价格如下：

API网关[^API]/API Gateway 0.06元/万次

函数计算[^FC]/Function Compute 0.0133元/万次

对象存储[^OSS]/Object Storage Service 0.12元/GB/月

日志服务[^SLS]/Log Service 0.0115元/GB/天

:::

## 开发部署

应用创建完成后，点击 ==开发部署== 进入到Cloud IDE开发环境

![2020-12-25-00-57-13](https://oss.starchina.top/imgs/2020-12-25-00-57-13_47fda63a.png)

将下方的控制台切换到 ==终端== 页面,依次输入以下命令：

```bash 
npm init
npm install -D vuepress
```

等待命令执行完成，我们VuePress程序就已经安装成功了，之后我们建立一个叫docs的目录用来存放文章，并写入我们的第一篇文章

```bash 
mkdir docs
echo '# Hello World' > docs/README.md
```

然后我们修改几处配置

打开 `/package.json` ，找到 `scripts` 键，将其中的值修改为： 

```json
{
  "build": "vuepress build docs"
}
```

新建一个 `/docs/.vuepress/config.js` 文件，内容为：

```javascript
module.exports = {
  title: "网站标题",
  base: "/dist/",
  dest: "./dist",
}
```

打开 `/serverless.js` 文件，查找 `/index.html` 修改为 `/dist/index.html`

打开 `.workbench` 文件，查找 `&& npm install --production` 在其后方插入 `&& npm run build `

修改完成后点击 **文件** 菜单里的 **保存全部**

## 应用上线 

将左侧的控制台切换到部署测试页(左上角的第一个按钮)，点击 **部署** ，等待全部操作完成

部署完成后阿里云会给我们提供一个临时域名用来测试系统，这时我们访问这个域名就可以打开部署好的VuePress系统。

![2020-12-25-01-48-35](https://oss.starchina.top/imgs/2020-12-25-01-48-35_13e892f2.png)

但此域名的有效期很短不能用于正式环境，我们需要返回到第一步中的应用列表页，点击 **应用配置** 在其中绑定我们自己的域名，并将绑定的域名CNAME记录解析到控制台里显示的二级域名上即可。

至此一套基于云开发平台的博客网站搭建完成，最后提醒一下如果搭建的系统不再使用，一定要在应用列表中下线应用，以免产生多余的费用

下线方法是，点击对应环境后面的switch，将其调成offline状态

![2020-12-25-01-56-52](https://oss.starchina.top/imgs/2020-12-25-01-56-52_3111254d.png)

这就是一个阿里云开发平台产品的完整生命周期，对云开发感兴趣的朋友除了关注本站资讯外也可以参加阿里云近期举办的云开发Web应用实战营  [打开报名链接](https://developer.aliyun.com/learning/trainingcamp/web/2?taskCode=web1218&recordId=313303&userCode=ixqnlu7p)

*相关概念:*

[^产品]: 产品就是我们整个网站或服务的容器，其中我们可以建立若干应用，同一服务下的应用都具有内网通信能力并且可以建立逻辑关系。
[^FC]: FC即阿里云函数计算(Function Compute)是事件驱动的全托管计算服务。通过函数计算，您无需管理服务器等基础设施，只需编写代码并上传。函数计算会为您准备好计算资源，以弹性、可靠的方式运行您的代码，并提供日志查询、性能监控、报警等功能。
[^API]: API网关（API Gateway），提供API托管服务，覆盖设计、开发、测试、发布、售卖、运维监测、安全管控、下线等API各个生命周期阶段。可以帮助您更快构建以API为核心的系统架构，满足新系统引入，系统劫持、业务中台等诸多场景需要。
[^OSS]:对象存储OSS（Object Storage Service）是阿里云提供的海量、安全、低成本、高持久的云存储服务
[^SLS]:日志服务（Log Service，简称SLS）是针对日志类数据的一站式服务，在阿里巴巴集团经历大量大数据场景锤炼而成。您无需开发就能快捷完成日志数据采集、消费、投递以及查询分析等功能，提升运维、运营效率，建立DT时代海量日志处理能力。