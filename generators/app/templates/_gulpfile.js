'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const a11y = require('gulp-a11y');

///////////////////////////
// File Paths
///////////////////////////

const PATHS = {
  test: 'tests/*.js',
  clean: 'public/**/*.{css,js}',
  server: [
    'server.js',
    'bin/www'
  ],
  sass: 'scss/**/*.scss',
  html: [
    'views/*.html',
    'views/**/*.html'
  ]
}

///////////////////////////
// Tests
///////////////////////////

gulp.task('test:mocha', () => {
  return gulp.src(PATHS.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test:a11y', () => {
  return gulp.src(PATHS.html)
    .pipe(a11y())
    .pipe(a11y.reporter());
});

gulp.task('test', ['test:mocha', 'test:a11y']);


///////////////////////////
// Browser-Sync + Nodemon
///////////////////////////

gulp.task('browser-sync', () => {
  browserSync.init({
    logPrefix: 'brianhan.io',
    open: false,
    proxy: 'localhost:8080',
    port: 3000
  });
});

gulp.task('nodemon', () => {
  return nodemon({
    script: './bin/www',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

process.once('SIGINIT', () => {
  process.exit(0);
});

///////////////////////////
// Clean
///////////////////////////

gulp.task('clean', () => {
  return del(PATHS.clean);
})

///////////////////////////
// Styles
///////////////////////////

gulp.task('sass', () => {
  return gulp.src(PATHS.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream());
});

///////////////////////////
// Running Tasks
///////////////////////////

gulp.task('build', () => {
  runSequence('clean', ['sass']);
});

gulp.task('default', () => {
  runSequence('build', 'nodemon', 'browser-sync', 'test');
  gulp.watch(PATHS.sass, ['sass']);
  gulp.watch(PATHS.server, ['test']);
  gulp.watch(PATHS.html, ['test']).on('change', browserSync.reload);
});
