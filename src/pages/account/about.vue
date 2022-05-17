<template>
  <view class="about">
    <view :style="{backgroundImage:`url(${src})`}" class="bg-img"/>
    <text class="title">智慧物业管理系统</text>
    <text class="text-content">
      致力于做大做强服务各位业主,便利社区,幸福你我~
    </text>
  </view>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      src: require("../../static/about/about.jpg"),
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .bg-img {
    width: 100%;
    height: 400rpx;
    background-size: 100%;
  }

  .title {
    font-size: 40rpx;
    font-weight: 500;
    display: block;
    margin: 30rpx;
  }

  .text-content {
    width: 80%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    padding: 20rpx;
    box-sizing: border-box;
    text-align: center;
    font-size: 26rpx;
  }
}
</style>
