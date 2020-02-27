FROM node:6.17.1-alpine AS build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 3001
CMD ["npm", "run", "start"]