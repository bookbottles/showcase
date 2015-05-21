module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var userConfig = require('./build.config.js');

    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['<%= build_dir %>']
        },

        copy: {
            appjs: {
                src: ['<%= app_files.js %>'],
                dest: '<%= build_dir %>/',
                cwd: '.',
                expand: true
            },
            vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            extjs: {
                files: [
                    {
                        src: ['<%= ext_files.pre_js %>', '<%= ext_files.post_js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },

        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= ext_files.pre_js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= ext_files.post_js %>',
                    '<%= build_dir %>/assets/**/*.css'
                ]
            }
        },

        watch: {
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['copy', 'index']
            },

            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less:build']
            },

            tpl: {
                files: ['<%= app_files.atpl %>'],
                tasks: ['html2js']
            },

            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [],
                options: {
                    livereload: false
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'server/server.js',
                    watchedFolders: ['server']
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'watch'],

                options: {
                    logConcurrentOutput: true
                }
            }
        },

        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },

        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': 'src/less/main.less'
                }
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.registerTask('default', [
        'build',
        'concurrent'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'html2js',
        'less',
        'index'
    ]);

    function filterForExtension(extension, files) {
        var regex = new RegExp('\\.' + extension + '$'),
            dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('dist_dir') + ')\/', 'g');

        return files.filter(function (file) {
            return file.match(regex);
        }).map(function (file) {
            return file.replace(dirRE, '');
        });
    }

    grunt.registerMultiTask('index', 'Process index.html.ejs template', function () {
        var jsFiles = filterForExtension('js', this.filesSrc),
            cssFiles = filterForExtension('css', this.filesSrc);

        grunt.file.copy('src/index.html.ejs', this.data.dir + '/index.html', {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
};