import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import useref from 'gulp-useref';
import preprocess from 'gulp-preprocess';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';

let argv = yargs.argv;
let production = !!argv.production;
let watch = !!argv.watch;

gulp.task('html:useref', () => {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['html:useref'], () => {
  gulp.src('app/*.html')
    .pipe(gulpif(production, preprocess({context: { NODE_ENV: 'production' }})))
    .pipe(gulpif(!production, preprocess({context: { NODE_ENV: 'development' }})))
    .pipe(useref({noAssets: true}))
    .pipe(gulp.dest('./dist/'))
    .pipe(gulpif(watch, browserSync.reload({stream: true})));
});
