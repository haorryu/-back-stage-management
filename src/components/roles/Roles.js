import axios from 'axios'
export default {
  data () {
    return {
      rightsData: [{
        roleName: '主管',
        roleDesc: '技术负责人'
      }]
    }
  },
  created () {
    this.loadRolesData()
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
    }
  }
}
