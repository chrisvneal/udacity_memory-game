// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
require('babel-core');
require('babel-preset-env');
var browserSync = require('browser-sync').create();

// Directories
var scssFolder = 'src/scss/**/*.scss';
var cssFolder = 'dist/css';
var htmlSource = 'src/*.html';
var jsSource = 'src/js/*.js';
var jsDist = 'dist/js'
var htmlDist = 'dist';
var sourcmapFolder = './maps';

// Gulp Tasks ************************************

// convert SASS files to CSS: 'scss'
gulp.task('scss', function() {
  return gulp.src(scssFolder)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write(sourcmapFolder))
    .pipe(gulp.dest(cssFolder))
    .pipe(browserSync.stream())
});

// copy all html files to 'dist' once file saved
gulp.task('copy-html', function() {
  return gulp.src(htmlSource)
    .pipe(gulp.dest(htmlDist))
    .pipe(browserSync.stream())
});

// copy all javascript files to 'dist' once file saved
gulp.task('copy-js', function() {
  return gulp.src(jsSource)
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(jsDist))
    .pipe(browserSync.stream())
});

// initialize browser sync for live reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: htmlDist
    }
  });
});

// watch html and scss files for changes
gulp.task('watch', ['copy-html', 'browserSync', 'scss'], function() {
  gulp.watch(scssFolder, ['scss']);
  gulp.watch(htmlSource, ['copy-html']);
  gulp.watch(jsSource, ['copy-js']);
});


// start all gulp taks by entering 'gulp' at the command line
gulp.task('default', ['watch']);