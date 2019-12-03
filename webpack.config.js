const path = require('path');
const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public/');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: "./client",
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp|jpeg)$/,
        use: ["url-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp|jpeg)$/,
        use: ["file-loader"]
      }
    ],

    // new CopyPlugin([
    //   'relative/path/to/file.ext',
    //   '/absolute/path/to/file.ext',
    //   'relative/path/to/dir',
    //   '/absolute/path/to/dir',
    //   '**/*',
    //   { glob: '**/*', dot: false },

    plugins: [
      new CopyPlugin([
        { from: "./server/images", to: "./client/components/productList.jsx" },
        { from: "./server/images", to: "./client/components/productDetails.jsx" },
        { from: "./server/images", to: "./client/components/cart.jsx" },
        { from: "./server/images", to: "./client/components/checkout.jsx" },
      ])
    ]
  },
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    contentBase: publicPath,
    watchContentBase: true,
    stats: "minimal",
    proxy: {
      "/api": "http://localhost:3001"
    },
    historyApiFallback: true
  }
};