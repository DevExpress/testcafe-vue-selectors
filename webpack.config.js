var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './test/data/vue-loader/main.js'),

    output: {
        path:     path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },

    module: {
        rules: [
            {
                test:   /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:    /\.js$/,
                loader:  'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    devServer: {
        noInfo: true,
        port:   8080
    }
};
