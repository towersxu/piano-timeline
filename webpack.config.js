let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    'PianoTimeline': [path.resolve(__dirname, "./src/index.tsx")],
    // 'pinao-roll': [path.resolve(__dirname, "./src/components/PianoRoll/PianoRoll")]
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  externals: {
    react: 'react'
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 9002,
    host: '127.0.0.1'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  "useBuiltIns": "usage",
                  "corejs": '3.3'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css/,
        oneOf: [{
          resourceQuery: /^\?raw$/,
          use: [
            require.resolve('to-string-loader'),
            require.resolve('css-loader'),
            require.resolve('postcss-loader')
          ]
        }, {
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  context: path.resolve(__dirname, 'src'),
                  hashPrefix: 'my-custom-hash',
                }
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        }]
      },
      {
        test: /\.(png|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, "./dev.html")
    })
  ]
}