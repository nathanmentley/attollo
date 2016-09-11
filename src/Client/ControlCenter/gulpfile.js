(function() {
    // Load plugins
    var gulp = require('gulp');

    var gutil = require('gulp-util');
    var rename = require('gulp-rename');
    var less = require('gulp-less');
    var sourcemaps = require('gulp-sourcemaps');
    var gwebpack = require('gulp-webpack');
    var webpack = require('webpack');
 
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

    gulp.task('ControlCenter:jsx', ['ControlCenter:clean'], function () {
        return gulp.src('./Client/ControlCenter/jsx/app.jsx')
            .pipe(gwebpack({
                module: {
                    entry: './Client/ControlCenter/jsx/app.jsx',
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
            })).pipe(gulp.dest('../dist/Client/ControlCenter/'));
        }
    );

    gulp.task('ControlCenter:html', ['ControlCenter:clean'], function () {
        return gulp.src('./Client/ControlCenter/assets/index.html', { base: 'src' })
            .pipe(rename('index.html'))
            .pipe(gulp.dest('../dist/Client/ControlCenter/'));
    });

    // Build
    gulp.task('ControlCenter:build', ['ControlCenter:jsx', 'ControlCenter:less', 'ControlCenter:html']);
})();