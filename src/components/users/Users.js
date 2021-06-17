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
      }
    }
  },
  created () {
    this.loadUserData()
  },
  methods: {
    // 获取用户数据
    async loadUserData (pagenum = 1, query = '') {
      const url = 'http://localhost:8888/api/private/v1/users'
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
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
      this.loadUserData(curPage, this.searchText)
    },
    // 开始查询
    startQuery () {
      this.loadUserData(1, this.searchText)
    },
    // 点击确定添加用户
    addUser () {
      axios.post('http://localhost:8888/api/private/v1/users', this.addUserForm, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
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
          this.addUserForm.username = ''
          this.addUserForm.password = ''
          this.addUserForm.email = ''
          this.addUserForm.mobile = ''
        }
      })
    }
  }
}
