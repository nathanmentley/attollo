(function() {
    // Load plugins
    var gulp = require('gulp');
    var newer = require('gulp-newer');
    var watch = require('gulp-watch');

    require('./Client/ControlCenter/gulpfile.js')
    require('./Client/Runner/gulpfile.js');
    require('./Server/gulpfile.js');

    gulp.task('Platform:node_modules', ['Server:clean'], function () {
        return gulp.src('./node_modules/**/*', { base: 'src' })
             .pipe(newer('../dist/node_modules/'))
             .pipe(gulp.dest('../dist/node_modules/'));
    });
    gulp.task('Platform:package', ['Server:clean'], function () {
        return gulp.src('./package.json', { base: 'src' })
             .pipe(newer('../dist/package.json'))
             .pipe(gulp.dest('../dist/package.json'));
    });
 
    gulp.task('Platform:watch', ['Server:clean'], function () {
        return watch('./node_modules/**/*', function () {
            return gulp.src('./node_modules/**/*', { base: 'src' })
                .pipe(newer('../dist/node_modules/'))
                .pipe(gulp.dest('../dist/node_modules/'));
        });
    });

    // Build
    gulp.task('build', [
        'Platform:node_modules',
        'Platform:package',
        'ControlCenter:build',
        'Runner:build',
        'Server:build'
    ]);
 
    // Watch
    gulp.task('watch', [
        'Platform:watch',
        'ControlCenter:watch',
        'Runner:watch',
        'Server:watch'
    ]);

    // Default task
    gulp.task('default', ['build']);
})();