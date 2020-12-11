import md5 from 'js-md5'
import CryptoJS from 'crypto-js'
import uploadHttp from '@/uploadHttp'
import apis from '@/config/apis'
import PageClass from '@/config/pageClass'

export default {
  data() {
    return {
      selectedArr: [], // 表格选中的下标
      key: 'aa87d606-ba41-4d2e-85e6-fcd94e0e5ba3',
      userStatusAesKey: 'One@-!Sports456G',
      userStatusAesIv: 'One@-!SportsG654',
    }
  },
  computed: {
    apis() {
      return apis
    },
    tableHeight() {
      return document.documentElement.clientHeight - 356
    },
  },
  methods: {
    // ...mapMutations(['setButtonAuth', 'setDropDownbox', 'setName', 'setUserId', 'setUserType', 'setSystemId', 'setUserName', 'setAuthority', 'setEventId']),
    /**
     * @function aes加密方法 CBC
     * @param {String} word 待加密文本
     * @param {String} keyStr aes key
     * @param {String} ivStr aes 偏移量iv
     */
    encrypt(word, keyStr, ivStr) {
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const iv = CryptoJS.enc.Utf8.parse(ivStr)
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
      return encrypted.toString()
    },
    /**
     * @function aes解密方法 CBC
     * @param {String} word 待加密文本
     * @param {String} keyStr aes key
     * @param {String} ivStr aes 偏移量iv
     */
    decrypt(word, keyStr, ivStr) { // 解密
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const iv = CryptoJS.enc.Utf8.parse(ivStr)
      const decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypt).toString()
      return decryptedStr
    },
    /**
     * @function 点击搜索按钮触发的事件，对分页进行初始化，然后获取数据
     */
    searchEvent() {
      this.form = { ...this.form, ...new PageClass() }
      console.log('点击了搜索按钮')
      // 这里执行搜索操作
      this.searchData()
    },
    searchEvents() {
      this.form = { ...this.form, ...new PageClass() }
      console.log('点击了搜索按钮')
      // 这里执行搜索操作
      this.searchData()
    },
    /**
     * @function 分页尺寸修改方法
     * @param {Number} pageSize 修改后的分页大小
     */
    handleSizeChange(pageSize) {
      this.form.pageSize = pageSize
      // 业务问题，每次修改分页大小后要不要重新返回第一页
      this.form.pageNum = 1
      this.searchData()
    },
    /**
     * @function 当前页修改方法
     * @param {Number} pageNum 修改后的当前页
     */
    handleCurrentChange(pageNum) {
      this.form.pageNum = pageNum
      this.searchData()
    },
    handleSelectionChange(arr) {
      console.log(arr)
      this.selectedArr = arr
    },
    /**
     * @function 转换时间格式
     * @param {String} dateFormat 标准时间
     */
    updateTimeFormat(dateFormat) {
      const date = new Date(dateFormat)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const str = `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
      return str.toString() === 'NaN-NaN-NaN' ? '' : str
    },
  /**
     * @function 计算两个时间的差别天数
     * @param {String}} startDate 开始时间
     * @param {String} endDate 结束时间
     */
    getTimeDuration(startDate, endDate) {
      const day = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 3600 * 1000)
      return parseInt(day, 10) + 1
    },
    /**
     * @function 计算两个时间的差别天数包括时分秒
     * @param {String}} startDate 开始时间
     * @param {String} endDate 结束时间
     */
    getTimeDurationDetail(startDate, endDate) {
      const date3 = new Date(endDate).getTime() - new Date(startDate).getTime() // 时间差的毫秒数
      // 计算出相差天数
      const days = Math.floor(date3 / (24 * 3600 * 1000))
      // 计算出小时数

      const leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      const hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      /* let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000) */
      return `${days}天${hours}时${minutes}分`
    },
    /**
     * @function 判断浏览器版本
     */
    IEVersion() {
      const { userAgent } = navigator // 取得浏览器的userAgent字符串
      const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
      const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
      const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
      if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        const fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion === 7) {
          return 7
        } if (fIEVersion === 8) {
          return 8
        } if (fIEVersion === 9) {
          return 9
        } if (fIEVersion === 10) {
          return 10
        }
          return 6 // IE版本<=7
      } if (isEdge) {
        return 'edge' // edge
      } if (isIE11) {
        return 11 // IE11
      }
        return -1 // 不是ie浏览器
    },
    /* ajax导出 */
    exportFunc(url, other) {
      const data = other === undefined ? this.form : other
      this.$http.post(url, data, { responseType: 'blob' }).then((res) => {
        // 处理返回的文件流
        if (res.headers['content-type'] === 'application/octet-stream' && res.config.responseType === 'blob') {
          const content = res.data
          const blob = new Blob([content])
          let fileName = `${new Date().getTime()}.xlsx`
          try {
            fileName = decodeURIComponent(res.headers['content-filedownloadname'])
          } catch (e) {
            //
          }
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        } else {
          let content = res.data
          const blob = new Blob([content])
          const reader = new FileReader()
          reader.onload = () => {
            content = JSON.parse(reader.result) // 内容就在这里
            if (content.msg) {
              this.$message.error(content.msg)
            }
            if (content.code === 302) {
              sessionStorage.clear()
              this.setName('')
              this.setUserName('')
              this.setUserId('')
              this.setAuthority([])
              this.$router.push('/login')
            }
          }
          reader.readAsText(blob)
        }
      })
    },
    /* form导出 */
    /**
     * @param {*} url 下载地址
     * 创建一个 form
     * 添加到 body 中
     * 创建一个输入
     * 设置相应参数
     * 将该输入框插入到 form 中
     * form 的提交方式
     * form 提交路径
     * 对该 form 执行提交
     * 删除该 form
     */
    exportFuncForm(url) {
      const form = document.createElement('form')
      form.id = 'export'
      form.name = 'export'
      document.body.appendChild(form)
      Object.keys(this.form).forEach((key) => {
        const input = document.createElement('input')
        input.type = 'text'
        input.name = key
        input.value = this.form[key]
        form.appendChild(input)
      })
      form.method = 'GET'
      form.action = url
      form.submit()
      document.body.removeChild(form)
    },
    /**
     * @function 请求下载
     * @param {String} url 接口地址
     * @param {Object} data 传输的数据
     */
    downFuncForm(url, data) {
      const form = document.createElement('form')
      form.id = 'export'
      form.name = 'export'
      document.body.appendChild(form)
      Object.keys(data).forEach((key) => {
        const input = document.createElement('input')
        input.type = 'text'
        input.name = key
        input.value = data[key]
        form.appendChild(input)
      })
      form.method = 'POST'
      form.action = url
      form.submit()
      document.body.removeChild(form)
    },
    /* 导入上传 */
    uploadHttpDefault(e, hasDirectory = false) {
      uploadHttp(e, hasDirectory)
    },
    /**
     * @function 返回图片加密后的地址
     */
    returnPicUrl(url) {
      if (url) {
        const arr = url.split('/')
        const path = arr[arr.length - 1]
        // x.jpg&TOKEN&
        let str = md5(`${path}&${this.TOKEN}&${this.key}`)
        str = `${url}?sign=${str}.${this.TOKEN}`
        return str
      }
        return url
    },
    /**
     * @function 对表格实现斑马纹路
     */
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      }
      return ''
    },

    /* 删除数组中制定函数 */
    delete(arr, item1) {
      // eslint-disable-next-line no-shadow
      const index = arr.findIndex(item => item.value === item1)
      arr.splice(index, 1)
    },

    // 用来get请求表头排序
    // sort_change({ prop, order }) {
    //   const changeText = {
    //     ascending: "asc",
    //     descending: "desc",
    //   }
    //   this.form.sortField = order ? prop : null;
    //   this.form.sortOrder = changeText[order]
    //   this.searchData()
    // },
    // post 请求
    // sort_post_change({ prop, order }) {
    //   const changeText = {
    //     ascending: "asc",
    //     descending: "desc",
    //   }
    //   this.form.orderByColumn = order ? prop : null;
    //   this.form.isAsc = changeText[order]
    //   this.searchData()
    // },
  },

  activated() {
    // this.searchEvent()
  },
}
