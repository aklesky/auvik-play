import { isProduction } from 'config/env';
import { files } from 'config/files';
import { modulePackage, node_modules, publicPath, root, tsConfig } from 'config/paths';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

export const common: webpack.Configuration = {
  context: root,
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /node_modules/,
            test: files.ts,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  cacheDirectory: true,
                  plugins: ['@babel/plugin-syntax-dynamic-import'],
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        modules: false,
                        useBuiltIns: false,
                      }
                    ],
                    '@babel/preset-react',
                    '@babel/preset-typescript'
                  ]
                }
              }
            ]
          },
          {
            test: files.ts,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [
              {
                loader: 'webpack-strip-block'
              }
            ]
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
        ]
      }
    ]
  },
  optimization: {
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    usedExports: true,
    concatenateModules: true,
    occurrenceOrder: true,
    splitChunks: {
      maxInitialRequests: 20,
      maxAsyncRequests: 20,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          safari10: true,
          mangle: true,
          toplevel: true,
          ecma: 6,
          compress: {
            unused: false,
            drop_console: !isProduction,
            drop_debugger: !isProduction
          },
          output: {
            comments: false
          }
        },
        test: /\.js(\?.*)?$/i,
        exclude: [/\.min\.js$/gi]
      })
    ]
  },
  output: {
    publicPath
  },
  resolve: {
    extensions: files.extensions,
    modules: [node_modules],
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfig })]
  },
  plugins: [
    new WebpackBar({
      name: require(modulePackage).name
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
