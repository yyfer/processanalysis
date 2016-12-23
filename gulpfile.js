/**
 * Created by yufan on 2016/12/15.
 */

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');
    webserver = require('gulp-webserver');

gulp.task('styles', function() {
    return sass('src/sass/**/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('src/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('src/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});
//
// gulp.task('images', function() {
//     return gulp.src('src/images/**/*')
//         .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//         .pipe(gulp.dest('src/assets/images'))
//         .pipe(notify({ message: 'Images task complete' }));
// });

gulp.task('clean', function() {
    return del(['src/css', 'src/js']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch',function() {
    // Watch .scss files
    gulp.watch('src/sass/**/*.scss', ['styles']);
    // Watch .scripts files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    // // Watch image files
    // gulp.watch('src/images/**/*', ['images']);
    //gulp server
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 8000,
            fallback: 'index.html'
        }));
});
