import axios from 'axios'

export default {
  data () {
    return {
      userData: [{
        email: '2016-05-02',
        username: '小八',
        mobile: '111111518'
      }],
      // total 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 搜索文本
      searchText: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        // 校验uesrname
        username: [
          // 判断是否输入
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式是否正确
          { min: 2, max: 8, message: '长度应在2-8之间', trigger: 'blur' }
        ],
        // 校验password
        password: [
          // 判断是否输入
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 判断格式是否正确
          { min: 6, max: 18, message: '长度应在6-18之间', trigger: 'blur' }
        ],
        // 校验email
        email: [
          // 判断格式是否正确
          { pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        // 校验mobile
        mobile: [
        // 判断格式是否正确
          { pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      // 是否显示编辑用户对话框
      dialogEditUserVisible: false,
      // 编辑用户表单对象
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      // 是否显示分配角色对话框
      dialogAssignRoleVisible: false,
      assignRoleform: {
        // 用户名
        userName: 'xiaoba',
        // 用户id
        id: '',
        // 角色id
        rid: ''
      },
      // 角色数据
      rolesData: {}
    }
  },
  created () {
    // let page = this.$route.params.page
    // this.loadUserData(page)
    this.loadUserData()
    this.loadRolesData()
  },
  methods: {
    // 获取用户数据
    async loadUserData (pagenum = 1, query = '') {
      const url = 'users'
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await axios.get(url, config)

      this.userData = res.data.data.users
      // 把总个数保存起来
      this.total = res.data.data.total
      // 获取当前页
      this.pagenum = res.data.data.pagenum

    //     .then(res => {
    //     // 把表格数据保存起来
    //       this.userData = res.data.data.users
    //       // 把总个数保存起来
    //       this.total = res.data.data.total
    //       // 获取当前页
    //       this.pagenum = res.data.data.pagenum
    //     })
    },
    // 改变当前页数
    changeCurPage (curPage) {
      // console.log('点击了分页', curPage)
      // this.$router.push('/users/' + curPage)
      this.loadUserData(curPage, this.searchText)
    },
    // 开始查询
    startQuery () {
      this.loadUserData(1, this.searchText)
    },
    // 点击确定添加用户
    addUser () {
      axios.post('users', this.addUserForm).then(res => {
        if (res.data.meta.status === 201) {
          // 隐藏对话框
          this.dialogAddUserVisible = false
          // 提示
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 刷新一下
          this.loadUserData()
        }
      })
    },
    // 删除用户
    async delUser (row) {
      console.log(row)
      // 获取当前行对象的id
      const { id } = row
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        let res = await axios.delete(`users/${id}`)

        if (res.data.meta.status === 200) {
          // 提示
          this.$message({
            type: 'success',
            message: '删除用户成功!',
            duration: 800
          })
          // 刷新一下
          this.loadUserData(this.pagenum)
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 800
        })
      }
    },
    // 状态修改
    async stateChanged (row) {
      // console.log(row)
      const { id } = row
      const mgState = row.mg_state
      let res = await axios.put(`users/${id}/state/${mgState}`, null)
      // 判断状态
      if (res.data.meta.status === 200) {
        this.$message({
          message: '更改状态成功',
          type: 'success',
          duration: 800
        })
        // 刷新页面
        this.loadUserData(this.pagenum)
      }
    },
    // 显示编辑用户对话框
    showEditUserDialog (row) {
      // 1.显示数据
      this.dialogEditUserVisible = true
      console.log(row)

      // 2.获取数据
      const { username, email, mobile, id } = row

      // 3.把这三个数据，赋值给editUSerForm
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    // 点击确定编辑用户
    async editUser () {
      // 1. 获取已知参数
      const { id, email, mobile } = this.editUserForm
      // 2.请求
      let res = await axios.put(`users/${id}`, {
        email,
        mobile
      })
      // console.log(res)

      // 3.判断是否成功
      if (res.data.meta.status === 200) {
        // 3.1隐藏对话框
        this.dialogEditUserVisible = false
        // 3.2提示
        this.$message({
          message: '编辑用户成功',
          type: 'success',
          duration: 800
        })
        // 3.3刷新一下
        this.loadUserData()
      }
    },
    // 监听对话框关闭
    dialogClosed () {
      // 表单重置
      this.$refs.addUserForm.resetFields()
    },
    async loadRolesData () {
      let res = await axios.get('roles')
      // console.log(res)
      this.rolesData = res.data.data
    },
    // 展示分配角色对话框
    async showAssignRoleDialog (row) {
      this.dialogAssignRoleVisible = true
      const {username, id} = row
      this.assignRoleform.userName = username
      this.assignRoleform.id = id
      let res = await axios.get(`users/${id}`)
      // console.log(res)
      this.assignRoleform.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 点击确定分配角色
    async assignRole () {
      // 获取id和rid
      const {rid, id} = this.assignRoleform
      let res = await axios.put(`users/${id}/role`, {
        rid
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRoleVisible = false
        this.$message({
          message: '设置角色成功',
          type: 'success',
          duration: 800
        })
        // 刷新一下
        this.loadUserData(this.pagenum)
      }
    }
  }
}
