const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const del = require('del');

gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.scss', './components/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
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
    ]))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function (done) {
  gulp.watch(['./sass/**/*.scss', './components/**/*.scss'], gulp.series(['clean:css', 'sass']));
  done();
});

gulp.task('clean:css', function () {
  return del('css/**', { force: true });
});
