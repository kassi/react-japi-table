const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'JapiTable'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ]
};

module.exports = config;
