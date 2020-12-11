/*
 * @Author: your name
 * @Date: 2020-11-04 22:50:04
 * @LastEditTime: 2020-11-04 22:53:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bigscreen_pc\src\config\pageClass.js
 */
/**
 * 可提供全局查询通用参数
 * vue data实例new扩展
 */
class pageInput {
  constructor() {
    this.pageNum = 1
    this.pageSize = 10
    this.total = 0
  }
}
export default pageInput
