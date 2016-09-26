(function() {
    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');

    var gutil = require('gulp-util');
    var rename = require('gulp-rename');
    var less = require('gulp-less');
    var sourcemaps = require('gulp-sourcemaps');
    var gwebpack = require('gulp-webpack');
    var webpack = require('webpack');
    var merge = require('gulp-merge-json');

    var util = require('gulp-util');
    var Attollo = {
        Env: util.env.Env ? util.env.Env : 'local'
    };

    gulp.task('Runner:config', function() {
        gulp.src([
                './Client/Runner/Config/config.json',
                './Client/Runner/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('../dist/Client/Runner/'));
    });
 
    // Clean
    gulp.task('Runner:clean', function() {
        
    });

    gulp.task('Runner:less', ['Runner:clean'], function() {
        return gulp.src('./Client/Runner/less/app.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('../dist/Client/Runner/'));
    });

    gulp.task('Runner:jsx', ['Runner:clean'], function () {
        return gulp.src('./Client/Runner/jsx/app.jsx')
            .pipe(gwebpack({
                module: {
                    entry: './Client/Runner/jsx/app.jsx',
                    loaders: [{
                        loader: 'babel-loader',
                        exclude: /(node_modules|bower_components)/,
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }]
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {warnings: false},
                        output: {comments: false},
                        sourceMap: true
                    })
                ],
                devtool: 'source-map',
                output: {
                    filename: 'app.js'
                }
            })).pipe(gulp.dest('../dist/Client/Runner/'));
        }
    );

    gulp.task('Runner:html', ['Runner:clean'], function () {
        return gulp.src('./Client/Runner/assets/index.html', { base: 'src' })
            .pipe(rename('index.html'))
            .pipe(gulp.dest('../dist/Client/Runner/'));
    });
 
    gulp.task('Runner:watch:jsx', function () {
        return watch('./Client/Runner/jsx/**/*.jsx', function () {
            return gulp.run(['Runner:jsx']);
        });
    });
 
    gulp.task('Runner:watch:html', function () {
        return watch('./Client/Runner/assets/index.html', function () {
            return gulp.run(['Runner:html']);
        });
    });
 
    gulp.task('Runner:watch:less', function () {
        return watch('./Client/Runner/less/**/*.less', function () {
            return gulp.run(['Runner:less']);
        });
    });
 
    // Watch
    gulp.task('Runner:watch',
        ['Runner:watch:jsx', 'Runner:watch:html', 'Runner:watch:less']
    );


    // Build
    gulp.task('Runner:build',
        ['Runner:jsx', 'Runner:less', 'Runner:html', 'Runner:config']
    );
})();