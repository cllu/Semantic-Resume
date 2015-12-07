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
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  gulp.src('index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('pdf', () => {
  gulp.src('resume.pdf')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['styles', 'scripts', 'html', 'pdf'], () => {

  browserSync.init({
    server: "./dist/"
  });

  gulp.watch('index.html', ['html']);
  gulp.watch('./scripts/*.js', ['scripts']);
  gulp.watch('./styles/*.scss', ['styles'])
   .on('change', (e) => { 
     console.log(`File ${e.path} was ${e.type}, running Sass task...`); 
   });
});
