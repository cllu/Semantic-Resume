import gulp from 'gulp';
import gulpif from 'gulp-if';
import yargs from 'yargs';

let argv = yargs.argv;
let watch = !!argv.watch;

gulp.task('fonts', () => {
  return gulp.src('app/bower_components/font-awesome/fonts/*.{woff2,woff,ttf,eot,svg}')
    .pipe(gulp.dest('dist/fonts'));
});
