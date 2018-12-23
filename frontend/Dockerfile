FROM node:8.14.1-alpine

ENV NODE_ENV development

WORKDIR /node/home/app
COPY . .
RUN npm i npm@latest yarn@latest -g 
RUN yarn
ENV PATH /node/home/app/node_modules/.bin:$PATH

USER node
EXPOSE 8080

CMD ["yarn", "serve"]