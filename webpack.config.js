const path = require('path')

module.exports = {
    entry: './client/index.js',
    output: {
      path: path.join(__dirname + '/public'),
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use:{
              loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: 'source-map'
  }