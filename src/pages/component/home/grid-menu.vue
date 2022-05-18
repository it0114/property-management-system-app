<template>
  <view class="grid-menu">
    <text class="title">智慧社区</text>
    <u-grid
        :border="true"
        col="3"
    >
      <u-grid-item
          v-for="(listItem,listIndex) in list"
          :key="listIndex"
          @tap="handleGridItemClick(listItem)"
      >
        <u-icon
            :customStyle="{paddingTop:20+'rpx'}"
            :name="listItem.icon"
            :size="40"
        ></u-icon>

        <text class="grid-text">{{ listItem.title }}</text>
      </u-grid-item>
    </u-grid>
    <u-toast ref="uToast"/>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          icon: 'grid',
          title: '健康码',
          path: 'pages/home/health-code'
        },
        {
          icon: 'volume',
          title: '小区头条',
          path: 'pages/home/news'
        },
        {
          icon: 'home',
          title: '我的房屋',
          path: 'pages/home/my-home'
        },
        {
          icon: 'setting',
          title: '报修',
          path: 'pages/home/repair-report'
        },
        {
          icon: 'server-man',
          title: '投诉',
          path: 'pages/home/complaint'
        },
        {
          icon: 'star',
          title: '转租',
          path: 'pages/home/sublease'
        },
      ],
    }
  },
  methods: {
    // 跳转
    handleGridItemClick(item) {
      // this.$refs.uToast.success(item.path)
      if (item.path) {
        uni.$u.route({
          url: item.path,
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-menu {
  .title {
    font-size: 40rpx;
    color: #333;
    font-weight: bold;
    display: block;
    margin: 20rpx;
  }

  .grid-text {
    font-size: 30rpx;
    color: #909399;
    padding: 10rpx 0 20rpx 0rpx;
    /* #ifndef APP-PLUS */
    box-sizing: border-box;
    /* #endif */
  }
}
</style>
