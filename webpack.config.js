module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'

            }
        ],
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    preset: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    devtool: 'eval-source-map',

    devServer: {
        historyApiFallbback: true,
        hot: true,
        inline: true,
        stats: 'normal',

        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,

        proxy: {
            '/api/*': {
                target: 'http://localhost:9000/',
                secure: false
            }
        }
    },
    watch: true
};


