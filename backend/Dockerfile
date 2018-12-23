FROM node:8.14.1-jessie-slim

ENV NODE_ENV development

WORKDIR /node/home/app
COPY . .
RUN npm i npm@latest yarn@latest -g 
RUN yarn
ENV PATH /node/home/app/node_modules/.bin:$PATH

USER node
EXPOSE 3000

CMD ["nodemon", "app.js"]