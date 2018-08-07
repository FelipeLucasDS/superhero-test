const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'production';
const NODE_HOST = process.env.NODE_HOST || 'localhost';
const NODE_PORT = process.env.NODE_PORT || 8282;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const TOKEN_TIME_EXPIRATION = process.env.TOKEN_TIME_EXPIRATION || '24';

const productionConfig = {
        app: {
            name: APP_NAME + NODE_ENV,
            address: NODE_HOST,
            port: NODE_PORT
        },
        log: {
            name: APP_NAME + NODE_ENV,
            level: LOG_LEVEL
        }
}

const developmentConfig = {
    app: {
        name: APP_NAME + NODE_ENV,
        address: NODE_HOST,
        port: NODE_PORT
    },
    log: {
        name: APP_NAME + NODE_ENV,
        level: LOG_LEVEL
    }
}

const unitTestConfig = {
    app: {
        name: APP_NAME + NODE_ENV,
        address: NODE_HOST,
        port: NODE_PORT
    },
    log: {
        name: APP_NAME + NODE_ENV,
        level: LOG_LEVEL
    }
}

const integrationTestConfig = {
    app: {
        name: APP_NAME + NODE_ENV,
        address: NODE_HOST,
        port: NODE_PORT
    },
    log: {
        name: APP_NAME + NODE_ENV,
        level: LOG_LEVEL
    }
}


const config = {
    development: developmentConfig,
    test: unitTestConfig,
    unitTest: unitTestConfig,
    integrationTest: integrationTestConfig,
    production: productionConfig
};

module.exports = config[NODE_ENV];
