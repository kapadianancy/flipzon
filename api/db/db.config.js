module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: process.env.dialect,
    pool: {
      max: 5,
      min: 1,
      acquire: 30000,
      idle: 10000
    }
  };