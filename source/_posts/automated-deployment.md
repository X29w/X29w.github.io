---
title: 前端自动化部署
date: 2024-10-20 12:18:31
tags:
---

所谓自动化部署就是当代码触发提交的时候自动部署到服务器上

前置准备工作

- 服务器：需要有一台可以部署代码的服务器，比如阿里云、腾讯云、GitHub Pages 等
- 代码仓库：需要有一个代码仓库，比如 GitHub、GitLab 等
- 会 linux
- 懂点 Ngnix
- 懂点 Git

## 买一台服务器

- 不要贪便宜到不知名小平台买，之前我也有过投机取巧不想买大平台的服务器，因为觉得贵，但是贵有贵的道理，小平台的安装都会报错，可能对于当时的我技术还不够，不太能分析出错误的原因是什么，总之避雷就对了。

- 到阿里云我买的 99/年的，我买的是 Alibaba Cloud Linux3，和 CentOS 没差，用就行

- 一路先确定直到支付完成就会看到有服务器的 IP 地址，记住这个 IP 地址，后面会用到。然后重置密码，记住密码，不管是脑子还是别的什么地方

## 连接服务器

固定模板 ssh root@服务器 IP 地址

## 安装 Docker

以下命令以此执行，无脑做就能成功

**一些命令的解释: **

- dnf: 这是一个包管理工具，用于安装、更新和删除软件包。它是 yum 的下一代版本，提供更好的性能和依赖管理功能。

- install: 这是 dnf 的一个子命令，用于安装指定的软件包。

- -y: 这个选项表示自动回答“yes”给所有的提示。这意味着在安装过程中，如果有任何确认提示，使用此标志可以自动接受，避免手动干预。

- docker-ce: 这是要安装的软件包的名称。在这里，docker-ce 指的是 Docker 的社区版（Community Edition）。Docker 是一个开源的容器化平台，用于自动化应用程序的部署、扩展和管理。

- --nobest: 这个选项告诉 dnf 在安装时不一定选择最好的（最新的）版本来进行安装，而是可以选择可用版本中的较好版本。这在某些情况下可以避免因为依赖问题而无法安装最新版本

```cmd 运行以下命令，安装Docker存储驱动的依赖包
dnf install -y device-mapper-persistent-data lvm2
```

```cmd 运行以下命令，添加稳定的Docker软件源。
dnf config-manager --add-repo=https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```cmd 运行以下命令，查看已添加的Docker软件源。
dnf list docker-ce
```

```cmd 正确的返回示例如下。
docker-ce.x86_64        3:19.03.13-3.el7        docker-ce-stable
```

```cmd 运行以下命令安装Docker
dnf install -y docker-ce --nobest
```

```cmd 设置开机自启
sudo systemctl enable docker
```

```cmd 启动docker
sudo systemctl start docker
```

```cmd 检测是否安装成功 docker -v 查看版本号
docker -v
```

![img](/images/automated-deployment/1.png)

## 安装 docker-compose

```cdm 安sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

```

```cmd 对二进制文件应用可执行权限
sudo chmod +x /usr/local/bin/docker-compose
```

```cmd 检测是否安装成功 docker-compose -v 查看版本号
docker-compose -v
```

## 安装 Nginx 镜像和 Jenkins 镜像

### 安装 Nginx

```安装Nginx 镜像
docker pull nginx
```

---

> warning: 如果报错内容是 Error response from daemon: Get “https://registry-1.docker.io/v2/“: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) 就按下方命令执行

![img](/images/automated-deployment/2.png)

```cmd 修改下这个json文件，没有就创建
vim /etc/docker/daemon.json
```

```json 写入以下内容
{
  "registry-mirrors": [
    "https://2a6bf1988cb6428c877f723ec7530dbc.mirror.swr.myhuaweicloud.com",
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://your_preferred_mirror",
    "https://dockerhub.icu",
    "https://docker.registry.cyou",
    "https://docker-cf.registry.cyou",
    "https://dockercf.jsdelivr.fyi",
    "https://docker.jsdelivr.fyi",
    "https://dockertest.jsdelivr.fyi",
    "https://mirror.aliyuncs.com",
    "https://dockerproxy.com",
    "https://mirror.baidubce.com",
    "https://docker.m.daocloud.io",
    "https://docker.nju.edu.cn",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.iscas.ac.cn",
    "https://docker.rainbond.cc"
  ]
}
```

```cmd 重新加载配置文件
systemctl daemon-reload
```

```cmd 重启docker服务
systemctl restart docker
```

```cmd 检查下docker是否启动正常
systemctl status docker
```

这样再重新 pull Nginx 就正常了

### 安装 Jenkins

```cmd 查看镜像list
docker search jenkins
```

> warning:可能会报错，需要配置下镜像源
> ![img](/images/automated-deployment/3.png)
> 无所谓，反正是查看列表的命令，往下走接着拉镜像

```cmd 拉取Jenkins镜像 本次镜像jenkins/jenkins:lts
docker pull jenkins/jenkins:lts
```

:::warning
就拉最新版的镜像，lts 版本是最稳定的版本，一般情况下都用这个版本，别整没有用的
:::

```cmd 安装完成后执行docker images 查看已安装镜像
docker images
```

![img](/images/automated-deployment/5.png)

## 配置目录编写

:::warning
!! 注意：这里的 docker 是放在根目录的和/root 平级的
:::

- docker
  - compose
    - docker-compose.yml //docker-compose 配置
  - html //各环境代码目录(实际项目可能不在同一目录)
    - dev //dev 环境代码目录
    - prod //sit 环境代码目录
  - jenkins_home //Jenkins 工程目录
  - nginx //nginx 工程目录
    - conf
      - nginx.conf //nginx 配置

```yml docker-compose.yml 配置文件
version: "3"

