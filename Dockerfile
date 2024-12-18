FROM node:14.2-slim

WORKDIR /app
COPY package*.json ./
COPY src ./src

RUN npm install

CMD ["node", "src/index.js"]
