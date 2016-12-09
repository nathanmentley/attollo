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

    gulp.task('ControlCenterAPI:config', () => {
        gulp.src([
                './Server/Web/ControlCenterAPI/Config/config.json',
                './Server/Web/ControlCenterAPI/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Server/Web/ControlCenterAPI/'));
    });
 
    // Clean
    gulp.task('ControlCenterAPI:clean', () => {
        
    });

    gulp.task('ControlCenterAPI:js', ['ControlCenterAPI:config', 'ControlCenterAPI:clean', 'Server:build', 'Server:build'], () => {
        return gulp.src('./Server/Web/ControlCenterAPI/app.js')
            .pipe(gwebpack({
                target: 'node',
                externals: [nodeExternals()],
                module: {
                    entry: './Server/Web/ControlCenterAPI/app.js',
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
                    filename: 'ControlCenterAPI.min.js'
                }
            })).pipe(gulp.dest('../dist/Server/Web/ControlCenterAPI/'));
        }
    );
 
    gulp.task('ControlCenterAPI:watch:js', () => {
        return watch(['./Server/Web/ControlCenterAPI/**/*.js', './Server/Web/ControlCenterAPI/**/*.json', './Server/Common/**/*.js'], () => {
            return gulp.run(['ControlCenterAPI:js']);
        });
    });
 
    // Watch
    gulp.task('ControlCenterAPI:watch',
        ['ControlCenterAPI:watch:js']
    );


    // Build
    gulp.task('ControlCenterAPI:build',
        ['ControlCenterAPI:js']
    );
})();