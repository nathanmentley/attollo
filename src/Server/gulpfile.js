(function() {
    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');

    var docker = (new require('dockerode'))({socketPath: '/var/run/docker.sock'});
    var serverSideContainerNames = [
        'attollo-controlcenterapi',
        'attollo-runnerapi',
        'attollo-controlcenter',
        'attollo-runner'
    ];

    // Clean
    gulp.task('Server:clean', function() {
    });
    gulp.task('Platform:clean', function() {
    });

    gulp.task('Server:copy', ['Server:clean'], function () {
        return gulp.src('./Server/**/*', { base: 'src' })
            .pipe(gulp.dest('../dist/Server/'));
    });

    gulp.task('Platform:copy', ['Platform:clean'], function () {
        return gulp.src('./Platform/**/*', { base: 'src' })
             .pipe(gulp.dest('../dist/Platform/'));
    });

    gulp.task('Server:restart', ['Server:copy', 'Platform:copy'], function () {
        for(var i = 0; i < serverSideContainerNames.length; i++) {
            docker.getContainer(serverSideContainerNames[i]).restart(function (err, data) {});
        }
    });

    gulp.task('Server:watch', function () {
        return watch(['./Server/**/*', './Platform/**/*'], function () {
            return gulp.run(['Server:restart']);
        });
    });

    // Build
    gulp.task('Server:build', ['Server:copy', 'Platform:copy']);
})();