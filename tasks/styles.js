import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';
import browserSync from 'browser-sync';
import yargs from 'yargs';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

const sassOpts = { outputStyle: 'compressed', errLogToConsole: true };

gulp.task('styles', () => {
  gulp.src('./app/styles/*.scss')
    .pipe(sass(sassOpts))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(minifyCss())
    .pipe(rename('resume.min.css'))
    .pipe(gulp.dest('./app/styles'))
    .pipe(browserSync.stream());
});

