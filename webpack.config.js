const path = require('path')
const srcPath = path.resolve(__dirname, 'client')
const publicPath = path.resolve(__dirname, 'server/public/')

const autoprefixer = require('autoprefixer')

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: "./client",
  output: {
    path: publicPath,
    filename: 'main.js',
    publicPath: '/'
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
        use: [
          // "css-loader",
          "style-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          }
        ]
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
    port: 3002,
    contentBase: publicPath,
    watchContentBase: true,
    stats: "minimal",
    proxy: {
      "/api": "http://localhost:3003"
    },
    historyApiFallback: true
  }
}