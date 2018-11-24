const path = require("path");
const webpack = require("webpack");
require("@babel/polyfill");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack_rules = [
    {
        test: /.scss$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].css',
                    outputPath: 'css/'
                }
            },
            {
                loader: 'extract-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'sass-loader'
            }
        ]
    }
];
const webpackOption = {
    entry: {
        contentScript: ["./src/js/contentScript.js"],
        background: ["@babel/polyfill", "./src/js/background.js"],
        popup: ["@babel/polyfill", "./src/js/popup.js"],
        options: ["./src/js/options.js"],
        cssBundle: ["./src/scss/bundle.scss"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js'
    },
    module: {
        rules: webpack_rules
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/html/**/*', to: './', toType: 'dir', flatten: true  },
            { from: 'src/images/**/*', to: './images', toType: 'dir', flatten: true  },
            { from: 'src/manifest.json', to: './', toType: 'dir', flatten: true  }
          ], {})
    ]
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;