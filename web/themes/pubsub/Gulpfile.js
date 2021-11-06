'use strict';

var gulp = require('gulp');
var sass = require('gulp-dart-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function (done) {
  gulp.watch('./sass/**/*.scss', gulp.parallel(['sass']));
  done();
});
