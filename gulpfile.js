
//변수선언

const gulp = require('gulp');
const cssMin = require('gulp-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const { src, dest, series, parallel, watch } = require('gulp');


// CSS & JS Source File Path Setting
const cssfiles = {
  file1 : './css/lib/*.css',
  file2 : './css/asset/reset.css',
  file3 : './css/asset/main.css'
}

const jsfiles = {
  file1 : './js/asset/jquery-1.9.1.min.js',
  file2 : './js/lib/etc/*.js',
  file3 : './js/lib/jarallax/jarallax.min.js',
  file4 : './js/lib/jarallax/jarallax-video.min.js',
  file5 : './js/lib/scrollmagic/ScrollMagic.min.js',
  file6 : './js/lib/scrollmagic/debug.addIndicators.min.js',
  file7 : './js/lib/scrollmagic/TweenMax.min.js',
  file8 : './js/lib/scrollmagic/animation.gsap.min.js',
  file9 : './js/asset/main.js'
}

// Copy Task
function copyIndex(){
  return src('./*.html').pipe(gulp.dest('dist/'));
}

function copyFont(){
  return src('./fonts/*').pipe(gulp.dest('dist/fonts'));
}

function copyFavicon(){
  return src('./*.ico').pipe(gulp.dest('dist/'));
}

function copyHtml(){
  return src('./html/*.html').pipe(gulp.dest('dist/html'));
}

function copyVideo(){
  return src('./video/*').pipe(gulp.dest('dist/video'));
}


// Image Task
function imgTask(){
  return src('./images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}

// CSS Task
function cssTask(){
  return src([cssfiles.file1, cssfiles.file2, cssfiles.file3])
    .pipe(concat('main.css'))
    .pipe(cssMin())
    .pipe(dest('dist/css'));
}

// JS Task
function jsTask(){
  return src([jsfiles.file1, jsfiles.file2, jsfiles.file3, jsfiles.file4, jsfiles.file5, jsfiles.file6, jsfiles.file7, jsfiles.file8, jsfiles.file9])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'));
}


// 실행하기
exports.jsTask = jsTask;
exports.cssTask = cssTask;
exports.imgTask = imgTask;
exports.copyIndex = copyIndex;
exports.copyHtml = copyHtml;
exports.copyFavicon = copyFavicon;
exports.copyVideo = copyVideo;
exports.default = parallel(jsTask, cssTask, imgTask, copyIndex, copyHtml, copyFavicon, copyFont, copyVideo);
