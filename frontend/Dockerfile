FROM node:8.14.1-alpine

ENV NODE_ENV=production

WORKDIR /node/home/app
COPY . .
RUN npm i npm@latest yarn@latest -g 
RUN NODE_ENV=development yarn
ENV PATH /node/home/app/node_modules/.bin:$PATH
RUN yarn global add pushstate-server@3.0.1 

ENV PORT=80
EXPOSE $PORT

RUN yarn build
CMD pushstate-server ./dist $PORT 