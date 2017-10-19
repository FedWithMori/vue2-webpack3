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

let configPlugins = [

	// 提取公共文件
	new webpack.optimize.CommonsChunkPlugin({
		name: 'reset',
		filename: 'vendor/common.js',
		minChunks: 3
	}),
	
	// 每次生成dist前先清空dist目录下的的内容
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	}),

	// 设置热更新
	new webpack.HotModuleReplacementPlugin(),

	// 对js代码进行压缩
	new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })

]

// 根据入口js数组生成页面
Object.keys(entry).forEach((item) => {

	config = {
		filename: '../dist/html/' + item + '.html',
		template: path.resolve(__dirname, '../src/index.html'),
		chunks: [item],
		minify: { 
			// 移除HTML中的注释
            removeComments: true, 
            // 删除空白符与换行符
            collapseWhitespace: true 
        }
	}

	configPlugins.push(new HtmlWebpackPlugin(config));

})

module.exports = configPlugins;