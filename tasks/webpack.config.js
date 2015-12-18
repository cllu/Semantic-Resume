import path from 'path';
import webpack from 'webpack';

var webpackConfig = function(withHotLoader) {
  //var loaders = ['react-hot', 'babel-loader?cacheDirectory&stage=1&compact=false&optional=runtime'];
  var loaders = ['react-hot', 'babel-loader'];
  if(!withHotLoader) {
    loaders.shift();
  }

  return {
    //entry: './app/scripts/app.js',
    //output: {
    //  path: './dist/scripts',
    //  filename: 'app.js'
    //},
    cache: true,
    module: {
      loaders: [
        {
          test: /[\.jsx|\.js]$/,
          exclude: /(node_modules|bower_components)/,
          loaders: loaders
        }
      ]
    },
    plugins: [],
    resolve: {
      modulesDirectories: ['node_modules', 'app/scripts', 'dist/scripts'],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    externals: {
      'codemirror': 'CodeMirror',
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };
};

export default webpackConfig;
