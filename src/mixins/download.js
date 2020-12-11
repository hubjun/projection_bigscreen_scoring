
import HTTP from '../config/http';
import apis from '../config/apis';

const mimeMap = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
  xml: 'application/xml',
}
export default {
  methods: {
    /**
     * 解析blob响应内容并下载
     * @param {*} res blob响应内容
     * @param {String} mimeType MIME类型
     */
    resolveBlob(res, mimeType) {
      const aLink = document.createElement('a')
      const blob = new Blob([res.data], { type: mimeType })
      // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
      const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
      console.log(res)
      const contentDisposition = decodeURI(res.headers['content-disposition'])
      const result = patt.exec(contentDisposition)
      const fileName = result[1]
      aLink.href = URL.createObjectURL(blob)
      aLink.setAttribute('download', fileName) // 设置下载文件名称
      document.body.appendChild(aLink)
      aLink.click()
      document.body.appendChild(aLink)
    },
    /**
     * 下载.xlsx文件
     * @param {String} filename 文件名
     */
    downloadXlsx(filename) {
      HTTP.GET(apis.downloadUrl, {
        params: { fileName: filename, delete: true },
        responseType: 'blob',
      }).then((res) => {
        this.resolveBlob(res, mimeMap.xlsx)
      }, (e) => {
        console.log(e)
      })
    },
    exportExcel(url, other) {
      const haveData = other === undefined ? this.form : other
      HTTP.post(url, haveData).then((res) => {
        if (res.data.code === 0) {
          this.downloadXlsx(res.data.msg)
        }
      })
    },
    exportActivityExcel(url, other) {
      const haveData = other === undefined ? this.form : other
      this.$http.get(url, haveData).then((res) => {
        if (res.data.code === 0) {
          this.downloadXlsx(res.data.msg)
        }
      })
    },
    /**
     * 下载.xlsx文件
     * @param {String} filename 文件名
     */
    downloadXlsxOperation(filename) {
      this.$http.get(apis.downloadUrlOperation, {
        params: { fileName: filename, delete: true },
        responseType: 'blob',
      }).then((res) => {
        this.resolveBlob(res, mimeMap.xlsx)
      }, (e) => {
        console.log(e)
      })
    },
    /**
     * 下载xml文件
     * @param {*传进来对应id} deploymentId
     */
    downloadXml(record) {
      this.$http.get(`${apis.process}/show?ext=.bpmn&did=${record.deploymentId}`).then((res) => {
        const aLink = document.createElement('a')
        const blob = new Blob([res.data], { type: 'application/xml' })
        const fileName = record.resourceName
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', fileName) // 设置下载文件名称
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink)
        window.URL.revokeObjectURL(aLink.href)
      }, (e) => {
        console.log(e)
      })
    },
    exportExcelOperation(url, other) {
      const haveData = other === undefined ? this.form : other
      this.$http.post(url, haveData).then((res) => {
        if (res.data.code === 0) {
          this.downloadXlsxOperation(res.data.msg)
        }
      })
    },
    /**
     * 代码生成并下载为zip
     * @param {String} url 链接
     * @param {String} tables 表名
     */
    genCodeZip(url, tables) {
      this.$http.post(url, {}, {
        params: { tables },
        responseType: 'blob',
      }).then((res) => {
        this.resolveBlob(res.data, mimeMap.zip)
      })
    },
  },
}
