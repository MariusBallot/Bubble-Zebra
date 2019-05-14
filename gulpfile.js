var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var glsl = require('glslify')

sass.compiler = require('node-sass');



gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});




gulp.task('build', function () {
  // app.js is your main JS file with all your module inclusions
  return browserify({
    entries: './src/js/index.js',
    debug: true
  })
    .transform("babelify", {
      presets: ["@babel/env"]
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'))
});


gulp.task('dev', function () {
  // app.js is your main JS file with all your module inclusions
  return browserify({
    entries: './src/js/index.js',
    debug: true
  })
    .transform("babelify", {
      presets: ["@babel/env"]
    })
    .transform("glslify")
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/js/'))
});


gulp.task('watch', function () {
  gulp.watch('./src/js/*.js', ['dev'])
  gulp.watch('./src/js/shaders/*.glsl', ['dev'])
  gulp.watch('./src/sass/*.scss', ['sass'])
})


gulp.task('default', ['watch'])

