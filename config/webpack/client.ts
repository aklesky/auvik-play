import { colors } from '@/theme/colors';
import BrotliCompression from 'brotli-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { bundle } from 'config/bundle';
import { isProduction } from 'config/env';
import { files } from 'config/files';
import { assets, client, entry, js, lib, publicPath, staticFiles, template } from 'config/paths';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Critters from 'critters-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import en from 'i18n/en.json';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import { common } from './common';
import { progressive } from './progressive';

const base: webpack.Configuration = {
  target: 'web',
  name: 'client',
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
                  publicPath: bundle.media.publicPath
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
                  publicPath: bundle.fonts.publicPath
                }
              }
            ]
          }
        ]
      }
    ]
  },
  node: {
    console: true,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: client,
    pathinfo: true,
    publicPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      title: en.name,
      description: en.description,
      template,
      filename: isProduction ? 'app.html' : 'index.html',
      hash: false,
      cache: isProduction,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': colors.background
      },
      favicon: false,
      minify: {
        collapseWhitespace: isProduction,
        removeRedundantAttributes: isProduction,
        useShortDoctype: isProduction,
        removeEmptyAttributes: isProduction,
        removeStyleLinkTypeAttributes: isProduction,
        keepClosingSlash: isProduction,
        minifyJS: isProduction,
        minifyCSS: isProduction,
        minifyURLs: isProduction
      }
    }),
    new Critters({
      preload: 'swap',
      preloadFonts: true,
      noscriptFallback: true
    }),
    new CleanWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new CopyWebpackPlugin([
      {
        from: staticFiles,
        to: assets,
        cache: isProduction
      },
      {
        from: lib,
        to: js
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};

const development: webpack.Configuration = {
  devtool: 'eval',
  output: {
    publicPath: '/',
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    filename: 'assets/js/[name].[hash].js',
    hotUpdateChunkFilename: 'assets/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'assets/[hash].hot-update.json'
  },
  entry: {
    app: ['webpack-hot-middleware/client?name=client&noInfo=false&timeout=2000', entry.server]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    })
  ]
};

const production: webpack.Configuration = {
  devtool: false,
  entry: {
    app: entry.client
  },
  output: {
    chunkFilename: 'assets/js/[name].[chunkhash].js',
    filename: 'assets/js/[name].[chunkhash].js'
  },
  plugins: [
    new CompressionPlugin({
      cache: true,
      minRatio: 0.99,
      threshold: 10240,
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/
    }),
    new BrotliCompression({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

export default merge(common, base, isProduction ? production : development, progressive);
