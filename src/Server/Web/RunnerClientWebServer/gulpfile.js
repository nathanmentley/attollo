(() => {
    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');

    var gutil = require('gulp-util');
    var gwebpack = require('gulp-webpack');
    var webpack = require('webpack');
    var merge = require('gulp-merge-json');

    var nodeExternals = require('webpack-node-externals');

    var util = require('gulp-util');
    var Attollo = {
        Env: util.env.Env ? util.env.Env : 'local'
    };

    gulp.task('RunnerClientWebServer:config', () => {
        gulp.src([
                './Server/Web/RunnerClientWebServer/Config/config.json',
                './Server/Web/RunnerClientWebServer/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Server/Web/RunnerClientWebServer/'));
    });
 
    // Clean
    gulp.task('RunnerClientWebServer:clean', () => {
        
    });

    gulp.task('RunnerClientWebServer:js', ['RunnerClientWebServer:config', 'RunnerClientWebServer:clean'], () => {
        return gulp.src('./Server/Web/RunnerClientWebServer/app.js')
            .pipe(gwebpack({
                target: 'node',
                externals: [nodeExternals()],
                module: {
                    entry: './Server/Web/RunnerClientWebServer/app.js',
                    loaders: [
                        {
                            loader: 'babel-loader',
                            query: {
                                presets: ['es2015', 'react']
                            }
                        }
                    ]
                },
                plugins: [
                    //new webpack.HotModuleReplacementPlugin
                ],
                devtool: 'source-map',
                output: {
                    filename: 'app.js'
                }
            })).pipe(gulp.dest('../dist/Server/Web/RunnerClientWebServer/'));
        }
    );
 
    gulp.task('RunnerClientWebServer:watch:js', () => {
        return watch(['./Server/Web/RunnerClientWebServer/**/*.js', './Server/Web/RunnerClientWebServer/**/*.json', './Server/Common/**/*.js'], () => {
            return gulp.run(['RunnerClientWebServer:js']);
        });
    });
 
    // Watch
    gulp.task('RunnerClientWebServer:watch',
        ['RunnerClientWebServer:watch:js']
    );


    // Build
    gulp.task('RunnerClientWebServer:build',
        ['RunnerClientWebServer:js']
    );
})();