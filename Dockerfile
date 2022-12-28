FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install --prefix client
RUN npm run build --prefix client
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]

# FROM node:latest
# WORKDIR /app/client
# COPY client/package*.json ./
# RUN npm install
# COPY client/src ./src
# COPY client/public ./public
# RUN npm run build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY src ./src
# COPY server.js ./

# EXPOSE 3000

# CMD ["node", "server.js"]

# npm install --prefix client npm run build --prefix client