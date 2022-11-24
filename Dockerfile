FROM node:16.16.0 
WORKDIR /app/client
COPY client/package*.json .
RUN npm install
COPY client/src ./src
COPY client/public ./public
RUN npm run build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY src ./src
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]