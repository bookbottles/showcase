var config  = require('./../build.config'),
    express = require('express'),
    app     = express(),
    path    = require('path'),
    server  = require('http').createServer(app);

// CONFIG SERVER

app.use(express.static(config.build_dir));
app.get('*', function (req, res) {
    res.sendFile(path.resolve(config.build_dir + '/index.html'));
});

// FIRE IT UP

server.listen(config.port, function () {
    console.log("Express server listening on port %d", config.port);
});
