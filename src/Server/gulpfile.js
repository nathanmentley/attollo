(function() {
    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');

    // Clean
    gulp.task('Server:clean', function() {
        
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
    gulp.task('Server:build', ['Server:copy']);
})();