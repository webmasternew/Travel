const gulp = require('gulp');
const watch = require('gulp-watch');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const changed = require('gulp-changed');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssbeautify = require('gulp-cssbeautify');
const csscomb = require('gulp-csscomb');
const fileinclude = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');
const concat = require('gulp-concat');
const prettify = require('gulp-jsbeautifier');

const jsConcatFileName = 'js-all.js';
const paths = {
  src: 'src',
  srcHTML: 'src/*.html',
  srcHTMLcomponents: 'src/html/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/js/**/*.js',
  srcSASS: 'src/sass/**/*.scss',
  srcLESS: 'src/less/styles.less',
  srcImages: 'src/img/**/*',

  tmp: 'tmp',
  tmpHTML: 'tmp',
  tmpCSS: 'tmp/css',
  tmpJS: 'tmp/js',
  tmpImages: 'tmp/img',


  dist: 'dist',
  distHTML: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/css',
  distJS: 'dist/js',
  distImages: 'dist/img'
};

const preprocessorList = ['sass','less'];

let currentPreprocessor = preprocessorList[0];
let preprocessor;
let preprocessorPath;
if (currentPreprocessor === preprocessorList[1]) {
    preprocessor = less();
    preprocessorPath = paths.srcLESS;
}
else {
    preprocessor = sass();
    preprocessorPath = paths.srcSASS;
}


gulp.task('less', function () {
    return gulp.src(paths.srcLESS)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.tmpCSS))
        .pipe(browserSync.reload({
                stream: true
            }))
});

gulp.task('sass', function () {
    return gulp.src(paths.srcSASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.tmpCSS))
        .pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('watch',['browserSync'], function () {
    gulp.watch(paths.srcLESS,['less']);
    gulp.watch(paths.srcSASS,['sass']);
    gulp.watch([paths.srcHTML,paths.srcHTMLcomponents],['processHtml',browserSync.reload]);
    gulp.watch(paths.srcJS,['processJs',browserSync.reload]);
    gulp.watch('src/img/**/*.*',['images',browserSync.reload]);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: paths.tmp
        },
    })
});

gulp.task('buildStyles',function () {
    return gulp.src(preprocessorPath)
        .pipe(plumber())
        .pipe(preprocessor)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(paths.tmpCSS))
        .pipe(gulp.dest(paths.distCSS))
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(paths.distCSS))

});

gulp.task('images', function () {
    return gulp.src(paths.srcImages)
        .pipe(changed(paths.tmpImages))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.tmpImages))
        .pipe(gulp.dest(paths.distImages))
});

gulp.task('build',function () {
    runSequence('removeTempFolders',['buildStyles','processJs','images','processHtml'],function () {
        
    });

});

gulp.task('processHtml',function () {
    return gulp.src(paths.srcHTML)
        .pipe(plumber())
        .pipe(changed(paths.srcHTML))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/html'
        }))
        .pipe(htmlbeautify({indentSize: 2}))
        .pipe(gulp.dest(paths.tmpHTML))
        .pipe(gulp.dest(paths.distHTML))

});

gulp.task('removeTempFolders', function () {
    return gulp.src([paths.dist,paths.tmp], {read: false})
        .pipe(clean());
});

gulp.task('processJs',function () {
    return gulp.src(paths.srcJS)
        .pipe(plumber())
        .pipe(concat(jsConcatFileName))
        .pipe(prettify())
        .pipe(changed(paths.tmpJS))
        .pipe(gulp.dest(paths.tmpJS))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJS))
});
