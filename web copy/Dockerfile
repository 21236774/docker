FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 本地环境运行
CMD ["npm", "run", "dev"]
