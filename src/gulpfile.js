(function() {
    // Load plugins
    var gulp = require('gulp');
    var mocha = require('gulp-mocha');
    var babel = require('babel-core/register');

    require('./Client/ControlCenter/gulpfile.js')
    require('./Client/Runner/gulpfile.js');

    require('./Server/gulpfile.js');
    
    require('./Server/Tools/DatabaseManager/gulpfile.js');

    require('./Server/Web/ControlCenterAPI/gulpfile.js');
    require('./Server/Web/RunnerAPI/gulpfile.js');
    require('./Server/Web/RunnerClientWebServer/gulpfile.js');
    require('./Server/Web/StaticWebServer/gulpfile.js');
    require('./Platform/gulpfile.js');

    // Test
    gulp.task('test', () => {
        gulp.src(["Tests/**/*.js"], {read: false})
            .pipe(mocha({
                reporter: 'spec',
                compilers: {
                    js: babel
                }
            }))
    });

    // Build
    gulp.task('build', [
        'test',

        'Platform:node_modules',
        'Platform:package',
        'ControlCenter:build',
        'Runner:build',

        'DatabaseManager:build',

        'ControlCenterAPI:build',
        'RunnerAPI:build',
        'RunnerClientWebServer:build',
        'StaticWebServer:build'
    ]);
 
    // Watch
    gulp.task('watch', [
        'Platform:watch',
        'ControlCenter:watch',
        'Runner:watch',

        'Server:watch',

        'DatabaseManager:watch',

        'ControlCenterAPI:watch',
        'RunnerAPI:watch',
        'RunnerClientWebServer:watch',
        'StaticWebServer:watch'
    ]);

    // Default task
    gulp.task('default', ['build']);
})();