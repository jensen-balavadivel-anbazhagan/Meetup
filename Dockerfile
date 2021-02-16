FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

# install project dependencies
RUN npm install

COPY . .
# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]