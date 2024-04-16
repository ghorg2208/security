// middlewares/logger.js

const loggerMiddleware = (req, res, next) => {
    console.log('nouvelle requête entrante');
    next();
  };
  
  module.exports = loggerMiddleware;