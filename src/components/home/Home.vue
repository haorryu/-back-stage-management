
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
      <el-menu
    :router="true"
      default-active="users"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <!-- 用户管理 -->
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="users">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="roles">角色列表</el-menu-item>
          <el-menu-item index="rights">权限列表</el-menu-item>
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
export default {
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
    }
  }
}
</script>

<style src='./Home.less' scoped lang='less'>
</style>
