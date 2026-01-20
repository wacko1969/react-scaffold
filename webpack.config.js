import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import SpeedMeasurePlugin from 'speed-measure-webpack-v5-plugin';
import webpack from 'webpack';

const smp = new SpeedMeasurePlugin({ disable: false });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV !== 'production';

const config = {
  entry: './src/index.tsx',
  devtool: false,
  stats: {
    errorDetails: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2020',
          loader: 'tsx',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor/,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: Infinity,
    maxAssetSize: Infinity,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};

if (!isDev) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].chunk.css',
    })
  );
}

const smpconfig = smp.wrap(config);

export default smpconfig;
