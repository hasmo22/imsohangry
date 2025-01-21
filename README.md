## Description

This is the backend of the tech challenge. This repo is made up of the two backend parts found under the ```apps/``` directory:
1. The command to harvest the data from the staging API and store it in the database.
2. The set-menus API

Please follow the instructions specified below to setup the project. This includes:
- Installing dependencies.
- Running docker compose to run the mysql container which will setup all necessary tables (no data just yet).
- Running a command that harvests the data into the database tables (data yay).
- Finally, starting the server before you go and setup the [frontend](https://github.com/hasmo22/imsohangryfrontend).

## Project setup

```bash
$ yarn install
$ docker-compose up -d
$ yarn start:cli
$ yarn start
```

At this point, the data should've been harvested and the server should be running on port 3000.

## Run tests

```bash
$ yarn test
```
