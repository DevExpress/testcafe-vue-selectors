const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        vueLoader: path.resolve(__dirname, './test/data/vue-loader/main.js'),
        vueRouter: path.resolve(__dirname, './test/data/vue-router/main.js'),
    },

    output: {
        path:     path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
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

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    devServer: {
        noInfo: true,
        port:   8080
    }
};
