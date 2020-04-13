const path = require("path");

module.exports = {
  mode: "development",
  entry: `./src/index.js`,
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // {
      //   test: /\.js$/,
      //   use: ['source-map-loader'],
      //   enforce: 'pre',
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  // resolve: {
  //   alias: {
  //     Shared: path.resolve(__dirname, 'src/000-Shared/'),
  //     Components: path.resolve(__dirname, `src/${currentLesson}/components/`),
  //     Services: path.resolve(__dirname, `src/${currentLesson}/services/`),
  //     Store: path.resolve(__dirname, `src/${currentLesson}/store/`),
  //   },
  // },
};
