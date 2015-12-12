import fs from 'fs';
import source from 'vinyl-source-stream';
import gulp from 'gulp';
import sass from 'gulp-sass';
import browserify from 'browserify';
import watchify from 'watchify';

const browserSync = require('browser-sync').create(); 
const sassOpts = { outputStyle: 'compressed', errLogToConsole: true };

function compileScripts(watch) {
  var bundler = watchify(browserify('./app/scripts/app.js', { debug: true }).transform('babelify', {presets: ['es2015']}));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      //.pipe(buffer())
      //.pipe(fs.createWriteStream('app.js'))
      .pipe(gulp.dest('./dist/scripts'))
      .pipe(browserSync.stream());
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('styles', () => {
  gulp.src('./app/styles/*.scss')
   .pipe(sass(sassOpts))
   .pipe(gulp.dest('./dist/styles/'))
   .pipe(browserSync.stream());
});

gulp.task('html', () => {
  gulp.src('app/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('pdf', () => {
  gulp.src('resume.pdf')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile', () => {
  return compileScripts();
});

gulp.task('build', ['styles', 'html'], () => {return compileScripts()});

gulp.task('watch', ['styles', 'html', 'pdf'], () => {

  browserSync.init({
    server: "./dist/"
  });

  compileScripts(true);
  gulp.watch('app/*.html', ['html']);
  gulp.watch('./app/styles/*.scss', ['styles'])
   .on('change', (e) => { 
     console.log(`File ${e.path} was ${e.type}, running Sass task...`); 
   });
});

gulp.task('default', ['watch']);
