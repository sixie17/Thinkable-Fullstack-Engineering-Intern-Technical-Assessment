# Thinkable blog
## Project set up

1. Running the database

in this Project I used `PostgreSQL` inside a docker container, so to run the DB run  the following command
**MacOS**
```sh
docker compose up -d
```
**linux**
```sh
docker-compose up -d
```
after running the DB container now we Have to use prisma migration and generate prisma ressources for the backend check section-2

2. Running the migration

**NOTE: of cours you have to run `npm i` to install dependencies otherwise nothing from what's comming next is going to work**

since we are using `Prisma` for our ORM, we have to create a migration so the the DB includes the tables to do so run the following command
```sh
npx prisma migrate dev
```

3. Running the app

Now that everything is set up we can run the app using the follwing commands

*build*

```sh
npm run build

```
*deploy*
```sh
npm run start
```

4. testing the app

the app includes some unit tests to run them use the following command
```sh
npm test
```

5. what's next

you might want to check the documentation and to understand how the app is built a full backend documentation is available [here](https://github.com/sixie17/Thinkable-Fullstack-Engineering-Intern-Technical-Assessment/blob/main/backend.md)
