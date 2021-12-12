const proxy = require('http-proxy-middleware');
//跨域代理
module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:5000/' }));
  };