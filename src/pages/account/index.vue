<template>
  <view class="account">
    <userInfoBox :userInfo="userInfo"/>
    <cellList/>
    <view class="out-login">
      <u-button color="#3B65E4" text="退出登录" type="primary" @tap="outLoginShow = true"></u-button>
    </view>
    <u-modal
        :buttonReverse="true"
        :closeOnClickOverlay="true"
        :show="outLoginShow"
        :showCancelButton="true"
        content='是否退出登录?'
        title="提示"
        @cancel="outLoginShow = false"
        @close="outLoginShow = false"
        @confirm="handlerOutLoginOk"
    />
  </view>
</template>

<script>
import userInfoBox from "../component/account/user-info-box";
import cellList from "../component/account/cell-list";

export default {
  name: "account",
  components: {
    userInfoBox,
    cellList
  },
  data() {
    return {
      outLoginShow: false,// 退出的弹窗
      userInfo: {}, // 用户信息
    }
  },
  onShow() {
    this.getUserinfo()
  },
  methods: {
    // 退出登录
    async handlerOutLoginOk() {
      await uni.$u.http.get('/api/login/logout')
      this.outLoginShow = true
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/login/index',
          success: (res) => {

            // 清空 propertyUserId (用户id)
            uni.removeStorage({
              key: 'propertyUserId',
              success: function (res) {
                uni.$u.toast('退出成功')
              }
            })

          }
        });
      }, 100)
    },
    // 获取用户信息
    async getUserinfo() {
      // 1. 获取用户 id (本地存储)
      let propertyUserId = null
      uni.getStorage({
        key: "propertyUserId",
        success(res) {
          propertyUserId = res.data
        }
      })
      // 2. 根据 id 获取对应数据
      let res = await uni.$u.http.get('/api/user', {params: {id: propertyUserId}})
      if (res.data) {
        let data = res.data[0]
        this.userInfo = {
          ...data,
        }
      } else {
        uni.$u.toast('数据获取失败')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.account {
  .out-login {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    margin: 30rpx 0;
  }
}
</style>
