# Superheroes test


[![CircleCI](https://circleci.com/gh/FelipeLucasDS/superhero-test/tree/master.svg?style=svg)](https://circleci.com/gh/FelipeLucasDS/superhero-test/tree/master)
[![codecov](https://codecov.io/gh/FelipeLucasDS/superhero-test/branch/master/graph/badge.svg)](https://codecov.io/gh/FelipeLucasDS/superhero-test)

## Description
This is as a node application using KOA as a base, connecting to a MySQL environment, working with a docker-compose orquestration.
The code tests are made with Supertest, in an end to end test using a memory sqlite3 database and NYC coverage report.
This project has a CI using CircleCI and a CD to every commit made by master deploying in an [EC2](http://ec2-52-15-65-252.us-east-2.compute.amazonaws.com:3000/public/swagger#/) instance after a success response from tests.

## Installing dependencies
- [Install](https://docs.docker.com/engine/installation/) Docker
- [Install](https://docs.docker.com/compose/install/) Docker Compose

**Running aplication with docker**

To build and start the docker-compose server run:
This, at the first time, can run an error because of database creation, if happens, re-run the command!
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

Will be opened by [http://localhost:3000](http://localhost:3000).

**Running aplication without docker**

This command needs a `npm install` before!
```
npm run start
```

Will be opened by [http://localhost:3001](http://localhost:3001).

##  Migrate database

To create a default database to start those tests, run:
```
npm run db:migrate
```

## Tests
    The application run in SQlite database and as the server, can be used in docker or not:    
    `npm run test` or `npm run docker:test`

## Docs
    The create documentation is using a generated yml of swagger, oppened by:
- [Docker instance](http://localhost:3001/public/swagger#/)
- [Local instance](http://localhost:3000/public/swagger#/)

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
        
### Other dependencies    
    Other dependencies necessary to create the superheroes microservice:
- mysqld2 - Middleware to connect to mysql database
- passport-local - Extension to koa-passport to make easier to handle passport strategy
- sequelize - ORM to database
- winston - Server-side loggs
- bcrypt - Handles every password encryptation.
