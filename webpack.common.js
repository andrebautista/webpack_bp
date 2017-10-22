const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  fallback: "style-loader"
});

module.exports = {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    require("autoprefixer")(),
                    require('stylelint')()
                  ];
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      "node_modules",
      "js"
    ],
  },
  plugins: [
    extractSass
  ]
};