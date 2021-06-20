
<template>
  <el-container>
<!-- ------------------------------------------------头部------------------------------------------------ -->
  <el-header>
    <el-row>
      <el-col :span = '8'>
        <img src="../../assets/logo.jpg" alt="">
      </el-col>
      <el-col :span = '8'>
        <h1>后台管理</h1>
      </el-col>
      <el-col :span = '8' class="col_r">
        <a @click.prevent='logout' href="#">退出</a>
        </el-col>
    </el-row>
  </el-header>
<!-- ------------------------------------------------侧边栏------------------------------------------------ -->
  <el-container>
    <el-aside width="200px">
      <!--默认高亮属性  default-active="users" -->
      <el-menu
    :router="true"
      background-color="#545c64"
      :default-active="handlePath()"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="item1.id+''" v-for="item1 in menusData" :key='item1.id'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <!-- 用户管理 -->
          <span>{{ item1.authName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item2.path" v-for="item2 in item1.children" :key='item2.id'>{{ item2.authName }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
    </el-aside>
<!-- ------------------------------------------------主体------------------------------------------------ -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      menusData: []
    }
  },
  created () {
    this.loadLeftMenusData()
  },
  methods: {
    // 退出功能
    async logout () {
      try {
        await this.$confirm('此操作将退出登录此账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 1.清除token
        localStorage.removeItem('token')

        this.$router.push('/login')
        // this.$router.back()
        // 提示
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      }
      // .then(() => {
      //   localStorage.removeItem('token')
      //   this.$router.push('/login')
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!',
      //     duration: 800
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除',
      //     duration: 800
      //   })
      // })
    },
    async loadLeftMenusData () {
      let res = await axios.get('menus')
      this.menusData = res.data.data
    },
    // 处理home页刷新，获取最新路径
    handlePath () {
      let path = this.$route.path
      return path.slice(1)
      // console.log(path)
    }
  }
}
</script>

<style src='./Home.less' scoped lang='less'>
</style>
