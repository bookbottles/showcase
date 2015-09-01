'use strict';

var _   = require('lodash'),
    pkg = require('../../package.json');

module.exports = {
    buildfile: pkg.name + '-' + pkg.version + '-' + Date.now(),
    banner: _.template([
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n'))({pkg: pkg}),
    entry: {
        js: 'src/app/showcase/index.js',
        less: 'src/less/main.less'
    },
    source: {
        js: 'src/**/*.js',
        images: 'images/**/*',
        less: 'src/less/**/*.less',
        index: 'src/index.jade',
        root: []
    },
    dest: {
        build: 'build'
    },
    express: {
        port: 3444,
        reload: 35728
    }
};
