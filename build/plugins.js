/**
 * @description 插件
 * @author mori
 * @date 2017-10-9
 */ 
const path = require('path');
const webpack = require('webpack');
const entry = require('./entry');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {}

const configPlugins = [
	
	// 每次生成dist前先清空dist目录下的的内容
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	}),

	// 设置热更新
	new webpack.HotModuleReplacementPlugin()

]

// 根据入口js数组生成页面
Object.keys(entry).forEach((item) => {

	config = {
		filename: '../dist/html/' + item + '.html',
		template: path.resolve(__dirname, '../src/index.html'),
		chunks: [item]
	}

	configPlugins.push(new HtmlWebpackPlugin(config));

})

module.exports = configPlugins;