FROM node:20

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3306
CMD ["node", "server.js"]

