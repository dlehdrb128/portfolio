const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

console.log(path.join(__dirname, "dist"));

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        open: false,
        hot: true,
        compress: true,
        port: 3000,
        historyApiFallback: true,
        liveReload: true,
    },
    output: {
        filename: "[name].js",
    },
});
