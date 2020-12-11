<template>
  <div class="bigScreen">
    <h2>2020年湖北省青少年滑板锦标赛成绩</h2>
    <div>
      <el-row>
        <el-col>
          <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item prop="groupId" label="参赛分组">
                  <el-select v-model="form.groupId" @change="teamChange($event)" placeholder="请选择一个参赛分组" style="width:100%">
                    <el-option v-for="item in gameCategory" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item prop="type" label="预赛排名">
                  <el-switch
                    v-model="form.type"
                    active-color="#13ce66"
                    inactive-color="#909399"
                    active-value="1"
                    inactive-value="0" 
                    @change="changeSwitch($event)">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="table-container">
      <el-table
				:data="tableData"
        height="672px"
				style="width: 100%"
        border stripe
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
				<el-table-column
          prop="raceNumber"
          min-width="120"
          align="center"
					label="参赛号">
				</el-table-column>
        <el-table-column
          prop="name"
          min-width="120"
          align="center"
					label="姓名">
				</el-table-column>
				<el-table-column
					prop="participant"
          align="center"
          min-width="150"
					label="参赛单位">
				</el-table-column>
				<el-table-column
					prop="refereeScoreOne"
          align="center"
          min-width="90"
					label="裁判打分1">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.refereeScoreOne" @focus="focus($event)" style="width: 80px;" controls-position="right" size="mini" :min="0" :max="100" :step="0.5"></el-input-number>
          </template>
				</el-table-column>
        <el-table-column
					prop="refereeScoreTwo"
          align="center"
          min-width="90"
					label="裁判打分2">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.refereeScoreTwo" @focus="focus($event)" style="width: 80px;" controls-position="right" size="mini" :min="0" :max="100" :step="0.5"></el-input-number>
          </template>
				</el-table-column>
        <el-table-column
					prop="accommodateQty"
          align="center"
          min-width="90"
					label="裁判打分3">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.refereeScoreThree" @focus="focus($event)" style="width: 80px;" controls-position="right" size="mini" :min="0" :max="100" :step="0.5"></el-input-number>
          </template>
				</el-table-column>
        <el-table-column
					prop="refereeScoreFour"
          align="center"
          min-width="90"
					label="裁判打分4">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.refereeScoreFour" @focus="focus($event)" style="width: 80px;" controls-position="right" size="mini" :min="0" :max="100" :step="0.5"></el-input-number>
          </template>
				</el-table-column>
        <el-table-column
					prop="refereeScoreFive"
          align="center"
          min-width="90"
					label="裁判打分5">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.refereeScoreFive" @focus="focus($event)" style="width: 80px;" controls-position="right" size="mini" :min="0" :max="100" :step="0.5"></el-input-number>
          </template>
				</el-table-column>
        <el-table-column
					prop="score"
          align="center"
          min-width="100"
					label="最终得分">
				</el-table-column>
        <el-table-column
					prop="ranking"
          align="center"
          min-width="100"
					label="排名">
				</el-table-column>
        <el-table-column
          align="center"
          min-width="100"
					label="操作">
          <template slot-scope="scope">
            <el-button @click="updateStatus(scope.row)" type="primary" round size="medium">生效</el-button>
          </template>
				</el-table-column>
			</el-table>
    </div>
    <div class="page-content">
      <div>
        <el-button style="float:left;"  @click="downFile()" type="primary" round size="medium">下载导入模板</el-button>
        <el-button style="float:left;" @click="scoreExport()" type="primary" round size="medium">导出成绩</el-button>
        <el-upload
          class="upload"
          style="float:left;margin-left:10px"
          :show-file-list="false"
          :with-credentials="true"
          :action="apis.importScoreInfo"
          :httpRequest="uploadHttpDefault"
          name="file"
          :limit="999"
          :on-success="uploadSuccess"
          :on-error="uploadError"
        >
        <el-button type="primary" round size="medium">导入人员名单</el-button>
        </el-upload>
      </div>
    <!-- </div>
    <div class="page-container"> -->
      <!-- <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="form.pageNum"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="form.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="form.total">
			</el-pagination> -->
    </div>
  </div>
