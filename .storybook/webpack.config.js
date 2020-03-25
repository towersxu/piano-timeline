let path = require('path')

module.exports = {
  mode: 'production',
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
  ]
}