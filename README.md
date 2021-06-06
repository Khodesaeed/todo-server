# todo-server
### todo app with sequlize-sqlite-express

Simple todo server powered by sequelize, sqlite and redis.

## config prerequisite
1. creat `.env` file in the root of the project.
1. set `PORT` and `TOKEN_SECRET` env variable.  
  `use > require('crypto').randomBytes(64).toString('hex'); in node prompt and set it to TOKEN_SECRET.`  
1. create `config` folder in the root of the project.  
1. cpoy `examples/config.json.example` into the config folder.
