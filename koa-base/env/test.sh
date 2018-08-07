#!/usr/bin/env bash

. $HOME/.nvm/nvm.sh

if [ $1 == "unit" ]
then
    export NODE_ENV="unitTest"
    npm run test_unit
elif [ $1 == "integration" ]
then
    export NODE_ENV="integrationTest"
    npm run test_integration
else
    export NODE_ENV="test"
    npm run test
fi
