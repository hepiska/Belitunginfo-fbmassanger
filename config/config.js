require('dotenv').config()
module.exports = {
  "development": {
    "username": "ego",
    "password": "ego",
    "database": "belitunginfo",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port":"5432",
    "logging":false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DO_USERNAME || '',
    "password": process.env.DO_PASSWORD || '',
    "database": process.env.DATABASE || '',
    "host": process.env.HOST || '',
    "port": process.env.PORT || '5432',
    "dialect": "postgres",
    "logging":false
  }
}
