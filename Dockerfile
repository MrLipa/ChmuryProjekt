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

# FROM node:16.16.0 AS ui-build

# WORKDIR /app/client/
# COPY package*.json ./
# RUN npm install
# COPY src/ ./src
# COPY public/ ./public
# RUN npm build

# FROM node:16.16.0 AS server-build
# WORKDIR /app/
# COPY package*.json ./
# RUN npm install
# COPY server.js ./
# COPY src/ ./src

# ENV NODE_ENV=production

# EXPOSE 3000

# CMD ["npm", "run","start"]
