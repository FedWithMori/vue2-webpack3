const ExtractTextPlugin = require('extract-text-webpack-plugin');
let baseEntry = require('./build/entry');
let baseOutput = require('./build/output');
let basePlugins = require('./build/plugins');
let baseServer = require('./build/devtool.js');

const extractLess = new ExtractTextPlugin('css/reset.css');
const extractVue = new ExtractTextPlugin('css/style.css');

// 整合所有的plugin
(() => {

	const pluginArr = [extractLess, extractVue];

	// Object.keys(baseEntry).forEach((dir) => {
	// 	pluginArr.push(new ExtractTextPlugin('css/' + dir + '.css'))
	// })

	pluginArr.forEach((item) => {
		basePlugins.push(item)
	})

})()

module.exports = {

	entry: baseEntry,
	output: baseOutput,
	module: {
		rules: [

			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: extractLess.extract(['css-loader', 'less-loader'])
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						less: ExtractTextPlugin.extract({
							use: ['css-loader', 'less-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				use: 'url-loader',
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
	devServer: baseServer
}