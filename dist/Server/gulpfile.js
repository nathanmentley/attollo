(function() {
    // Load plugins
    var gulp = require('gulp');

    // Clean
    gulp.task('Server:clean', function() {
        
    });

    gulp.task('Server:copy', ['Server:clean'], function () {
        return gulp.src('./Server/**/*', { base: 'src' })
             .pipe(gulp.dest('../dist/Server/'));
    });

    // Build
    gulp.task('Server:build', ['Server:copy']);
})();