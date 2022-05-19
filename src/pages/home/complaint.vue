<template>
  <view class="complaint">
    <u--form
        ref="uForm"
        :model="model"
        :rules="rules"
        labelPosition="top"
        labelWidth="160rpx"
    >
      <u-form-item
          borderBottom
          label="标题 :"
          prop="userInfo.title">
        <u--input
            v-model="model.userInfo.title"
            border="none"
            placeholder="请输入标题"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="投诉内容 :"
          prop="userInfo.content">
        <u--textarea
            v-model="model.userInfo.content"
            placeholder="请输入内容"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="地址 :"
          prop="userInfo.address">
        <u-button @click="pickerShow = true">{{ model.userInfo.address }}</u-button>
        <u-picker :columns="pickerColumns"
                  :show="pickerShow"
                  @cancel="pickerShow = false"
                  @confirm="handlePickerConfirm"
        />
      </u-form-item>
      <u-form-item>
        <u-button color="#2F6DEF" shape="circle" type="primary" @click="submit">
          提 交
        </u-button>
      </u-form-item>
    </u--form>
    <u-modal :content='modalContent' :show="modalShow" title="提示" @confirm="handleModalOK"></u-modal>
  </view>
</template>

<script>
export default {
  name: "complaint",
  data() {
    return {
      modalShow: false,
      modalContent: '',
      model: {
        userInfo: {
          title: '',
          address: '点击选择地址',
          content: '',
        }
      },
      rules: {
        'userInfo.title': {
          type: 'string',
          required: true,
          message: '请填写标题',
          trigger: ['blur']
        },
        'userInfo.address': {
          type: 'string',
          required: true,
          message: '请填写地址',
          trigger: ['blur']
        },
        'userInfo.content': {
          type: 'string',
          required: true,
          message: '请填写内容',
          trigger: ['blur']
        },
      },
      pickerShow: false,
      pickerColumns: []
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 请求数据
    getData() {
      uni.getStorage({
        key: "propertyUserId",
        success: async user => {
          let userId = user.data

          // 用户id 请求用户信息, 然后用用户信息返回
          let userInfo = await uni.$u.http.get('/api/user', {params: {id: userId}})

          // 2. 根据 houseId 获取对应数据
          let resData = await uni.$u.http.get('/api/house',
              {params: {id: userInfo.data[0].houseId}})

          // 3. 获取到 resData 中的地址
          // console.log(resData.data);
          this.pickerColumns = []
          let tempArr = []
          resData.data.forEach(item => {
            tempArr.push(item.name)
          })
          this.pickerColumns = [tempArr]
        }
      })
    },
    handlePickerConfirm(e) {
      this.model.userInfo.address = e.value[0]
      this.pickerShow = false
    },
    submit() {
      this.$refs.uForm.validate().then(async () => {

        // 验证地址
        if (this.model.userInfo.address === '点击选择地址') {
          uni.$u.toast('请选择地址')
          return
        }

        //  提交
        let res = await uni.$u.http.post('/api/complaint', {
          ...this.model.userInfo,
        })
        // 提交成功
        if (res) {
          this.modalShow = true
          this.modalContent = '投诉内容成功,我们将于72小时内联系您~'
        }

      }).catch(errors => {
        uni.$u.toast('校验失败 , 内容不能为空')
      })
    },
    handleModalOK() {
      this.$refs.uForm.resetFields()
      uni.switchTab({
        url: '/pages/home/index',
        success() {
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.complaint {
  padding: 30rpx;
  box-sizing: border-box;
}
</style>
