var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('clean', function(cb) {
    return del('assets/dist');
});

gulp.task('styles', function () {
    gulp.src('assets/src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie 9']}))
    .pipe(gulp.dest('assets/dist/css'))
    .pipe(rename('main.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('assets/dist/css'));
});

gulp.task('scripts', function () {
    // unminified and minified
    gulp
        .src([
            'assets/src/js/vendor/modernizr.js',
            'assets/src/js/vendor/jquery.min.js',
            'assets/src/js/main.js'
        ])
        .pipe(concat('main_jq.js'))
        .pipe(gulp.dest('assets/dist/js'))
        .pipe(rename('main_jq.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'));

    gulp
        .src([
            'assets/src/js/vendor/modernizr.js',
            'assets/src/js/vendor/jquery.min.js',
            'assets/src/js/vendor/angular.min.js',
            'assets/src/js/vendor/angular-animate.min.js',
            'assets/src/js/vendor/angular-sanitize.min.js',
            'assets/src/js/vendor/angular-cookies.min.js',
            'assets/src/js/main.js'
        ])
        .pipe(concat('main_jq_ng.js'))
        .pipe(gulp.dest('assets/dist/js'))
        .pipe(rename('main_jq_ng.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'));

    
});


gulp.task('images', function () {
    gulp.src('assets/src/img/**')
        .pipe(newer('assets/dist/img'))
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('assets/dist/img'));
});

gulp.task('default', ['styles', 'scripts', 'images']);

gulp.task('watch', function () {
    watch('assets/src/sass/**', { readDelay: 100 }, batch(function(events, done){
        gulp.start('styles', done);
    }));
    watch('assets/src/js/**', { readDelay: 100 }, batch(function(events, done){
        gulp.start('scripts', done);
    }));
   
});