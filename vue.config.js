/*
 * @Author: your name
 * @Date: 2020-11-06 16:49:33
 * @LastEditTime: 2020-11-10 15:32:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigscreen_pc\vue.config.js
 */
module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config
        .plugin('html')
        .tap((args) => {
            args[0].title = '2020年湖北省青少年滑板锦标赛成绩';
            return args;
        });
  }
}