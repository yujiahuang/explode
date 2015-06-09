var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function(){
  gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  browserSync({
    files: ['./public/**/*', './views/**/*']
  });
  gulp.watch('./src/less/**/*.less', ['less']);
});

gulp.task('start', function () {
  nodemon({
    script: './bin/www'
  , ext: 'js'
  , ignore: ['public/*', './views/**/*', './src/**/*']
  , env: { 'PORT': 32382, 'NODE_ENV': 'development', 'DEBUG': 'ExplodeBall:*' }
  })
});

gulp.task('default', ['less', 'start', 'watch']);