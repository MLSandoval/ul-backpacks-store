const path = require('path');
console.log('path: ',path);

const srcPath = path.resolve(__dirname, 'client');
console.log("srcPath: ", srcPath);
const publicPath = path.resolve(__dirname, 'server/public');
console.log("publicPath: ", publicPath);
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
      }
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
      "/api": "http://localhost:3000"
    }
  }
};