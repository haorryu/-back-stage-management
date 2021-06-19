<template>
  <div>
    <el-table
      :data="rightsData"
      style="width: 100%">
      <el-table-column
        type="index" :index='indexMethod'>
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      rightsData: [{
        authName: '商品管理',
        path: 'goods',
        level: '一级'
      }]
    }
  },
  created () {
    this.loadRightsData()
  },
  methods: {
    // 加载权限数据
    async loadRightsData () {
      let res = await axios.get('rights/list')
      // console.log(res)
      this.rightsData = res.data.data
    },
    // 处理索引
    indexMethod (index) {
      return index
    }
  }
}
</script>

<style>
</style>
