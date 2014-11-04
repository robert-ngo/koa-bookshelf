'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  mocha = require('gulp-mocha-co'),
  watch = require('gulp-watch');


// Copy all static images
gulp.task('test', function () {
  gulp.src('./test/*.js')
    .pipe(mocha({
      ignoreLeaks: false,
      reporter: 'nyan'
    }));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'app.js', env: { 'NODE_ENV': 'development' }, nodeArgs: ['--debug=9999', '--harmony-generators']})
    .on('restart');
});

// Rerun the task when a file changes

gulp.task('watch', function() {
    gulp.src(['*.js','routes/*.js', 'models/*.js', 'config/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }));
});

// gulp.task('sass-watch', function() {
//   gulp.watch('./public/sass/*.scss', ['sass']);
// })

// The default task (called when you run `gulp` from cli)
//gulp.task('default', ['test', 'nodemon', 'watch']);
gulp.task('default', ['nodemon', 'watch']);