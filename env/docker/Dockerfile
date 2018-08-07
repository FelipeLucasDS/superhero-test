FROM ubuntu:16.04
MAINTAINER felipelucasds@hotmail.com
ENV DEBIAN_FRONTEND noninteractive

WORKDIR /opt/

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Update the package repository
RUN apt-get update -y --fix-missing;

#installing NVM and node
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
ENV NVM_DIR=/root/.nvm

RUN mkdir -p /home/koa-base
WORKDIR /home/koa-base
COPY package.json /home/koa-base
RUN . $HOME/.nvm/nvm.sh && nvm install v9 && nvm use 9 && npm install

RUN mkdir -p /home/koa-base/backend
WORKDIR /home/picmoney/backend
