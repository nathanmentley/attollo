(function() {
    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');
    var merge = require('gulp-merge-json');

    var util = require('gulp-util');
    var Attollo = {
        Env: util.env.Env ? util.env.Env : 'local'
    };
    
    // Clean
    gulp.task('Server:clean', function() {
    });

    gulp.task('Server:DatabaseManager:config', function() {
    });

    gulp.task('Server:config', function() {
        var serverOutputDirs = [
            'Tools/DatabaseManager',
            'Web/ControlCenterAPI',
            'Web/RunnerAPI',
            'Web/StaticWebServer',
            'Tasks/TestTask',
            'Processors/Email'
        ];

        for(var i = 0; i < serverOutputDirs.length; i++) {
            gulp.src([
                    './Server/' + serverOutputDirs[i] + '/Config/config.json',
                    './Server/' + serverOutputDirs[i] + '/Config/config.' + Attollo.Env + '.json'
            ]).pipe(merge('config.json'))
                .pipe(gulp.dest('../dist/Server/' + serverOutputDirs[i] + '/'));
        }
    });

    gulp.task('Server:copy', ['Server:clean'], function () {
        return gulp.src('./Server/**/*', { base: 'src' })
             .pipe(gulp.dest('../dist/Server/'));
    });

    gulp.task('Server:watch', function () {
        return watch('./Server/**/*', function () {
            return gulp.run(['Server:copy']);
        });
    });

    // Build
    gulp.task('Server:build', ['Server:copy', 'Server:config']);
})();