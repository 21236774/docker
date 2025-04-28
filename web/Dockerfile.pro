FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 构建Vue.js应用
RUN npm run build

# 使用多阶段构建，将构建后的文件复制到Nginx镜像
FROM nginx:alpine

# 复制构建后的文件到Nginx的默认目录
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]