services: # 容器
  docker_jenkins:
    privileged: true
    user: root # root权限
    restart: always # 重启方式
    image: jenkins/jenkins:lts # 使用的镜像
    container_name: jenkins # 容器名称
    ports: # 对外暴露的端口定义
      - 8080:8080
      - 50000:50000
    volumes: # 卷挂载路径
      - /docker/jenkins_home/:/var/jenkins_home # 挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose
      - /usr/bin/docker:/usr/bin/docker

  docker_nginx_dev: # nginx-dev环境
    restart: always
    image: nginx
    container_name: nginx_dev
    ports:
      - 8001:8001
    volumes:
      - /docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - /docker/html:/usr/share/nginx/html
      - /docker/nginx/logs:/var/log/nginx

  docker_nginx_prod: # nginx-prod环境
    restart: always
    image: nginx
    container_name: nginx_prod
    ports:
      - 8002:8002
    volumes:
      - /docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
      - /docker/html:/usr/share/nginx/html
      - /docker/nginx/logs:/var/log/nginx
```

```conf nginx.conf 配置文件
# nginx.conf 例：
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    #dev环境
    server {
            #监听的端口
        listen  8001;
        server_name  localhost;
        #设置日志
#        access_log  logs/dev.access.log  main;

        #定位到index.html
           location / {
               #linux下HTML文件夹,就是你的前端项目文件夹
               root  /usr/share/nginx/html/dev/dist;
#               root  /home/html/dev/dist;
               #输入网址（server_name：port）后，默认的访问页面
               index  index.html;
               try_files $uri $uri/ /index.html;
           }
    }

    #prod环境
    server {
            #监听的端口
        listen  8002;
        server_name  localhost;
        #设置日志
#        access_log  logs/prod.access.log  main;

        #定位到index.html
           location / {
               #linux下HTML文件夹,就是你的前端项目文件夹
               root  /usr/share/nginx/html/prod/dist;
#               root  /home/html/dev/dist;
               #输入网址（server_name：port）后，默认的访问页面
               index  index.html;
               try_files $uri $uri/ /index.html;
           }
    }


#    include /etc/nginx/conf.d/*.conf;


}

