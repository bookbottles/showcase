'use strict';

var _               = require('lodash'),
    browserify      = require('browserify'),
    buffer          = require('vinyl-buffer'),
    config          = require('./config'),
    del             = require('del'),
    eslint          = require('eslint'),
    gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil           = require('gulp-util'),
    reportError     = require('./error'),
    runSequence     = require('run-sequence'),
    server          = require('./server'),
    source          = require('vinyl-source-stream'),
    watchify        = require('watchify');

var plugins     = gulpLoadPlugins(),
    linter      = new eslint.CLIEngine(),
    formatter   = linter.getFormatter(),
    origGulpsrc = gulp.src,
    runType;

var tasks = {
    setup: ['lint', 'clean'],
    compile: ['styles', 'images', 'root', 'browserify', 'index']
};

gulp.src = function() {
    return origGulpsrc.apply(gulp, arguments)
        .pipe(plugins.plumber({
            errorHandler: reportError
        }));
};

gulp.task('default', function(cb) {
    runSequence('serve', cb);
});

gulp.task('build', function(cb) {
    runType = {
        build: 'build',
        serve: false
    };
    runSequence(tasks.setup, tasks.compile, cb);
});

gulp.task('serve', function(cb) {
    runType = {
        build: 'build',
        serve: true
    };
    runSequence(tasks.setup, tasks.compile, 'server', 'watch', cb);
});

gulp.task('lint', function(cb) {
    var report = linter.executeOnFiles(['.']);

    if (report.errorCount + report.warningCount === 0) {
        gutil.log(gutil.colors.cyan('No ESLint warnings or errors!'));
    } else {
        gutil.log(formatter(report.results));
    }
    cb();
});

gulp.task('clean', function(cb) {
    del([
        config.dest.build
    ], cb);
});

gulp.task('styles', function() {
    return gulp.src(config.entry.less)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.rename(config.buildfile + '.css'))
        .pipe(plugins.header(config.banner))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dest.build + '/assets'))
        .pipe(plugins.livereload());
});

gulp.task('images', function() {
    return gulp.src(config.source.images)
        .pipe(gulp.dest(config.dest.build + '/assets/images'))
        .pipe(plugins.livereload());
});

gulp.task('root', function() {
    return gulp.src(config.source.root)
        .pipe(gulp.dest(config.dest.build))
        .pipe(plugins.livereload());
});

gulp.task('browserify', function() {
    var browsePackage = browserify(_.merge(watchify.args, {
        entries: [config.entry.js],
        debug: true
    }));

    if (runType.serve) {
        browsePackage = watchify(browsePackage);
    }

    browsePackage
        .on('log', gutil.log)
        .on('update', function() {
            makeBundle();
        });

    return makeBundle();

    function makeBundle() {
        return browsePackage.bundle()
            .on('error', plugins.notify.onError({
                title: 'Browserify Error',
                message: 'Error: <%= error.message %>',
                sound: 'Bottle'
            }))
            .pipe(source(config.buildfile + '.js'))
            .pipe(buffer())
            .pipe(plugins.header(config.banner))
            .pipe(plugins.size({
                showFiles: true
            }))
            .pipe(gulp.dest(config.dest.build + '/assets'))
            .pipe(plugins.livereload());
    }
});

gulp.task('index', function() {
    return gulp.src(config.source.index)
        .pipe(plugins.jade({
            locals: {
                cssFile: config.buildfile + '.css',
                jsFile: config.buildfile + '.js',
                gaId: '0000-0000',
                gaLocal: true
            }
        }))
        .pipe(gulp.dest(config.dest.build))
        .pipe(plugins.livereload());
});

gulp.task('watch', function() {
    plugins.livereload.listen({
        port: config.express.reload
    });

    _.each([
        [config.source.less, ['styles']],
        [config.source.images, ['images']],
        [config.source.root, ['root']],
        [config.source.index, ['index']],
        ['.eslintrc', ['lint']]
    ], function(toWatch) {
        gulp.watch(toWatch[0], toWatch[1]).on('change', onChange);
    });

    gulp.watch(config.source.js, function(event) {
        var report;

        onChange(event);

        if (event.type !== 'deleted') {
            report = linter.executeOnFiles([event.path]);
            if (report.errorCount + report.warningCount !== 0) {
                gutil.log(formatter(report.results));
            }
        }
    });

    function onChange(event) {
        gutil.log(gutil.colors.cyan('[' + _.capitalize(event.type) + ']') + ' ' + event.path);
    }
});

gulp.task('server', server);
