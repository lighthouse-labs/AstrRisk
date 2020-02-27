FROM node:6.17.1-alpine AS build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["node", "production_server.js"]