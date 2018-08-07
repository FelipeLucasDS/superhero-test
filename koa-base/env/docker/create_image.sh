#!/usr/bin/env bash

cp env/docker/Dockerfile . 

docker build -t "koa-base" $(pwd)

rm Dockerfile


