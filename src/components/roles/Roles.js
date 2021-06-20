import axios from 'axios'
export default {
  data () {
    return {
      rightsData: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }],
      dialogAssignRightsVisible: false,
      // 树的数据
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 7,
          label: '二级 1-1'
        }, {
          id: 8,
          label: '二级 1-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rolesId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
  },
  methods: {
    async loadRolesData () {
      let res = await axios.get('roles')
      // console.log(res)
      this.rightsData = res.data.data
    },
    // 处理索引
    indexMethod (index) {
      return index
    },
    // 处理所有的权限信息
    async loadRightsData () {
      let res = await axios.get('rights/tree')
      console.log(res)
      this.data = res.data.data
    },
    // 显示分配权限对话框
    showAssignRightsDialog (row) {
      this.rolesId = row.id
      this.dialogAssignRightsVisible = true

      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      // $nextTick DOM渲染完后自动执行回调
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 点击确定分配权限
    async assignRights () {
      let keys1 = this.$refs.tree.getCheckedKeys()
      let keys2 = this.$refs.tree.getHalfCheckedKeys()
      let keys = keys1.concat(keys2)

      let res = await axios.post(`roles/${this.rolesId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      // 判断是否更新成功
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRightsVisible = false
        // 提示一下
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
        // 刷新一下页面
        this.loadRolesData()
      }
    }
  }
}
