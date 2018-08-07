#!/usr/bin/env bash

docker rm -f "koa-base"
docker run -i -t -v "$(pwd):/home/koa-base/backend" --rm=true -p 0.0.0.0:8081:8081 -p 0.0.0.0:8282:8282 -p 0.0.0.0:8000:8000 --name "koa-base" "koa-base:latest" /home/koa-base/backend/env/server.sh
