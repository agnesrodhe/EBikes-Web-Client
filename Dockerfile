FROM node:14.5

WORKDIR /app

ENV NODE_ENV production

COPY package*.json ./

COPY . ./

RUN npm install

RUN chmod +x /app

RUN chown -R node /app/node_modules

EXPOSE 3000

ENTRYPOINT ["npm", "start"]