/**
 * @description 输出
 * @author mori
 * @date 2017-10-9
 */ 
const path = require('path');

module.exports = {

	path: path.resolve(__dirname, '../dist'),
	// publicPath: 'we.cli:8081',
	filename: 'js/[name].js?ver=[hash]'

}