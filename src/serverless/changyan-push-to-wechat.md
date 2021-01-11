---
icon: page
title: 让畅言云评论实时推送给微信
author: Kim
time: 2020-12-17
category: 技术交流
tag:
  - 云开发
---

## 使用工具

- 畅言云评论 [点击注册](https://changyan.kuaizhan.com/)
- 阿里云函数 [点击注册](https://www.aliyun.com/product/fc?source=5176.11533457&userCode=ixqnlu7p)
- 企业微信 [点击下载](https://work.weixin.qq.com/)

## 企业微信部分设置

进入企业微信，新建一个群，创建一个机器人，并记录下机器人的WebHook地址。这个地址通常是这样的： ==https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx-xxx-xxx-xxx==

![2020-12-17-14-38-04](https://oss.starchina.top/imgs/2020-12-17-14-38-04_59f7669c.png)

## 云函数部分设置

进入 [阿里云函数](https://www.aliyun.com/product/fc?source=5176.11533457&userCode=ixqnlu7p) 后台，新建一个 ==HTTP函数== ,运行环境选 ==python3== ，认证方式 ==anonymous== ,请求方式 ==POST== ，其他选项随意填写。

![2020-12-17-14-45-44](https://oss.starchina.top/imgs/2020-12-17-14-45-44_637224c0.png)

转到函数配置页面建立一个环境变量，键名 **hook_url** ，键值为第一步中记录的WebHook地址。

![2020-12-17-14-50-13](https://oss.starchina.top/imgs/2020-12-17-14-50-13_2bcf29f5.png)

转到代码页面粘贴以下代码：
```python
# -*- coding: utf-8 -*-
import logging,json,urllib,requests,os,time
webhook = os.environ.get('hook_url')

def send(content,url): 
    headers = {'Content-Type': 'application/json'}    
    data = {
        "msgtype": "markdown",
        "markdown": {
            "content": content,
        }
    }
    r = requests.post(url, headers=headers, json=data)
    return r.content

    
def handler(environ, start_response):
    try:        
        request_body_size = int(environ.get('CONTENT_LENGTH', 0))    
    except (ValueError):        
        request_body_size = 0   
    request_body = environ['wsgi.input'].read(request_body_size)
    rb=request_body.decode('utf8')
    param=json.loads(urllib.parse.parse_qs(rb)['data'][0])
    _title = str(param['title'])
    _url = str(param['url'])
    _time_stamp = param['comments'][0]['ctime']
    _time = str(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(_time_stamp)/1000)))
    _content = str(param['comments'][0]['content'])
    _ip = str(param['comments'][0]['ip'])
    text="**《"+_title+"》有新留言**\n\n内容:"+_content+"\n时间:"+_time+"\nIP:"+_ip+"\n[点击查看]("+_url+")"
    response_body=send(text,webhook)
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [str(response_body).encode('UTF-8')]
```

转到触发器页面，记录下触发器的路径。

![2020-12-17-14-56-08](https://oss.starchina.top/imgs/2020-12-17-14-56-08_b62a797c.png)

## 畅言部分

转到畅言云评论后台，在**通用设置**中找到**评论回推地址**，填入上一步中记录的路径即可。

## 最终效果

每收到新的评论内容都会想你的企业微信群实时发送一条消息，点击消息中的链接即可转到评论页面回复。

推送效果如下：

![2020-12-17-15-00-20](https://oss.starchina.top/imgs/2020-12-17-15-00-20_5246a2f3.png)

