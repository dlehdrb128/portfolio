const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },

            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Development",
        }),
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
