
# Nestjs Auth with CASL and PassportJS

This is a nestjs project turned to implement a real authentication and authorization pattern using **Jwt, CASL, PassportJS and TypeORM**, it's a project with CASL being implemented dynamically using tables like "Roles" and "Permissions" to generate Abilities. The project runs in Nestjs core  version 10.0.0.

It's a simple project that can be reused like a base nestjs startup with authentication and authorization configured and ready to run.

## How to run
To run the project simply configure the .env file copy and pasting .env.example and filled up with your relevant data like database connection, just run like a normal NestJS project, if you don't known how to do that just go to a file called "README-NESTJS", its from Nestjs official documentation and it's a file generated as soon as the project is created using nestjs cli, and don't forget to run **npm install** before trying to startup the project.

The project have a seed to create a default user and some default roles like ADMIN and USER with the default CASL permissions, the seed runs inside main.js only if you are in development environment with ENVIRONMENT variable set to "dev" on .env, after the seed successfully run a console message will show either advicing that runs with sucess or just warning that this seed just had already run, if you find annoying the messages just go to seed.service.ts and remove the console.logs.

## Routes
All routes are inside Auth folder in auth.controller.ts, the routes are:

- **signUp (/auth/signUp):** A signUp route to create a new User with the default role "USER".
- **login (/auth/login):** A login route that returns a access jwt token
- **validateUser (/auth/validate):** A validate user route to validate if a user has the authorization to acess his content, this works to show how to authorize a user with passportjs and casl.

If you want more details just use swagger API, run the project and go to http://localhost:YOUR_PORT/api or import the swagger file using "/api-json" route.