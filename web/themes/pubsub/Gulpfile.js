const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const del = require('del');

function doSassyShit(stream) {
  return stream.pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer(),
    pxtorem({
      replace: true,
      propList: [
        '*',
        '!background-position',
        '!border',
        '!border-width',
        '!box-shadow',
        '!border-top*',
        '!border-right*',
        '!border-bottom*',
        '!border-left*',
        '!border-start*',
        '!border-end*',
        '!outline*',
      ],
      mediaQuery: true,
      minPixelValue: 3,
    })
  ]));
}

gulp.task('compile-sass-directory-sass', function () {
  return doSassyShit(gulp.src(['./sass/**/*.scss'])).pipe(gulp.dest('./css'));
});

gulp.task('compile-component-directory-sass', function () {
  return doSassyShit(gulp.src(['./components/**/*.scss'])).pipe(gulp.dest('./components'));
});

gulp.task('watch', function (done) {
  gulp.watch(['./sass/**/*.scss'], gulp.series(['clean:css-directory-css', 'compile-sass-directory-sass']));
  gulp.watch(['./components/**/*.scss'], gulp.series(['clean:component-directory-css', 'compile-component-directory-sass']));
  done();
});

gulp.task('clean:css-directory-css', function () {
  return del('css/**', { force: true });
});

gulp.task('clean:component-directory-css', function () {
  return del('css/**', { force: true });
});
