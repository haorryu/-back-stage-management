import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  /* eslint-disable */
  components: {
    quillEditor
  },
  data () {
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制tabs
      activeName: 'one',
      // 添加商品表单对象
      addGoodsForm: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        // 单选框
        radio: true
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }],
      defaultPorps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      // 上传图片所需数据
      dialogImageUrl: '',
      dialogVisible: false,
      // 请求头对象
      headers: {
        Authorization: localStorage.getItem('token')
      },
      // 富文本编辑器
      editorOption: {
        placeholder: '小八在此'
      }
    }
  },
  created () {

    this.loadCatData()
  },
  methods: {
    cilckTab (tab) {
      this.activeIndex = +tab.index + 1
    },
    // 下一步
    next (activeIndex, activeName) {
      this.activeIndex = activeIndex
      this.activeName = activeName
    },
    async loadCatData () {
      let res = await axios.get('categories', {
        parent: {
          type: 3
        }
      })
      // console.log(res)
      this.options = res.data.data
    },
    // 上传图片配置相关的方法
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess (res) {
      this.addGoodsForm.pics.push({
        pic: res.data.tmp_path
      })
    },
    // 点击确定添加商品
    async addGoods () {
      const {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics } = this.addGoodsForm

      let res = await axios.post('goods', {
      goods_name,
      goods_cat: goods_cat.join(','),
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics
      })
      console.log(res)
      if (res.data.meta.status === 201) {
        // 提示
        this.$message({
          message: '添加商品成功',
          type: 'success',
          duration: 800
        })

        // 回到goods
        this.$router.push('/goods')
      }
    }
  }
}
