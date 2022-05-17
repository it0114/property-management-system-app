<template>
  <view class="login">
    <div class="login-header">
      <div class="login-header-text">
        <h2>欢迎登陆</h2>
        <h2>物业管理系统App</h2>
      </div>
    </div>
    <div class="login-wrapper">
      <u--form
          ref="uForm"
          :model="model"
          :rules="rules"
          labelPosition="top"
          labelWidth="160rpx"
      >
        <u-form-item
            borderBottom
            label="账号 :"
            prop="userInfo.loginName"
        >
          <u--input v-model="model.userInfo.loginName"
                    border="none"
                    placeholder="请输入账号"/>
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
        <u-form-item>
          <u-button color="#2F6DEF" shape="circle" type="primary" @click="submit">
            登 陆
          </u-button>
        </u-form-item>
      </u--form>
    </div>
  </view>
</template>

<script>
export default {
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
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.uForm.validate().then(res => {
        // 1. 请求登陆接口
        uni.$u.http.post('/api/login/login', {
          ...this.model.userInfo
        }, {
          params: {   //  会加在url上
            ...this.model.userInfo
          },
          header: {'content-type': "multipart/form-data"},
        }).then(dataRes => {
          if (dataRes) {
            // 密码验证成功 (跳转首页)
            setTimeout(() => {
              // uni.navigateTo({
              //   url: 'pages/home/index'
              // })

              // uni.$u.route({
              //   url: 'pages/home/index',
              // })

              uni.switchTab({
                url: '/pages/home/index',
                success: (res) => {
                  uni.$u.toast('登陆成功')
                }
              });

            }, 500)
          } else {
            // 账号密码错误的情况
            this.$refs.uForm.resetFields()
          }
        })
      }).catch(errors => {
        uni.$u.toast('校验失败 , 用户名或密码不能为空')
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;

  .login-header {
    width: 100%;
    height: 500rpx;
    background: #2C66EC;
    position: relative;

    .login-header-text {
      color: #fff;
      font-size: 40rpx;
      position: absolute;
      bottom: 100rpx;
      left: 20rpx;
      font-weight: 400;

      h2 {
        margin-top: 20rpx;
      }
    }
  }

  .login-wrapper {
    padding: 60rpx 40rpx;
    box-sizing: border-box;
    position: absolute;
    top: 460rpx;
    border-radius: 40rpx;
    width: 100%;
    background: #fff;

    .u-button {
      margin-top: 60rpx;
    }
  }
}
</style>
