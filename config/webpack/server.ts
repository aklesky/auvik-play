import CleanWebpackPlugin from 'clean-webpack-plugin';
import { bundle } from 'config/bundle';
import { isProduction } from 'config/env';
import { files } from 'config/files';
import { entry, node_modules, server } from 'config/paths';
import webpack from 'webpack';
import merge from 'webpack-merge';
import nodeModules from 'webpack-node-externals';
import { common } from './common';

const base: webpack.Configuration = {
  name: 'ssr',
  entry: {
    server:  ['@babel/polyfill', entry.server],
  },
  externals: nodeModules(),
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: files.images,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',

                  outputPath: bundle.media.destination,
                  publicPath: bundle.media.publicPath,
                  emitFiles: false
                }
              }
            ]
          },
          {
            test: files.fonts,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',

                  outputPath: bundle.fonts.destination,
                  publicPath: bundle.fonts.publicPath,
                  emitFiles: false
                }
              }
            ]
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: server
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    modules: [node_modules]
  },
  target: 'node',
};
const development: webpack.Configuration = {
  devtool: 'eval-source-map'
};
const production: webpack.Configuration = {
  devtool: false
};

export default merge(common, base, isProduction ? production : development);
