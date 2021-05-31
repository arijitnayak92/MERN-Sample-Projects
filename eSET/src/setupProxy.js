const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/etest/user_ncr',
        { target: 'http://localhost:8081' }
    ));
    app.use(proxy('/etest/user',
        { target: 'http://localhost:8080' }
    ));
}
