(function() {
    // Load plugins
    var gulp = require('gulp');

    require('./Client/ControlCenter/gulpfile.js')
    require('./Client/Runner/gulpfile.js');
    require('./Server/gulpfile.js');
 
    // Build
    gulp.task('build', [
        'ControlCenter:build',
        'Runner:build',
        'Server:build'
    ]);

    // Default task
    gulp.task('default', ['build']);
})();