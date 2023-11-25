const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// console.log(path.resolve(__dirname, 'build'));

module.exports = {
  mode: process.env.NODE_ENV, //access NODE_ENV variable
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/build/' : '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },

      {
        test: /\.css$/,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],

  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, 'build'),
    },
    historyApiFallback: true,
    port: 8080,
    compress: true,

    proxy: {
      '/api/user': 'http://localhost:3000',
      '/api/tickets': 'http://localhost:3000',
    },
  },
};
