// Webpack (client)

// ----------------------------------------------------------------------------
// IMPORTS

/* Node */
import path from "path";

/* NPM */
import BrotliCompression from "brotli-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import { mergeWith } from "lodash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

/* Local */
import common, { defaultMerger, files } from "./common";
import css, { rules } from "./css";

// ----------------------------------------------------------------------------

const isProduction = process.env.NODE_ENV === "production";

// Base client config
const base = {

  // Entry
  entry: [path.resolve(__dirname, "..", "entry", "client.js")],

  // Name
  name: "client",

  // Use `MiniCssExtractPlugin` in both dev and production, because
  // the server will need access to it in its initial render
  module: {
    rules: [
      ...css(),
      // Images
      {
        test: files.images,
        use: [
          {
            loader: "file-loader",
            query: {
              name: `assets/img/[name]${isProduction ? ".[hash]" : ""}.[ext]`,
            },
          },
        ],
      },

      // Fonts
      {
        test: files.fonts,
        use: [
          {
            loader: "file-loader",
            query: {
              name: `assets/fonts/[name]${isProduction ? ".[hash]" : ""}.[ext]`,
            },
          },
        ],
      },

      // Json
      {
        test: files.json,
        use: [
          {
            loader: "file-loader",
            query: {
              name: `assets/[name]${isProduction ? ".[hash]" : ""}.[ext]`,
            },
          },
        ],
      },

      // Json
      {
        test: files.json,
        type: 'javascript/auto',
        exclude: /node_modules/,
        use: [
          {
            loader: "json-loader",
          },
        ],
      },

      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },

  // Set-up some common mocks/polyfills for features available in node, so
  // the browser doesn't balk when it sees this stuff
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty",
  },

  // Output
  output: {
    path: path.resolve(__dirname, "..", "..", "dist", "public"),
    // publicPath: "/",
  },

  // The client bundle will be responsible for building the resulting
  // CSS file; ensure compilation is dumped into a single chunk
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          chunks: "all",
          enforce: true,
          name: "main",
          test: new RegExp(
            `\\.${rules.map(rule => `(${rule.ext})`).join("|")}$`,
          ),
        },
      },
    },
  },

  // Add `MiniCssExtractPlugin`
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: "assets/css/[id].css",
      filename: `assets/css/[name]${isProduction ? ".[contenthash]" : ""}.css`,
    }),

    new webpack.DefinePlugin({
      GRAPHQL: JSON.stringify(process.env.GRAPHQL),
      SERVER: false,
    }),
  ],
};

// Development client config
const dev = {
  devtool: "inline-source-map",

  // Output
  output: {
    chunkFilename: "[name].js",
    filename: "[name].js",
  },
};

// Production client config
const prod = {
  // Output
  output: {
    chunkFilename: "assets/js/[name].[chunkhash].js",
    filename: "assets/js/[name].[chunkhash].js",
  },

  plugins: [
    new CompressionPlugin({
      cache: true,
      minRatio: 0.99,
    }),
    new BrotliCompression({
      minRatio: 0.99,
    }),
  ],
};

export default mergeWith({},
  common(false),
  base,
  process.env.NODE_ENV === "production" ? prod : dev,
  defaultMerger,
);
