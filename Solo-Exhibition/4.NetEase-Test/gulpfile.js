var gulp = require('gulp'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade');

gulp.task('live-server', function() {
    connect.server({
        root: 'project',
        port: 8080,
        livereload: true
    });
});

gulp.task('default', [
    'live-server',
    'templates',
    'compass',
    'script',
    'watch'
]);

gulp.task('compass', function() {
    gulp.src('./project/sass/style.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'project/css',
            sass: 'project/sass',
        }))
        .pipe(gulp.dest('project/css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src('./project/*.html')
        .pipe(connect.reload());
});

gulp.task('script', function() {
    gulp.src('./project/js/**/*.js')
        .pipe(plumber())
        .pipe(connect.reload());
});

gulp.task('templates', function() {
    gulp.src('./project/jade/index.jade')
        .pipe(plumber())
        .pipe(jade({
            locals: '',
            pretty: true
        }))
        .pipe(gulp.dest('project'));
});

gulp.task('watch', function() {
    gulp.watch('./project/js/**/*.js', ['script']);
    gulp.watch('./project/sass/**/*.scss', ['compass']);
    gulp.watch('./project/*.html', ['html']);
    gulp.watch('./project/jade/**/*.jade', ['templates']);
});
