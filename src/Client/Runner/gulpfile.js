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

    // Build
    gulp.task('Runner:build', ['Runner:jsx', 'Runner:less', 'Runner:html']);
})();