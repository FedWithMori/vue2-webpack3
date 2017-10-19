const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let baseEntry = require('./build/entry');
let baseOutput = require('./build/output');
let basePlugins = require('./build/plugins.prod');
let baseServer = require('./build/devtool.js');

// 整合所有的plugin
(() => {

	// 根据入口chunk生成对应的css文件
	basePlugins.push(new ExtractTextPlugin({
		filename: 'css/[name].css'
	}))

})()

module.exports = {

	entry: baseEntry,
	output: baseOutput,
	module: {
		rules: [

			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract(['css-loader?minimize', 'less-loader'])
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						less: ExtractTextPlugin.extract({
							use: ['css-loader?minimize', 'less-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		              use: 'css-loader?minimize',
		              fallback: 'vue-style-loader'
		        })
		    },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loaders: 'url-loader',
				options: {
					limit: 8192
				}
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)$/,
				use: 'file-loader'
			}

		]
	},
	plugins: basePlugins,
	resolve: {
		extensions: ['.js', '.vue', '.less'],
		alias: {
			less$: path.resolve(__dirname, 'src/assets/less'),
			components$: path.resolve(__dirname, 'src/components')
		}
	},
	devServer: baseServer

}