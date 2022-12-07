const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

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
                test: /.css?$/,
                exclude: [],
                //로더는 오른쪽부터 읽어들이므로 postcss-loader를 맨 오른쪽에 넣어준다.
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        clean: true,
    },
};
