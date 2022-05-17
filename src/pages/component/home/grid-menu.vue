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
          title: '健康码'
        },
        {
          icon: 'volume',
          title: '小区头条'
        },
        {
          icon: 'home',
          title: '我的房屋'
        },
        {
          icon: 'setting',
          title: '报修'
        },
        {
          icon: 'server-man',
          title: '投诉'
        },
        {
          icon: 'star',
          title: '转租'
        },
      ],
    }
  },
  methods: {
    click(name) {
      this.$refs.uToast.success(`点击了第${name}个`)
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
