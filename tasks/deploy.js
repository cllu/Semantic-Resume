import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

// setup custom domain for GitHub Pages
gulp.task('cname', () => {
  require('fs').writeFileSync('dist/CNAME', 'semantic-resume.chunlianglyu.com');
});

// deploy to the GitHub Pages
gulp.task('deploy', ['cname'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
