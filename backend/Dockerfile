FROM node:8.14.1-jessie-slim

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /node/home/app
COPY . .
RUN npm i npm@latest yarn@latest -g 
RUN yarn
ENV PATH /node/home/app/node_modules/.bin:$PATH
RUN yarn global add forever 

USER node
EXPOSE 3000

CMD ["forever", "start", "app.js"]