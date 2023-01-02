const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.css?$/,
                exclude: [],
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),

        new Dotenv(),
        // new webpack.ProvidePlugin({
        //     React: "react",
        // }),
    ],

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
};
