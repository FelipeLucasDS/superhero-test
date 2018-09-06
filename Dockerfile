FROM node:alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

RUN mkdir -p /usr/src/koa-base
WORKDIR /usr/src/koa-base
COPY package.json /usr/src/koa-base/
RUN npm install

RUN npm rebuild bcrypt --update-binary

COPY . /usr/src/koa-base
EXPOSE 3000
CMD sleep 15 && npm run start