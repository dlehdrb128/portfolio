const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
};
