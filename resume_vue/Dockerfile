# 前端 Dockerfile
# 第一阶段：构建阶段
FROM docker.m.daocloud.io/library/node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置 npm 镜像源和超时时间
RUN npm config set registry https://registry.npmmirror.com
RUN npm config set timeout 600000

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖（使用淘宝 npm 镜像源，添加重试机制）
RUN npm ci --no-audit --no-fund --ignore-scripts \
    || (npm cache clean --force && npm ci --no-audit --no-fund --ignore-scripts) \
    || (sleep 10 && npm ci --no-audit --no-fund --ignore-scripts)

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：生产阶段
FROM docker.m.daocloud.io/library/nginx:alpine

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
