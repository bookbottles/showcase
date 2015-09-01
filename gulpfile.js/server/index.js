'use strict';

var livereload = require('connect-livereload'),
    http       = require('http'),
    express    = require('express'),
    gutil      = require('gulp-util'),
    config     = require('../config'),
    open       = require('open'),
    path       = require('path');

module.exports = function(cb) {
    var app    = express(),
        server = http.createServer(app);

    app.use(livereload({
        port: config.express.reload
    }));

    app.use(express.static(path.join(process.cwd(), config.dest.build)));

    app.get('*', function(req, res) {
        res.sendFile(path.join(process.cwd(), config.dest.build, 'index.html'));
    });

    server.listen(config.express.port, function() {
        gutil.log('Express server listening on port ' + config.express.port);
        open('http://localhost:' + config.express.port);
        cb();
    });
};
