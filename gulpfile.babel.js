import gulp from 'gulp';
import sass from 'gulp-sass';

const browserSync = require('browser-sync').create(); 
const sassOpts = { outputStyle: 'compressed', errLogToConsole: true };
 
gulp.task('styles', () => {
  gulp.src('./styles/*.scss')
   .pipe(sass(sassOpts))
   .pipe(gulp.dest('./dist/styles/'))
   .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  gulp.src('./scripts/*.js')
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(() => browserSync.reload());
});

gulp.task('html', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(() => browserSync.reload());
});

gulp.task('default', ['styles'], () => {

  browserSync.init({
    server: "./dist/"
  });

  gulp.watch('index.html', ['html']);
  gulp.watch('./scripts/*.js', ['scripts']);
  gulp.watch('./styles/*.scss', ['sass'])
   .on('change', (e) => { 
     console.log(`File ${e.path} was ${e.type}, running Sass task...`); 
   });
});
