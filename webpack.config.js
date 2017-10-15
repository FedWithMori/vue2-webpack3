const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/*
 * @description 循环获取入口文件路径数组
 */
let entryList = {};
(function getEntry() {

	const dir = path.resolve(__dirname, './src/entry');
	console.log(dir);
	const entryArr = fs.readdirSync(dir);

	entryArr.forEach(function(filename) {

		if(fs.statSync(dir + '/' + filename).isDirectory()) {

			getEntry(dir + '/' + filename);

		} else {

			entryList.index = dir + '/' + filename;

		}

	})

})()

const clean = new CleanWebpackPlugin(['dist']);
const extractVue = new ExtractTextPlugin('css/style.css');
const extractLess = new ExtractTextPlugin('css/reset.css');
const htmlPlguin = new HtmlWebpackPlugin({
	filename: path.resolve(__dirname, './dist/html/[name].html'),
	template: path.resolve(__dirname, './src/index.html')
})




module.exports = {

	entry: entryList,

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js?ver=[hash]'
	},

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
						less: extractVue.extract({
							use: ['css-loader', 'less-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)$/,
				loader: 'file-loader'
			}

		]

	},

	plugins: [

		clean,
		extractLess,
		extractVue,
		htmlPlguin

	],

	devServer: {

	  contentBase: path.resolve(__dirname, './dist'),
	  host: 'we.cli',
	  port: 8001, 
	  inline: true, 
	  hot: true, 
	  compress: true,
	  watchContentBase: false

	}



}