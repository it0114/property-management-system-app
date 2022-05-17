<template>
  <view class="u-page__item">
    <text class="title">常见问题</text>
    <u-collapse accordion>
      <u-collapse-item v-for="(item,index) in orderList" :key="index" :title="item.title">
        <text class="u-collapse-content">{{ item.content }}</text>
      </u-collapse-item>
    </u-collapse>
  </view>
</template>


<script>
export default {
  name: "order",
  data() {
    return {
      orderList: [
        {
          title: '为什么我的健康码显示不了?',
          content: '可能没有申请健康码，可找相关管理员进行申请'
        },
        {
          title: '如何报修?',
          content: '打开首页找到“报修”填写报修信息'
        },
        {
          title: '如何转租?',
          content: '打开首页找到“转租”填写转租信息'
        },
        {
          title: '报修周期?',
          content: '一般来说报修周期维持在一个月检查报修一次'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.u-page__item {
  padding: 0;

  .title {
    font-size: 50rpx;
    margin: 30rpx;
    display: block;
    font-weight: 500;
  }
}

.u-collapse-content {
  color: $u-tips-color;
  font-size: 14px;
}

::v-deep .u-cell__body {
  padding: 30rpx 15px;
}

::v-deep .u-collapse-item__content__text {
  padding: 40rpx 15px;
}
</style>
