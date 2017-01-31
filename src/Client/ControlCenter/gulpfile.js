(function() {
    //load package.json
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./package.json'));

    // Load plugins
    var gulp = require('gulp');
    var watch = require('gulp-watch');

    var gutil = require('gulp-util');
    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var less = require('gulp-less');
    var cleanCSS = require('gulp-clean-css');
    var sourcemaps = require('gulp-sourcemaps');
    var gwebpack = require('gulp-webpack');
    var webpack = require('webpack');
    var merge = require('gulp-merge-json');

    var util = require('gulp-util');
    var Attollo = {
        Env: util.env.Env ? util.env.Env : 'local'
    };

    gulp.task('ControlCenter:config', function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var version = json.version + '.' + year + '.' + month + '.' + day;

        gulp.src([
                './Client/ControlCenter/Config/config.json',
                './Client/ControlCenter/Config/config.' + Attollo.Env + '.json'
        ]).pipe(merge('config.json'))
            .pipe(replace('{current-version}', version))
            .pipe(gulp.dest('./Client/ControlCenter/jsx/'));
    });
 
    // Clean
    gulp.task('ControlCenter:clean', function() {
        
    });

    gulp.task('ControlCenter:less', ['ControlCenter:clean'], function() {
        return gulp.src('./Client/ControlCenter/less/app.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(cleanCSS({compatibility: 'ie8'}))
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

    gulp.task('ControlCenter:electron', ['ControlCenter:jsx', 'ControlCenter:less'], function() {
        return gulp.src([
            '../dist/Client/ControlCenter/app.js',
            '../dist/Client/ControlCenter/app.css',
            './Client/ControlCenter/Electron/index.html',
            './Client/ControlCenter/Electron/main.js',
            './Client/ControlCenter/Electron/package.json'
        ]).pipe(gulp.dest('../dist/Client/ControlCenterElectron/'));
    });

    gulp.task('ControlCenter:html', ['ControlCenter:clean'], function () {
        return gulp.src('./Client/ControlCenter/assets/index.html', { base: 'src' })
            .pipe(rename('index.html'))
            .pipe(gulp.dest('../dist/Client/ControlCenter/'))
            && gulp.src('./node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot', { base: 'src' })
                .pipe(rename('glyphicons-halflings-regular.eot'))
                .pipe(gulp.dest('../dist/Client/ControlCenter/fonts/'))
            && gulp.src('./node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg', { base: 'src' })
                .pipe(rename('glyphicons-halflings-regular.svg'))
                .pipe(gulp.dest('../dist/Client/ControlCenter/fonts/'))
            && gulp.src('./node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf', { base: 'src' })
                .pipe(rename('glyphicons-halflings-regular.ttf'))
                .pipe(gulp.dest('../dist/Client/ControlCenter/fonts/'))
            && gulp.src('./node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff', { base: 'src' })
                .pipe(rename('glyphicons-halflings-regular.woff'))
                .pipe(gulp.dest('../dist/Client/ControlCenter/fonts/'))
            && gulp.src('./node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2', { base: 'src' })
                .pipe(rename('glyphicons-halflings-regular.woff2'))
                .pipe(gulp.dest('../dist/Client/ControlCenter/fonts/'));
    });

    gulp.task('ControlCenter:watch:electron', function () {
        return watch(['./Client/ControlCenter/jsx/**/*.jsx', './Client/ControlCenter/Config/**/*.json'], function () {
            return gulp.run(['ControlCenter:electron']);
        });
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
        ['ControlCenter:watch:electron', 'ControlCenter:watch:jsx', 'ControlCenter:watch:html', 'ControlCenter:watch:less']
    );

    // Build
    gulp.task('ControlCenter:build',
        ['ControlCenter:electron', 'ControlCenter:jsx', 'ControlCenter:less', 'ControlCenter:html']
    );
})();