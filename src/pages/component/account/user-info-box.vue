<template>
  <view class="user-info-box">
    <view class="info-box-left">
      <u-avatar
          v-if="userInfo.realname"
          :text="avatarText"
          fontSize="26"
          randomBgColor
          size="60"/>
      <view class="user-info">
        <text>{{ userInfo.realname }}</text>
        <text>{{ userInfo.tel }}</text>
      </view>
    </view>
    <text class="info-box-modify" @tap="handleModifyUserInfo">修改账户信息</text>
  </view>
</template>


<script>
export default {
  name: "user-info-box",
  props: {
    // 用户信息
    userInfo: {
      type: Object,
      default() {
        return {
          realname: '',
          tel: ''
        }
      }
    }
  },
  computed: {
    // 计算用户名  (配合 v-if 使用, 否则会出现读取不到数据报错 )
    avatarText() {
      let str = this.userInfo.realname
      return str.substring(str.length - 1, str.length)
    }
  },
  methods: {
    // 修改用户信息
    handleModifyUserInfo() {
      setTimeout(() => {
        uni.$u.route({
          url: 'pages/account/modify-user',
          params: {
            ...this.userInfo
          }
        })
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;

  .info-box-left {
    display: flex;
    align-items: center;

    .u-avatar {
      border: 1px solid #ccc;
    }

    .user-info {
      display: flex;
      flex-direction: column;

      text {
        margin-left: 20rpx;
        font-size: 30rpx;
      }

      text:nth-child(1) {
        font-weight: 500;
      }
    }
  }

  .info-box-modify {
    font-size: 30rpx;
  }
}
</style>
