const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const developmentConfig = require('./marketplaceConfig/development-config.json');
const stagingConfig = require('./marketplaceConfig/staging-config.json');
const productionConfig = require('./marketplaceConfig/production-config.json');
const preproductionConfig = require('./marketplaceConfig/preproduction-config.json');

module.exports = (env) => {
  const { WEBPACK_SERVE, development } = env;
  // config used for building
  const isProd = env.production;
  let config = developmentConfig;
  if (env.deployment === 'staging') {
    config = stagingConfig;
  } else if (env.deployment === 'production') {
    config = productionConfig;
  } else if (env.deployment === 'preproduction') {
    config = preproductionConfig;
  }

  //return config for servind during development
  if (WEBPACK_SERVE && development) {
    console.log(
      '🚀 ~ file: webpack.config.js:15 ~ WEBPACK_SERVE && development - local-dev : ',
      WEBPACK_SERVE && development
    );
    return {
      plugins: [
        new Dotenv(),
        new webpack.EnvironmentPlugin({ SLUG: config.slug, API_URL: config.apiUrl }),
      ],
      entry: path.join(__dirname, 'src', 'index.tsx'),
      devtool: 'inline-source-map',
      mode: isProd ? 'production' : 'development',
      stats: { errorDetails: true },
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
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      devServer: {
        contentBase: './dist',
        hot: false,
        inline: true,
        liveReload: true,
      },
      resolve: {
        modules: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
      },
      externals: [
        (_context, request, callback) => {
          if (/^@happeouikit/.test(request)) {
            // Resolve @happeoukit as externals in window
            return callback(null, [
              'Happeouikit',
              request.replace('@happeouikit/', ''),
            ]);
          }
          callback();
        },
        {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          jQuery: 'jQuery',
        },
      ],
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    };
  }

  return {
    plugins: [
      new Dotenv(),
      new webpack.EnvironmentPlugin({ SLUG: config.slug, API_URL: config.apiUrl }),
    ],
    entry: path.join(__dirname, 'src', 'index.tsx'),
    devtool: env.deployment === 'development' ? 'inline-source-map' : 'eval',
    mode: env.deployment === 'production' ? 'production' : 'development',
    stats: { errorDetails: true },
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
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      contentBase: './dist',
      hot: false,
      inline: true,
      liveReload: true,
    },
    resolve: {
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    externals: [
      (_context, request, callback) => {
        if (/^@happeouikit/.test(request)) {
          // Resolve @happeoukit as externals in window
          return callback(null, [
            'Happeouikit',
            request.replace('@happeouikit/', ''),
          ]);
        }
        callback();
      },
      {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled',
        jQuery: 'jQuery',
      },
    ],
    output: {
      filename: `${env.deployment}-bundle.js`,
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      mergeDuplicateChunks: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: false,
            keep_fnames: false,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
      ],
    },
  };
};
