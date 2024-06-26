const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const buildPath = path.resolve(__dirname, 'dist')
const srcPath = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
          },
        },
      },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.join(srcPath, 'main.tsx'),
  target: !isProd ? 'web' : 'browsersList',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html')
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: '[name]-[hash].css'
      }
    ),
    isProd && new TsCheckerPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      include: /dir/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    })
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles()
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.ts'],
    alias: {
      components: path.join(srcPath, 'components')
    }
  },
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 790 * 1024, 
    maxEntrypointSize: 790 * 1024 
  },
}