'use strict';

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      pxtorem({
        replace: true
      })
    ]))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function (done) {
  gulp.watch('./sass/**/*.scss', gulp.parallel(['sass']));
  done();
});
