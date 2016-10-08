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

    gulp.task('ControlCenter:config', function() {
        gulp.src([
                './Client/ControlCenter/Config/config.json',
                './Client/ControlCenter/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(gulp.dest('./Client/ControlCenter/jsx/'));
    });
 
    // Clean
    gulp.task('ControlCenter:clean', function() {
        
    });

    gulp.task('ControlCenter:less', ['ControlCenter:clean'], function() {
        return gulp.src('./Client/ControlCenter/less/app.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('../dist/Client/ControlCenter/'));
    });

    gulp.task('ControlCenter:jsx', ['ControlCenter:config', 'ControlCenter:clean'], function () {
        return gulp.src('./Client/ControlCenter/jsx/app.jsx')
            .pipe(gwebpack({
                module: {
                    entry: './Client/ControlCenter/jsx/app.jsx',
                    loaders: [
                        {
                            loader: 'babel-loader',
                            exclude: /(node_modules|bower_components)/,
                            query: {
                                presets: ['es2015', 'react']
                            }
                        }
                    ]
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
            })).pipe(gulp.dest('../dist/Client/ControlCenter/'));
        }
    );

    gulp.task('ControlCenter:html', ['ControlCenter:clean'], function () {
        return gulp.src('./Client/ControlCenter/assets/index.html', { base: 'src' })
            .pipe(rename('index.html'))
            .pipe(gulp.dest('../dist/Client/ControlCenter/'));
    });
 
    gulp.task('ControlCenter:watch:jsx', function () {
        return watch(['./Client/ControlCenter/jsx/**/*.jsx', './Client/ControlCenter/Config/**/*.json'], function () {
            return gulp.run(['ControlCenter:jsx']);
        });
    });
 
    gulp.task('ControlCenter:watch:html', function () {
        return watch('./Client/ControlCenter/assets/index.html', function () {
            return gulp.run(['ControlCenter:html']);
        });
    });
 
    gulp.task('ControlCenter:watch:less', function () {
        return watch('./Client/ControlCenter/less/**/*.less', function () {
            return gulp.run(['ControlCenter:less']);
        });
    });
 
    // Watch
    gulp.task('ControlCenter:watch',
        ['ControlCenter:watch:jsx', 'ControlCenter:watch:html', 'ControlCenter:watch:less']
    );

    // Build
    gulp.task('ControlCenter:build',
        ['ControlCenter:jsx', 'ControlCenter:less', 'ControlCenter:html']
    );
})();