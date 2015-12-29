import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import browserSync from 'browser-sync';

import webpackConfig from './webpack.config';

let whost = '127.0.0.1';
let wport = 27185;

gulp.task('polyfill', () => {
  gulp.src('app/scripts/polyfill.js')
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

gulp.task('scripts:server', function() {
  var wconfig = webpackConfig(true);
  wconfig.entry = [
    'webpack-dev-server/client?http://'+whost+':'+wport,
    'webpack/hot/only-dev-server',
    './app/scripts/run.js'
  ];
  wconfig.output = {
    path: process.cwd(),
    contentBase: 'http://'+whost+':'+wport,
    filename: 'app.js',
    publicPath: 'http://'+whost+':'+wport+'/scripts/'
  };
  wconfig.plugins = wconfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);

  var server = new WebpackDevServer(webpack(wconfig), {
    publicPath: wconfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      progress: true
    }
  });

  server.listen(wport, function (err, result) {
    if (err) {
      console.log(err);
    }

    gutil.log('Webpack Dev Server started. Compiling...');
  });
});

gulp.task('scripts:build', ['styles'], function() {
  var wconfig = webpackConfig(false);
  return gulp.src('app/scripts/run.js')
    .pipe(webpackStream(wconfig))
    .pipe(uglify({
      preserveComments: false,
      compress: {
        warnings: false
      }
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dist/scripts'));
});

