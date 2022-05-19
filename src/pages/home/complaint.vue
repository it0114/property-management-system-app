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
          label="投诉内容 :"
          prop="userInfo.loginName">
        <u--textarea
            v-model="model.userInfo.loginName"
            placeholder="请输入内容"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="地址 :"
          prop="userInfo.loginName">
        <u--input
            v-model="model.userInfo.loginName"
            border="none"
            placeholder="请输入地址"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="联系电话 :"
          prop="userInfo.loginName">
        <u--input
            v-model="model.userInfo.loginName"
            border="none"
            placeholder="请输入联系电话"/>
      </u-form-item>
      <u-form-item>
        <u-button color="#2F6DEF" shape="circle" type="primary" @click="submit">
          提 交
        </u-button>
      </u-form-item>
    </u--form>
  </view>
</template>

<script>
export default {
  name: "complaint",
  data() {
    return {
      model: {
        userInfo: {
          loginName: '',
          password: '',
        }
      },
      rules: {
        'userInfo.loginName': {
          type: 'string',
          required: true,
          message: '请填写用户名',
          trigger: ['blur', 'change']
        },
        'userInfo.password': {
          type: 'string',
          required: true,
          message: '请填写密码',
          trigger: ['blur', 'change']
        },
      },
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  mounted() {
    this.getData()
  },
  methods: {
    submit() {
      this.$refs.uForm.validate().then(async res => {

        // /api/complaint

      }).catch(errors => {
        uni.$u.toast('校验失败 , 内容不能为空')
      })
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
