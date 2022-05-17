<template>
  <view class="account">
    <userInfoBox/>
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
      outLoginShow: false
    }
  },
  methods: {
    async handlerOutLoginOk() {
      await uni.$u.http.get('/api/login/logout')
      this.outLoginShow = true
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/login/index',
          success: (res) => {
            uni.$u.toast('退出成功')
          }
        });
      }, 100)
    }
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
