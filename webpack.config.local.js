const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const developmentConfig = require('./marketplaceConfig/development-config.json');

module.exports = (env) => {
  const isProd = env.production;
  let config = developmentConfig;

  return {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    mode: isProd ? 'production' : 'development',
    plugins: [
      new Dotenv(),
      new webpack.EnvironmentPlugin({
        MOCK_WIDGET_SDK: true,
        SLUG: config.slug,
        API_URL: config.apiUrl,
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
        inject: false,
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'public/edit.html'),
        filename: 'edit.html',
        inject: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: 'file-loader',
        },
      ],
    },
    devServer: {
      contentBase: './dist',
      hot: false,
      inline: false,
    },
    resolve: {
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