</template>
<script>
// import apis from '@/config/apis'
import HTTP from '../config/http';
import apis from '../config/apis';
import mixinIdex from '@/mixins/index'
// import download from '@/mixins/download'
import uploadHttp from '@/uploadHttp/index'
export default {
  mixins: [mixinIdex],
  // components: { confirmDialog },
  data() {
    return {
      form: {
        groupId: '',
        type: '0'
      },
      tableData: [],
      gameCategory: [],
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  methods: {
    teamChange(val) {
        console.log(val);
        this.form.groupId = val
        this.tableData = []
        this.getList()
    },
    changeSwitch(val) {
        console.log(val);
        this.form.type = val
        this.tableData = []
        this.getList()
    },
    init() {
      this.getGoupList()
    },
    getList() {
      const formData = { ...this.form }
      console.log('formData', formData);
      HTTP.POST('/score/list', formData).then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.tableData = res.data
        }
      })
    },
    getGoupList() {
        HTTP.POST('/score/groupList').then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.gameCategory = res.data
          if (this.gameCategory.length !== 0) {
            this.form.groupId = res.data[0].id
            this.getList()
          }
        }
      })
    },
    // 导入
    uploadError(res) {
      console.log(res);
      if (res.code === 500) {
        this.$message({message: res.msg, duration: '4000', type: 'warning'})
      }
    },
    uploadSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.$message.success('导入成功');
        this.getGoupList()
        this.getList()
      } 
      // else {
      // }
    },
    updateStatus(row) {
      const formData = { ...row }
      HTTP.POST(apis.scoteEffect, formData).then((res) => {
        if (res.code === 0) {
          this.$message.success('推送成功');
          this.getList()
          console.log(res)
        }
      })
    },
    scoreExport() {
      const formData = {
        groupId: this.form.groupId,
        type: this.form.type,
        responseType: 'blob'
      }
      HTTP.POST(apis.scoreExport, formData).then((res) => {
        console.log(res)
        if (res.code === 0) {
          // const formData = { fileName: res.msg, delete: false}
          // HTTP.GET(apis.downloadplayers, formData).then((res) => {
          //   console.log(res);
          //   const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          //   const url = window.URL.createObjectURL(blob)
          //   // // 通过创建a标签实现
          //   const link = document.createElement('a')
          //   link.href = url
          //   // // 对下载的文件命名, 如果后端返回名称出现乱码, 需要后端编码一下.
          //   // // link.download = decodeURI(res.headers['content-disposition'].split('=')[1]) || '123'
          //   document.body.appendChild(link)
          //   link.click()
          //   document.body.removeChild(link)
          // })
          // HTTP.GET(apis.downloadplayers, {
          //   params: { fileName: res.msg, responseType: 'blob', delete: false },
          // }).then((res) => {
          //   this.resolveBlob(res)
          // }, (e) => {
          //   console.log(e)
          // })
          // window.open('http://192.168.0.179:8888' + apis.downloadplayers + '?fileName=' + res.msg)
          window.location.href = HTTP.BaseUrl(apis.downloadplayers) + '?fileName=' + res.msg
        } else {
          this.$message.info(res.msg)
        }
      }).catch((err) => {
        this.$message.error(err.msg)
      })
    },
    downFile() {
      // window.location.href = 'http://192.168.0.179:8888/score/download'
      window.location.href = HTTP.BaseUrl(apis.downloadUrl)
    },
    // handleSelectionChange(arr) {
    //   this.selectedArr = arr
    // },
    uploadHttpDefault(e, hasDirectory = false) {
      uploadHttp(e, hasDirectory)
    },
    // tableHeight() {
    //   return document.documentElement.clientHeight - 356
    // },
    focus(event) {
      event.currentTarget.select();
    }
  },
}
</script>
<style lang="scss">
.bigScreen {
  position: relative;
  padding: 0 30px;
  h2 {
    margin: 20px;
    color: #42b983;
    font-size: 30px;
  }
  .table-container {
  .el-table .cell {
      padding-left: 5px !important;
      padding-right: 5px !important;
  }
  .el-input-number.is-controls-right .el-input__inner {
    padding-left: 10px !important;
    padding-right: 30px !important;
    }
  }
  .page-content {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // padding: 10px 20px;
    position: absolute;
    bottom: -75px;
    padding: 20px;
  }
}
</style>
