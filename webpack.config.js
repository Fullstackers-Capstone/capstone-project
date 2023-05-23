const webpack = require('webpack');

module.exports = {
  mode: "development",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY),
        SECRET_KEY: JSON.stringify(process.env.SECRET_KEY)
      }
    })
  ]
};
