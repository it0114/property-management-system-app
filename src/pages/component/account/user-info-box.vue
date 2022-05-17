<template>
  <view class="user-info-box">
    <view class="info-box-left">
      <u-avatar :src="userInfo.src" shape="square" size="60"/>
      <text>{{ userInfo.name }}</text>
    </view>
    <text class="info-box-modify">修改账户信息</text>
  </view>
</template>


<script>
export default {
  name: "user-info-box",
  data() {
    return {
      userInfo: {
        src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Ffe%2F11%2F97%2Ffe119792285b42e687ebf4367f77c8de.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655393194&t=09f2af55f1d97bc9946f6a69d0b3840e',
        name: '张三'
      }
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

    text {
      margin-left: 20rpx;
      font-size: 40rpx;
    }
  }

  .info-box-modify {
    font-size: 30rpx;
  }
}
</style>
