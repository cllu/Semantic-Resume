import gulp from 'gulp';
import yargs from 'yargs';

let argv = yargs.argv;
let production = argv.production ? true : false;

gulp.task('build', ['styles', 'fonts', 'html', 'polyfill', 'scripts:build']);

gulp.task('watch', ['styles', 'fonts', 'html', 'polyfill', 'scripts:server'], () => {

  const browserSync = require('browser-sync').create();

  browserSync.init({
    server: "./dist/"
  });

  gulp.watch('app/*.html', ['html']);
  gulp.watch('./app/styles/*.scss', ['styles'])
    .on('change', (e) => {
      console.log(`File ${e.path} was ${e.type}, running Sass task...`);
    });
});

if (production) {
  gulp.task('default', ['build'])
} else {
  gulp.task('default', ['watch']);
}

