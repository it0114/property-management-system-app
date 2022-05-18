<template>
  <div class="modify-user">
    <u--form
        ref="uForm"
        :model="model"
        :rules="rules"
        labelPosition="top"
        labelWidth="160rpx"
    >
      <u-form-item
          borderBottom
          label="用户名 :"
          prop="userInfo.realname"
      >
        <u--input v-model="model.userInfo.realname"
                  border="none"
                  placeholder="请输入用户名"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="密码 :"
          prop="userInfo.password">
        <u--input v-model="model.userInfo.password"
                  border="none"
                  placeholder="请输入密码"
                  type="password"/>
      </u-form-item>
      <u-form-item
          borderBottom
          label="手机号 :"
          prop="userInfo.tel">
        <u--input v-model="model.userInfo.tel"
                  border="none"
                  placeholder="请输入手机号"
                  type="text"/>
      </u-form-item>
      <u-form-item>
        <u-button color="#2F6DEF" shape="circle" type="primary" @click="modifyShow = true">
          提 交
        </u-button>
      </u-form-item>
    </u--form>
    <u-modal
        :buttonReverse="true"
        :closeOnClickOverlay="true"
        :show="modifyShow"
        :showCancelButton="true"
        content='是否确认修改?'
        title="提示"
        @cancel="modifyShow = false"
        @close="modifyShow = false"
        @confirm="handlerSubmitOk"
    />
  </div>
</template>

<script>
export default {
  name: "modify-user",
  data() {
    return {
      model: {
        userInfo: {
          realname: '',
          password: '',
          tel: ''
        } // 用户信息
      },
      rules: {
        'userInfo.realname': {
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
        'userInfo.tel': {
          type: 'string',
          required: true,
          message: '请填写手机号',
          trigger: ['blur', 'change']
        },
      },
      modifyShow: false // 弹窗
    }
  },
  // onLoad 可以直接接受路由参数
  onLoad(userInfo) {
    try {
      this.model.userInfo = userInfo
    } catch (e) {
      this.model.userInfo = {}
      uni.$u.toast('数据获取失败')
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    async handlerSubmitOk() {
      this.modifyShow = false
      this.$refs.uForm.validate().then(async res => {
        let dataRes = await uni.$u.http.put('/api/user', {
          ...this.model.userInfo
        })
        // 更新数据
        this.model.userInfo = dataRes

        if (dataRes) {
          // 跳转 我的界面
          uni.switchTab({
            url: "/pages/account/index",
            success: (res) => {
              uni.$u.toast('用户信息修改成功')
            }
          });
        } else {
          uni.$u.toast('修改失败')
        }

      }).catch(e => {
        uni.$u.toast('校验失败 , 内容不能为空')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.modify-user {
  padding: 40rpx 60rpx;
  box-sizing: border-box;

  .u-button {
    margin-top: 50rpx;
  }
}
</style>
