const path = require('path');
const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public/');

// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // plugins: [
  //   new CopyPlugin([
  //     { from: "./client/images", to: "./client/components/" },
  //     // { from: "./client/images", to: "./client/components/productDetails.jsx" },
  //     // { from: "./client/images", to: "./client/components/cart.jsx" },
  //     // { from: "./client/images", to: "./client/components/checkout.jsx" },
  //   ])
  // ],
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
        test: /\.(png|svg|jpg|gif|webp|jpeg|ico)$/,
        use: ["url-loader"]
      },
      // {
      //   test: /\.(png|svg|jpg|gif|webp|jpeg)$/,
      //   use: ["file-loader"]
      // }
    ],
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