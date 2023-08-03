const configs = {
    development: {
      SERVER_URI: 'localhost:3000',
    },
    production: {
      SERVER_URI: 'https://interacto-backend.vercel.app',
    },
  };

module.exports = configs[process.env.NODE_ENV];
  
