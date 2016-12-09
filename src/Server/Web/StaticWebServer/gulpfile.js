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

    gulp.task('StaticWebServer:config', () => {
        gulp.src([
                './Server/Web/StaticWebServer/Config/config.json',
                './Server/Web/StaticWebServer/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Server/Web/StaticWebServer/'));
    });
 
    // Clean
    gulp.task('StaticWebServer:clean', () => {
        
    });

    gulp.task('StaticWebServer:js', ['StaticWebServer:config', 'StaticWebServer:clean', 'Server:build'], () => {
        return gulp.src('./Server/Web/StaticWebServer/app.js')
            .pipe(gwebpack({
                target: 'node',
                externals: [nodeExternals()],
                module: {
                    entry: './Server/Web/StaticWebServer/app.js',
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
                    filename: 'StaticWebServer.min.js'
                }
            })).pipe(gulp.dest('../dist/Server/Web/StaticWebServer/'));
        }
    );
 
    gulp.task('StaticWebServer:watch:js', () => {
        return watch(['./Server/Web/StaticWebServer/**/*.js', './Server/Web/StaticWebServer/**/*.json', './Server/Common/**/*.js'], () => {
            return gulp.run(['StaticWebServer:js']);
        });
    });
 
    // Watch
    gulp.task('StaticWebServer:watch',
        ['StaticWebServer:watch:js']
    );


    // Build
    gulp.task('StaticWebServer:build',
        ['StaticWebServer:js']
    );
})();