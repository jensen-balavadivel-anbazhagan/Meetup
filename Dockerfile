FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .
RUN npm run build
# http-server använder port 8080
EXPOSE 8080
CMD [ "http-server", "dist" ]