```

:::tip
在 docker-compose.yml 文件所在目录下执行命令创建容器
:::

```cmd 启动容器
docker-compose up -d
```

```cmd 执行docker ps查看容器情况
docker ps
```

## Jenkins 配置

爆坑来了！！！

### 阿里云安全组配置

:::warning
此时通过 ip:8080 打不开 jenkins 的，因为阿里云那边需要手动加上要访问那个端口，就放行哪个端口
![img](/images/automated-deployment/6.png)
:::

### 防火墙配置

> 输入命令开启防火墙和 8080 端口

```cmd 检查防火墙装填
sudo systemctl status firewalld
```

```cmd 开启防火墙
sudo systemctl start firewalld
```

```设置开机自动启动防火墙
sudo systemctl enable firewalld
```

```cmd 开启8080端口
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
```

```cmd 重启防火墙
sudo firewall-cmd --reload
```

:::warning
后面每开放一个端口就要到安全组手动配置一下，然后防火墙开启端口，防火墙 reload 一下，三步，每一步都不能少
:::

### Jenkins 初次密码

在容器启动后，可以在浏览器输入服务器 ip:8080 进入 jenkins 管理界面。
至此，jenkins 配置完成。

密码在 `docker/jenkins_home/secrets/initialAdminPassword`
可以通过命令：

```cmd
cat /docker/jenkins_home/secrets/initialAdminPassword
```

## Nginx 配置

在对应目录`/docker/html/dev/dist`、`/docker/html/prod/dist`各新建一个 index.html

经过上述步骤之后，可以通过 ip+对应的 nignx 端口访问到对应的环境的页面。

![img](/images/automated-deployment/7.png)

![img](/images/automated-deployment/8.png)

## Jenkins 进入后的配置

### 下载插件

- local（可选。将界面设置为中文）
- GitHub
- publish over SSH (用来连接远程服务器的)
- NodeJs

下载插件后，Jenkins 需要重启
地址栏输入`ip:端口/restart`

![img](/images/automated-deployment/9.png)

### Publish Over SSH 配置

第一步
![img](/images/automated-deployment/10.png)

第二步 进去找到 Publish Over SSH

第三步 点击 Publish Over SSH 下方的 SSH Server,点击新增
![img](/images/automated-deployment/11.png)

第四步 点击高级
![img](/images/automated-deployment/12.png)

![img](/images/automated-deployment/13.png)

![img](/images/automated-deployment/14.png)

### NodeJs 配置

![img](/images/automated-deployment/15.png)

![img](/images/automated-deployment/16.png)

### 添加凭据

添加凭据（账号密码）是为了方便后续使用

![img](/images/automated-deployment/17.png)

![img](/images/automated-deployment/18.png)

### 添加 github 账号密码

![img](/images/automated-deployment/19.png)

## 创建 job

### 源码管理

![img](/images/automated-deployment/20.png)
![img](/images/automated-deployment/21.png)
![img](/images/automated-deployment/22.png)
![img](/images/automated-deployment/23.png)

应用保存后，点击立即构建

![img](/images/automated-deployment/24.png)
![img](/images/automated-deployment/25.png)

`无论是否成功，都可以在构建记录控制台查看`

![img](/images/automated-deployment/26.png)

## Github WebHooks 配置

### webhooks 配置

![img](/images/automated-deployment/27.png)

![img](/images/automated-deployment/28.png)

### 创建一个 Personal access tokens

![img](/images/automated-deployment/29.png)
![img](/images/automated-deployment/30.png)
![img](/images/automated-deployment/31.png)

### 配置 jenkins

进入一个 job

![img](/images/automated-deployment/32.png)

![img](/images/automated-deployment/33.png)

![img](/images/automated-deployment/34.png)

![img](/images/automated-deployment/35.png)

![img](/images/automated-deployment/36.png)

![img](/images/automated-deployment/37.png)

![img](/images/automated-deployment/38.png)
(图片说明：描述就是取一个名称)

![img](/images/automated-deployment/39.png)

## Build Steps

在/docker/jenkins_home/workspace/gitlab_web,每次构建对应代码都会同步更新，由于代码没有在 git 上传 node_moudle 文件夹，所以后续需要在服务器重新安装 node_moudle
![img](/images/automated-deployment/40.png)

### Execute NodeJS script

这里选的 node 是上面配置的
![img](/images/automated-deployment/41.png)
![img](/images/automated-deployment/42.png)

点击应用后保存，然后点击立即构建，此次时间会`长一点`，此时构建会去自动安装对应的 nodejs 安装包到 jenkins 目录并配置好环境变量，注意尽量与`本地开发环境的node版本一致`，为了保持环境同步，等待构建好后再执行下一步

![img](/images/automated-deployment/43.png)

应用保存并构建成功后，可以进入下一步

### Shell 命令

![img](/images/automated-deployment/44.png)

在 shell 命令这块有的执行 node -v 都报错，此时请检查环境变量是否与服务器的环境变量有差异，执行`echo $PATH`
第一行代码一般要添加`#!/bin/bash`
如果环境变量有问题可能要在第二行执行刷新环境变量命令

```cmd
source ~/.bash_profile
source /etc/profile
```

上面哪个有效果用哪个
然后执行对应命令，验证环境可用

![img](/images/automated-deployment/45.png)

```cmd
#!/bin/bash

node -v
npm -v
echo $PATH
```

保存之后回到桌面在此构建一次
上述命令如成功执行，进行下一步

### 安装node_moule并build打包

:::warning
先自己本地build一下，看看哪里有问题
:::

修改job的shell配置
``` cmd
node -v
npm -v

npm i 
npm run build:dev
```

![img](/images/automated-deployment/46.png)


此时服务器代码出现dist文件夹
![img](/images/automated-deployment/47.png)
目录在/docker/jenkins_home/workspace/github_test_web


### 代码自动部署到对应环境项目目录

同一服务器可以用`cp`命令，可以参考linux cp命令

此处为另一种方式：压缩包ssh传输，因为使用cp命令到/docker/html/dev目录报错了，遂采用第二种方式

``` cmd
#!/bin/bash

node -v 
npm -v 
npm i
npm run build:dev
rm -rf dist.tar
tar -zcvf dist.tar ./dist
```

构建成功后多了个dist.tar文件
![img](/images/automated-deployment/48.png)


### 连接SSH服务器
系统配置已经设置过ssh相关配置再操作下面，如未设置，请往上翻 `Publish Over SSH`










