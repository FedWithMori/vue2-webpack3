/**
 * @description 服务设置
 * @author mori
 * @date 2017-10-9
 */ 
var path = require('path');

module.exports = {
  contentBase: path.resolve(__dirname, '../dist'),
  host: 'we.cli',
  port: 8001, // 默认8001
  inline: true, // 可以监控js变化
  hot: true, // 热启动
  compress: true,
  watchContentBase: false
};