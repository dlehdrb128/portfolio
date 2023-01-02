const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./",
        clean: true,
    },
});

// module.exports = merge(common, {
//     mode: "production", //배포 모드
//     devtool: "cheap-module-source-map",
//     // 소스 맵(source map) 이라고함. 소스 맵은 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능.
//     // 배포용은 수정하면서 작업하는게 아니기 때문에 빌드 시간, 로그, 디버깅보다 용량이 제일 중요
//     // 때문에 용량이 가장 작은 cheap-module-source-map 옵션을 사용하고 webpack 명령어를 사용하는게 가장 좋음
//     output: {
//         filename: "[name].[contenthash].js", //번들파일 이름
//         path: path.resolve(__dirname, "../../dist"), //빌드되는 파일이 만들어지는 위치, __dirname: 현재 디렉토리
//         publicPath: "./",
//         clean: true,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(sa|sc|c)ss$/i, //loader를 적용시킬 파일 정규식 명시
//                 use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
//             },
//         ],
//     },
//     plugins: [new MiniCssExtractPlugin()],
//     optimization: {
//         usedExports: true,
//         minimize: true,
//         minimizer: [
//             new TerserPlugin({
//                 terserOptions: {
//                     compress: {
//                         drop_console: true,
//                     },
//                 },
//             }),
//             new CssMinimizerPlugin(),
//         ],
//         splitChunks: {
//             chunks: "all",
//         },
//         // 이렇게 설정해 두면 엔트리 포인트가 상당히 줄어듬
//     },
//     performance: {
//         // performance는 webpack이 정해진 파일 제한을 초과하는 에셋과 엔트리 포인트에 대해 알릴 방법을 제어할 수 있음. 에셋이 250kb 초과할 때 기준
//         hints: false,
//         // 힌트를 켜거나 끔. 힌트가 발견되는 wepback에 오류나 경고를 표시하도록함. 250kb를 초과하는 에셋이 생성된 경우
//         maxEntrypointSize: 512000,
//         // 엔트리 포인트는 특정 항목의 초기 로드 시간 동안 사용될 모든 에셋을 나타냄. webpack이 최대 엔트리 포인트 크기(단위:bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어함.
//         maxAssetSize: 512000,
//         // 에셋은 webpack에서 내보낸 파일. 이 옵션은 webpack이 개별 에셋 크기(단위 :bytes)를 기준으로 성능 힌트를 내보낼 시기를 제어함.
//     },
// });
