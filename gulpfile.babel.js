import fs from 'fs';
import gulp from 'gulp';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import webpack from 'webpack';

const browserSync = require('browser-sync').create(); 
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

gulp.task('html', () => {
  gulp.src('app/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('pdf', () => {
  gulp.src('resume.pdf')
    .pipe(gulp.dest('./dist/'));
});


var webpackConfig = (watch) => {
  return {
    entry: './app/scripts/app.js',
    output: {
      path: './dist/scripts',
      filename: 'app.js'
    },
    module: {
      loaders: [
        {
          test: /[\.jsx|\.js]$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        }
      ]
    },
    resolve: {
      modulesDirectories: ['node_modules', 'app/scripts'],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    externals: {
    }
  };
};

gulp.task('polyfill', () => {
  gulp.src('app/scripts/details.polyfill.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(rename('polyfill.min.js'))
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('compile', ['polyfill'], (done) => {
  var config = webpackConfig(false);
  webpack(config).run(function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    browserSync.reload();
    done();
  });
  //return compileScripts();
});

gulp.task('build', ['styles', 'html', 'compile']);

gulp.task('watch', ['styles', 'html', 'compile', 'pdf'], () => {

  browserSync.init({
    server: "./dist/"
  });

  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/scripts/*.js', ['compile']);
  gulp.watch('./app/styles/*.scss', ['styles'])
   .on('change', (e) => { 
     console.log(`File ${e.path} was ${e.type}, running Sass task...`); 
   });
});

gulp.task('default', ['watch']);
