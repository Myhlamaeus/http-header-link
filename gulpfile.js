/* global require */

const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const main = path.basename(require('./package.json').main)

gulp.task('build', function () {
  return gulp.src('{' + main + ',lib/**/*.js}')
    .pipe(sourcemaps.init())
      .pipe(babel())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', function () {
  const mocha = require('gulp-mocha')

  return gulp.src('test/index.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan'
    }))
})
