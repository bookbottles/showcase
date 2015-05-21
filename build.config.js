module.exports = {

    build_dir: 'build',

    app_files: {
        js: ['src/app/**/*.js'],
        // our partial templates
        atpl: ['src/app/**/*.tpl.html'],
        // the index.html
        html: ['src/index.html.ejs']
    },

    // Src files from Bower to include and minify
    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/angular-ui-router/release/angular-ui-router.js'
        ]
    },

    // External src files to prepend/append
    ext_files: {
        pre_js: [],
        post_js: [
            'ext/*.js'
        ]
    },

    // Dev server port
    port: 3444
};