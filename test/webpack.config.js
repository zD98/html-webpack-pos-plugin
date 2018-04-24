const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPosPlugin = require('./lib/index')

module.exports = {
  mode: 'development', // "production" | "development" | "none"

  entry: { a: './a', c: './c' }, // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    path: path.resolve(__dirname, 'dist'), // string
    filename: '[name].js', // string
    chunkFilename: '[name.js]',
    publicPath: '/assets/' // string
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: ['node_modules'],
    // directories where to look for modules

    extensions: ['.js', '.json', '.jsx', '.css'],
    // extensions that are used

    alias: {
      // a list of module name aliases
    }
  },

  context: __dirname, // string (absolute path!)
  target: 'web', // enum
  stats: 'errors-only',
  devServer: {
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true // only errors & warns on hot reload
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunkSortMode: 'dependency',
      chunks: ['c', 'a'],
      head: ['c.js'],
      body: ['a.js'],
      inline: 'all'
    }),
    new HtmlWebpackPosPlugin()
  ]
}
