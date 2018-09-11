# Superheroes test

## Description
Application test using KOA as base to node, docker to make the environment, supertest to tests and nyv to coverage report.

## Installing dependencies
- [Install](https://docs.docker.com/engine/installation/) Docker
- [Install](https://docs.docker.com/compose/install/) Docker Compose

**Running aplication with docker**

To build and start the docker-compose server run:
```
npm run docker
```

To only start docker-compose server run:
```
npm run docker:start
```

To only build the docker-compose server run:
```
npm run docker:build
```

**Running aplication without docker**

This command needs a `npm install` before!
```
npm run start
```

This will start the application and run and mysql database.
Just open [http://localhost:3000](http://localhost:3000).

## Tests
    The application run in SQlite database and as the server, can be used in docker or not:    
    `npm run test` or `npm run docker:test`

## Docs
    The create documentation the jsdoc library was used, to run:    
    `npm run doc`

## Dependencies

### Koa dependencies

    Every KOA dependencies are listed on KOA libraries(https://github.com/koajs), theys are:
        - @koa/cors - Enable Cors to project
        - koa-bodyparser - To handle request body
        - koa-helmet - provides important security headers to make your app more secure by default.
        - koa-jwt - Enable jwt handling to the requisitions
        - koa-logger - Control log to every requisition made to the server
        - koa-passport - Control user passport to the server, handling everything related to login
        - koa-router - Map all endpoints
        - koa-session2 - Control token lifecycle, handling user sessions
        
### Other dependencies dependencies    
    Other dependencies necessary to create the superheroes microservice:
        - mysqld2 - Middleware to connect to mysql database
        - passport-local - Extension to koa-passport to make easier to handle passport strategy
        - sequelize - ORM to database
        - winston - Server-side loggs
        - bcrypt - Handles every password encryptation.
