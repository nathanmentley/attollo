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

    gulp.task('RunnerAPI:config', () => {
        gulp.src([
                './Server/Web/RunnerAPI/Config/config.json',
                './Server/Web/RunnerAPI/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Server/Web/RunnerAPI/'));
    });
 
    // Clean
    gulp.task('RunnerAPI:clean', () => {
        
    });

    gulp.task('RunnerAPI:js', ['RunnerAPI:config', 'RunnerAPI:clean'], () => {
        return gulp.src('./Server/Web/RunnerAPI/app.js')
            .pipe(gwebpack({
                target: 'node',
                externals: [nodeExternals()],
                module: {
                    entry: './Server/Web/RunnerAPI/app.js',
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
            })).pipe(gulp.dest('../dist/Server/Web/RunnerAPI/'));
        }
    );
 
    gulp.task('RunnerAPI:watch:js', () => {
        return watch(['./Server/Web/RunnerAPI/**/*.js', './Server/Web/RunnerAPI/**/*.json', './Server/Common/**/*.js'], () => {
            return gulp.run(['RunnerAPI:js']);
        });
    });
 
    // Watch
    gulp.task('RunnerAPI:watch',
        ['RunnerAPI:watch:js']
    );


    // Build
    gulp.task('RunnerAPI:build',
        ['RunnerAPI:js']
    );
})();