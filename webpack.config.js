const path = require('path')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {VueLoaderPlugin} = require('vue-loader')

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'


const config = {
    target: 'web',
    entry: path.join(__dirname,"/src/index.js"),
    output: {
        filename : "bundle.js",
        path: path.join(__dirname,"dist")
    },
    module : {
        rules: [
            {
                test : /\.vue$/,
                loader : "vue-loader"   
            },
            {
                test : /\.jsx$/,
                loader : "babel-loader"   
            },
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            },
            {
                test : /\.(jpg|jpeg|png|gif|svg)$/,
                use :[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-pack.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }
            // {

            //     test: /\.styl(us)?$/,
            
            //     loader: 'style-loader!css-loader!stylus-loader'
            
            // }
        ]
    },
    plugins : [
         new webpack.DefinePlugin({
            'process-env':{
                NODE_ENV : isDev ? '"development"' : '"production"'
            }
         }),
         new VueLoaderPlugin(),
         new HTMLPlugin(),
        ]
}


if(isDev){
    webpack.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port : 8000,
        host : '0.0.0.0',
        overlay:{
            errors : true
        },
        // open : true, 
        // historyFallback: {

        // }

        hot: true
    }
    
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
 

module.exports = config