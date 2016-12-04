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

    gulp.task('DatabaseManager:config', () => {
        gulp.src([
                './Server/Tools/DatabaseManager/Config/config.json',
                './Server/Tools/DatabaseManager/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Server/Tools/DatabaseManager/'));
    });
 
    // Clean
    gulp.task('DatabaseManager:clean', () => {
        
    });

    gulp.task('DatabaseManager:js', ['DatabaseManager:config', 'DatabaseManager:clean'], () => {
        return gulp.src('./Server/Tools/DatabaseManager/app.js')
            .pipe(gwebpack({
                target: 'node',
                externals: [nodeExternals()],
                module: {
                    entry: './Server/Tools/DatabaseManager/app.js',
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
            })).pipe(gulp.dest('../dist/Server/Tools/DatabaseManager/'));
        }
    );
 
    gulp.task('DatabaseManager:watch:js', () => {
        return watch(['./Server/Tools/DatabaseManager/**/*.js', './Server/Tools/DatabaseManager/**/*.json', './Server/Common/**/*.js'], () => {
            return gulp.run(['DatabaseManager:js']);
        });
    });
 
    // Watch
    gulp.task('DatabaseManager:watch',
        ['DatabaseManager:watch:js']
    );


    // Build
    gulp.task('DatabaseManager:build',
        ['DatabaseManager:js']
    );
})();