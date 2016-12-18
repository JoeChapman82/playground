/******
gulp.task('task-name', function() {
console.log('hello');
});
********/


var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');


gulp.task('sass', function(){
  return gulp.src('playground/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('playground/stylesheets'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('playground/scss/**/*.scss', ['sass']);
  gulp.watch('playground/**/*.html', browserSync.reload);
  gulp.watch('playground/scripts/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'playground'
    },
  })
})
