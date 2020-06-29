const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const fancyLog = require('fancy-log');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('copy-assets', async function() {
  return gulp.src(["index.html"])
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-ts', async function() {
  return browserify({
      basedir: '.',
      entries: ['src/main.ts'],
      debug: true
    })
    .plugin(tsify)
    .bundle()
    .on('error', fancyLog)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-sass', async function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', gulp.parallel(['copy-assets', 'compile-ts', 'compile-sass']));
gulp.task('watch', async function () {
  return gulp.watch(['src/scss/**/*.scss', 'index.html'], gulp.parallel(['compile-sass', 'copy-assets']));
});

gulp.task('default', gulp.series(['build']));