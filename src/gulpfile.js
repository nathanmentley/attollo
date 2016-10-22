(function() {
    // Load plugins
    var gulp = require('gulp');

    require('./Client/ControlCenter/gulpfile.js')
    require('./Client/Runner/gulpfile.js');
    require('./Server/gulpfile.js');
    require('./Platform/gulpfile.js');

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
    gulp.task('watch-native', [
        'ControlCenter:watch',
        'Runner:watch'
    ]);

    // Default task
    gulp.task('default', ['build']);
})();