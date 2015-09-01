'use strict';

var gutil  = require('gulp-util'),
    notify = require('gulp-notify');

module.exports = function(error) {
    var lineNumber = error.lineNumber ? 'LINE ' + error.lineNumber + ' -- ' : '',
        report     = '',
        chalk      = gutil.colors.white.bgRed;

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: lineNumber + 'See console.',
        sound: 'Sosumi'
    }).write(error);

    gutil.beep();

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';

    if (error.lineNumber) {
        report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
    }
    if (error.fileName) {
        report += chalk('FILE:') + ' ' + error.fileName + '\n';
    }

    console.error(report); // eslint-disable-line no-console

    this.emit('end');
};
