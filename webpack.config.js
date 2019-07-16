const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    performance: {
        hints: false
    },
    devtool: 'source-map',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'public/images/'
                    }
                }]
            },
            {
                test: /\.json$/,
                use: [{
                    loader: 'json-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'public/data/'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'graphiteToolFront': path.resolve(__dirname, './src/index.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
