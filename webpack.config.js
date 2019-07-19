const path = require('path');

module.exports = {
  entry: './d3.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  

};