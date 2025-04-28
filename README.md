### Docker 前后端项目

#### 项目概述

该项目包含一个简单的前后端应用，前端实现登录、注册、权限和列表功能，后端实现相应的 API 接口和权限管理。

#### docker 本地启动

```bash
docker-compose up -d
```

#### 停止

```bash
docker-compose down
```

#### 删除，这个删除会删除容器和已有的数据库

```bash
docker-compose down -v
```

#### 前端访问地址

- http://localhost:26000/

#### 后端访问地址

- http://localhost:26001/docs

#### docker-compose 三个服务

1. postgres 数据库，设置用户名为 `root` , 密码为 `ai123456`，创建了一个 `fastapi_db` 表
2. fastapi 后端服务，端口为 26001 映射到 8000 端口
3. 前端 `Vue.js` 服务，端口为 26000 映射到 26000 端口

#### 线上部署

- 复制环境文件，生产环境复制 `Dockerfile.pro` , 本地开发环境复制 `Dockerfile.dev`

```bash
cd api
cp Dockerfile.pro Dockerfile
cd ../web
cp Dockerfile.pro Dockerfile
```

##### 然后分别运行：

```bash
docker-compose down
docker-compose build
docker-compose up -d
```
