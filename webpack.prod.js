const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  // Packages that will be loaded with a cdn on index.html
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
    recoil: 'Recoil'
  },
  plugins: [
    // Define environment variables
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://fordevs.herokuapp.com/api')
    }),
    new HtmlWebpackPlugin({ template: './template.prod.html' }),
    // Prevent FOUC in styles of webpage
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css'
    }),
    new FaviconsWebpackPlugin({ logo: './public/favicon.png' })
  ]
})
