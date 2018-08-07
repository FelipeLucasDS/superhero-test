#!/usr/bin/env bash

export NODE_ENV="development"

ln -s /home/koa-base/node_modules /home/koa-base/backend/node_modules

. $HOME/.nvm/nvm.sh 

npm run start


